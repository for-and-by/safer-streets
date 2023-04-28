import type { GeoJSONSource } from "maplibre-gl";

import colors from "~/utils/colors.client";

import useMapLayer from "~/hooks/map/use-map-layer";
import useMapCenter from "~/hooks/map/use-map-center";
import useMapEvents from "~/hooks/map/use-map-events";
import useMap from "~/hooks/map/use-map";
import useMapZoom from "~/hooks/map/use-map-zoom";

interface Props {
  source: string;
}

export default function ReportClustersLayer({ source }: Props) {
  const map = useMap();
  const [, setCenter] = useMapCenter();
  const [, { setZoom }] = useMapZoom();

  useMapLayer({
    id: "clusters-bg",
    type: "circle",
    source,
    filter: ["has", "point_count"],
    paint: {
      "circle-color": colors?.brand?.["800"],
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

  useMapEvents(map, "clusters-bg", {
    click: (event) => {
      if (!map) return;

      const [feature] = map.queryRenderedFeatures(event.point, {
        layers: ["clusters-bg"],
      });

      const clusterId = feature?.properties?.cluster_id;

      const geojsonSource = map.getSource(source) as GeoJSONSource;
      geojsonSource.getClusterExpansionZoom(clusterId, (error, zoom) => {
        if (error) return;
        if (zoom) setZoom(zoom);
        setCenter(event.lngLat);
      });
    },
  });

  return null;
}
