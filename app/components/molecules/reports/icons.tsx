import useMapLayer from "~/hooks/map/use-map-layer";
import colors from "~/lib/colors.client";
import useMapEvents from "~/hooks/map/use-map-events";
import useMap from "~/hooks/map/use-map";
import useMapCenter from "~/hooks/map/use-map-center";
import type { FilterSpecification } from "maplibre-gl";
import SummaryMarker from "~/components/molecules/popup/summary";
import React, { useState } from "react";

const FILTERS = ["!", ["has", "point_count"]] as FilterSpecification;

export default function ReportIconsLayer() {
  const map = useMap();
  const [, setCenter] = useMapCenter();

  const [activeReport, setActiveReport] = useState<string | undefined>();

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
        setActiveReport(feature.properties.id);
      }
    },
  });

  return (
    <SummaryMarker
      id={activeReport}
      onClose={() => setActiveReport(undefined)}
    />
  );
}
