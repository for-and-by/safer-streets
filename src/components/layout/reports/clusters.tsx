import useMapLayer from "~/hooks/map/use-map-layer";
import colors from "~/lib/colors";

export default function ReportClustersLayer() {
  useMapLayer({
    id: "clusters-bg",
    type: "circle",
    source: "reports",
    filter: ["has", "point_count"],
    paint: {
      "circle-color": colors.brand["800"],
      "circle-radius": 20,
    },
  });

  useMapLayer({
    id: "clusters-icon",
    type: "symbol",
    source: "reports",
    filter: ["has", "point_count"],
    layout: {
      "text-field": "{point_count_abbreviated}",
      "text-font": ["Inter Bold", "Arial Unicode MS Bold"],
      "text-size": 12,
    },
    paint: {
      "text-color": colors.gray["100"],
    },
  });

  return null;
}
