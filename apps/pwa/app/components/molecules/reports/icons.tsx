import React, { useState } from "react";
import { useLocation } from "@remix-run/react";

import colors from "~/utils/colors.client";

import useMap from "~/hooks/map/use-map";
import useMapEvents from "~/hooks/map/use-map-events";
import useMapLayer from "~/hooks/map/use-map-layer";
import useMapCenter from "~/hooks/map/use-map-center";

import SummaryMarker from "~/components/molecules/popup/summary";

export default function ReportIconsLayer() {
  const location = useLocation();
  const map = useMap();
  const [, setCenter] = useMapCenter();

  const [activeReport, setActiveReport] = useState<string | undefined>();

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

  useMapEvents(map, "reports-bg", {
    click: (event) => {
      if (!map) return;
      setCenter(event.lngLat);

      const [feature] = map.queryRenderedFeatures(event.point, {
        layers: ["reports-bg"],
      });

      if (!feature?.properties?.id) return;
      if (!(location.pathname === "/")) return;

      setActiveReport(feature.properties.id);
    },
  });

  return (
    <SummaryMarker
      id={activeReport}
      onClose={() => setActiveReport(undefined)}
    />
  );
}
