import { useReportStore } from "~/hooks/reports/use-report-store";

export default function useReportStatus() {
  const { isSyncing, isUploading } = useReportStore();
  return { isSyncing, isUploading };
}
