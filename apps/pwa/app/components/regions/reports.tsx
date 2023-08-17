import React from "react";
import { useLoaderData } from "@remix-run/react";

import type { ReportFull } from "@safer-streets/db";
import { getMetadataFromContent } from "@safer-streets/utils";

import { useMapSource } from "~/hooks/map/use-map-source";

import ReportClustersLayer from "~/components/molecules/reports/clusters";
import ReportIconsLayer from "~/components/molecules/reports/icons";
import { MapImages } from "~/components/molecules/reports/images";

import { useReportOpen } from "~/hooks/reports/use-report-open";
import { SummaryMarker } from "~/components/molecules/summary-marker";

export default function Reports() {
  const loader = useLoaderData();
  const reports = loader.reports as ReportFull[];
  const [opened] = useReportOpen();

  useMapSource({
    id: "reports",
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: reports?.map((report) => {
        const { isAging, isHidden } = getMetadataFromContent(
          report.content,
          report.type
        );

        const isUnopened = !opened?.has(report.content_id);

        return {
          type: "Feature",
          properties: {
            ...report,
            ...report.content,
            is_hidden: isHidden,
            is_aging: isAging,
            is_unopened: isUnopened,
          },
          geometry: {
            type: "Point",
            coordinates: [report.lng, report.lat],
          },
        };
      }),
    },
    filter: ["!", ["get", "is_hidden"]],
    cluster: true,
  });

  return (
    <>
      <MapImages />
      <ReportClustersLayer source="reports" />
      <ReportIconsLayer />
      <SummaryMarker />
    </>
  );
}
