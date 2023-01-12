import React, { useEffect } from "react";

import parseReportsAsGeoJSON from "~/lib/parse-reports-as-geojson";

import useReports from "~/hooks/reports/use-reports";
import useReportSync from "~/hooks/reports/use-report-sync";
import useMapSource from "~/hooks/map/use-map-source";
import useMapImages from "~/hooks/map/use-map-images";

import Toast from "~/components/regions/toast";
import ReportClustersLayer from "~/components/layout/reports/clusters";
import ReportIconsLayer from "~/components/layout/reports/icons";
import SummaryMarker from "~/components/layout/map/popup/summary";

export default function Reports() {
  const reports = useReports();
  const { syncReports, isSyncing } = useReportSync();

  useMapImages([
    {
      id: "cyclist",
      url: "/icons/cyclist.png",
    },
    {
      id: "fire",
      url: "/icons/fire.png",
    },
    {
      id: "flood",
      url: "/icons/flood.png",
    },
    {
      id: "motorist",
      url: "/icons/motorist.png",
    },
    {
      id: "pedestrian",
      url: "/icons/pedestrian.png",
    },
    {
      id: "wildlife",
      url: "/icons/wildlife.png",
    },
  ]);

  useMapSource({
    id: "reports",
    type: "geojson",
    data: parseReportsAsGeoJSON(reports),
    cluster: true,
  });

  useEffect(() => {
    syncReports().finally();
  }, []);

  return (
    <>
      <SummaryMarker />
      <ReportClustersLayer source="reports" />
      <ReportIconsLayer />
      <Toast content={"Syncing Reports..."} show={isSyncing} />
    </>
  );
}
