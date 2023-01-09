import { useReportStore } from "~/hooks/reports/use-report-store";

export default function useReportUpload() {
  const { uploadReport } = useReportStore();
  return uploadReport;
}
