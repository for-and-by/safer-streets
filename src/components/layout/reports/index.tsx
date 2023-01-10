import React, { useEffect } from "react";
import useReports from "~/hooks/reports/use-reports";
import useReportSync from "~/hooks/reports/use-report-sync";

import Toast from "~/components/regions/toast";
import useMapSource from "~/hooks/map/use-map-source";
import useMapLayer from "~/hooks/map/use-map-layer";
import MarkerFactory from "~/components/map/markers/factory";
import ReportMarker from "~/components/map/markers/report";
import { Report } from "~/types/db";
import { LngLatLike } from "maplibre-gl";
import ClusterMarker from "~/components/map/markers/cluster";

export default function Reports() {
  const { geojson } = useReports();

  useMapSource({
    id: "reports",
    type: "geojson",
    data: JSON.parse(geojson),
    cluster: true,
  });

  useMapLayer({
    id: "reports",
    type: "circle",
    source: "reports",
    filter: ["!", ["has", "point_count"]],
    paint: {
      "circle-radius": 0,
      "circle-color": "#FFF",
    },
  });

  useMapLayer({
    id: "clusters",
    type: "circle",
    source: "reports",
    filter: ["has", "point_count"],
    paint: {
      "circle-radius": 0,
      "circle-color": "#FFF",
    },
  });

  const { syncReports, isSyncing } = useReportSync();

  useEffect(() => {
    syncReports().finally();
  }, []);

  return (
    <>
      <Toast content={"Syncing Reports..."} show={isSyncing} />
      <MarkerFactory
        source="reports"
        filter={(marker) => !marker.properties.cluster}
        render={({ geometry, properties }) => (
          <ReportMarker
            coordinates={geometry.coordinates as LngLatLike}
            report={properties as Report}
          />
        )}
      />
      <MarkerFactory
        source="reports"
        filter={(marker) => marker.properties.cluster}
        render={({ geometry, properties }) => (
          <ClusterMarker
            coordinates={geometry.coordinates}
            count={properties.point_count}
          />
        )}
      />
    </>
  );
}
