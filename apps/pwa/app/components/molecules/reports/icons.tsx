import colors from "~/utils/colors.client";

import useMapLayer from "~/hooks/map/use-map-layer";

export default function ReportIconsLayer() {
  useMapLayer({
    id: "reports-bg",
    type: "circle",
    source: "reports",
    filter: ["!", ["has", "point_count"]],
    paint: {
      "circle-color": colors?.brand?.[700],
      "circle-radius": 20,
    },
  });

  useMapLayer({
    id: "reports-icon",
    type: "symbol",
    source: "reports",
    filter: ["!", ["has", "point_count"]],
    layout: {
      "icon-image": "{type_handle}",
      "icon-allow-overlap": true,
      "icon-size": 0.2,
    },
  });

  useMapLayer({
    id: "report-verify",
    type: "symbol",
    source: "reports",
    filter: [
      "all",
      ["!", ["has", "point_count"]],
      ["==", ["get", "is_aging"], true],
      ["==", ["get", "is_unopened"], false],
    ],
    layout: {
      "icon-image": "badge-verify",
      "icon-allow-overlap": true,
      "icon-offset": [-50, -50],
      "icon-size": 0.25,
    },
  });

  useMapLayer({
    id: "report-new",
    type: "symbol",
    source: "reports",
    filter: [
      "all",
      ["!", ["has", "point_count"]],
      ["==", ["get", "is_unopened"], true],
    ],
    layout: {
      "icon-image": "badge-new",
      "icon-allow-overlap": true,
      "icon-offset": [-70, -70],
      "icon-size": 0.2,
    },
  });

  return null;
}
