import { useReportStore } from "~/hooks/reports/use-report-store";

export default function useReportSync() {
  const { syncReports, isSyncing } = useReportStore();
  return { syncReports, isSyncing };
}
