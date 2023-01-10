import React, { useEffect } from "react";
import useReports from "~/hooks/reports/use-reports";
import useReportSync from "~/hooks/reports/use-report-sync";

import Toast from "~/components/regions/toast";
import Source from "~/components/map/source";
import Layer from "~/components/map/layer";

export default function Reports() {
  const { geojson } = useReports();
  const { syncReports, isSyncing } = useReportSync();

  useEffect(() => {
    syncReports().finally();
  }, []);

  return (
    <>
      <Toast content={"Syncing Reports..."} show={isSyncing} />
      <Source id="reports" type="geojson" data={JSON.parse(geojson)} cluster />
      <Layer
        id="clusters"
        type="circle"
        source="reports"
        paint={{
          "circle-color": "#11b4da",
          "circle-radius": 4,
          "circle-stroke-width": 1,
          "circle-stroke-color": "#fff",
        }}
      />
      {/*{reports.map((report) => (*/}
      {/*  <ReportMarker key={report.id} report={report} />*/}
      {/*))}*/}
    </>
  );
}
