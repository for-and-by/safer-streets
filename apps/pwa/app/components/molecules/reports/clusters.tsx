import type { GeoJSONSource } from "maplibre-gl";

import colors from "~/utils/colors.client";

import { useMapLayer } from "~/hooks/map/use-map-layer";
import { useLayerEvent } from "~/hooks/map/use-layer-event";
import { useMapState } from "~/hooks/map/use-map-state";

interface Props {
  source: string;
}

export default function ReportClustersLayer({ source }: Props) {
  const [, { setMapState }] = useMapState();

  useMapLayer({
    id: "clusters-bg",
    type: "circle",
    source,
    filter: ["has", "point_count"],
    paint: {
      "circle-color": colors?.brand?.["900"],
      "circle-radius": 20,
    },
  });

  useMapLayer({
    id: "clusters-icon",
    type: "symbol",
    source,
    filter: ["has", "point_count"],
    layout: {
      "text-field": "{point_count_abbreviated}",
      "text-font": ["Inter Bold", "Arial Unicode MS Bold"],
      "text-size": 12,
    },
    paint: {
      "text-color": colors?.white,
    },
  });

  useLayerEvent("click", "clusters-bg", (event) => {
    const [feature] = event.target.queryRenderedFeatures(event.point, {
      layers: ["clusters-bg"],
    });

    const clusterId = feature?.properties?.cluster_id;

    const geojsonSource = event.target.getSource(source) as GeoJSONSource;
    geojsonSource.getClusterExpansionZoom(clusterId, (error, zoom) => {
      if (error) return;
      if (zoom) setMapState({ zoom, center: event.lngLat });
    });
  });

  return null;
}
