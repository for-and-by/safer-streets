import { useReportStore } from "~/hooks/reports/use-report-store";

export default function useReportSync() {
  const { syncReports } = useReportStore();
  return syncReports;
}
