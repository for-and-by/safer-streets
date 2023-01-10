import React, { useEffect } from "react";
import useReports from "~/hooks/reports/use-reports";
import useReportSync from "~/hooks/reports/use-report-sync";
import Toast from "~/components/regions/toast";
import ReportMarker from "~/components/map/markers/report";

export default function Reports() {
  const reports = useReports();
  const { syncReports, isSyncing } = useReportSync();

  useEffect(() => {
    syncReports().finally();
  }, []);

  return (
    <>
      <Toast content={"Syncing Reports..."} show={isSyncing} />
      {reports.map((report) => (
        <ReportMarker key={report.id} report={report} />
      ))}
    </>
  );
}
