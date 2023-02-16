import React from "react";
import useMapSource from "~/hooks/map/use-map-source";
import useMapImages from "~/hooks/map/use-map-images";
import ReportClustersLayer from "~/components/molecules/reports/clusters";
import ReportIconsLayer from "~/components/molecules/reports/icons";
import { useLoaderData } from "@remix-run/react";
import type { ReportFull } from "~/types/db";

export default function Reports() {
  const { reports } = useLoaderData<{ reports: ReportFull[] }>();

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
    data: {
      type: "FeatureCollection",
      features: reports.map((report) => ({
        type: "Feature",
        properties: { ...report, ...report.content },
        geometry: {
          type: "Point",
          coordinates: [report.lng, report.lat],
        },
      })),
    },
    cluster: true,
    filter: ["!", ["get", "is_deleted"]],
  });

  useMapSource({
    id: "reports-new",
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: reports.map((report) => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [report.lng, report.lat],
        },
      })),
    },
    cluster: true,
    filter: ["!", ["get", "is_deleted"]],
  });

  return (
    <>
      <ReportClustersLayer source="reports" />
      <ReportIconsLayer />
    </>
  );
}
