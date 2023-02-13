import useMapLayer from "~/hooks/map/use-map-layer";
import colors from "~/lib/colors.client";
import useMapEvents from "~/hooks/map/use-map-events";
import useMap from "~/hooks/map/use-map";
import useMapCenter from "~/hooks/map/use-map-center";
import useActiveReport from "~/hooks/reports/use-active-report";
import type { FilterSpecification } from "maplibre-gl";

const FILTERS = ["!", ["has", "point_count"]] as FilterSpecification;

export default function ReportIconsLayer() {
  const map = useMap();
  const [, setCenter] = useMapCenter();

  const [, setActiveReportId] = useActiveReport();

  useMapLayer({
    id: "reports-bg",
    type: "circle",
    source: "reports",
    filter: FILTERS,
    paint: {
      "circle-color": colors?.brand?.[600],
      "circle-radius": 20,
    },
  });

  useMapLayer({
    id: "reports-icon",
    type: "symbol",
    source: "reports",
    filter: FILTERS,
    layout: {
      "icon-image": "{type_handle}",
      "icon-size": 0.2,
    },
  });

  useMapEvents(map, "reports-bg", {
    click: (event) => {
      if (!map) return;
      setCenter(event.lngLat);

      const [feature] = map.queryRenderedFeatures(event.point, {
        layers: ["reports-bg"],
      });

      if (feature?.properties?.id) {
        setActiveReportId(feature.properties.id);
      }
    },
  });

  return null;
}
