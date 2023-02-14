import React from "react";

import parseReportsAsGeoJSON from "~/lib/parse-reports-as-geojson";
import useMapSource from "~/hooks/map/use-map-source";
import useMapImages from "~/hooks/map/use-map-images";
import SummaryMarker from "~/components/organisms/map/popup/summary";
import ReportClustersLayer from "~/components/layout/reports/clusters";
import ReportIconsLayer from "~/components/layout/reports/icons";
import { useLoaderData } from "@remix-run/react";

export default function Reports() {
  const { reports } = useLoaderData();

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
    filter: ["!", ["get", "is_deleted"]],
  });

  return (
    <>
      <SummaryMarker />
      <ReportClustersLayer source="reports" />
      <ReportIconsLayer />
    </>
  );
}
