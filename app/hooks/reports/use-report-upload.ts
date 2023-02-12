import { useReportStore } from "~/hooks/reports/use-report-store";

export default function useReportUpload() {
  const { uploadReport, isUploading } = useReportStore();
  return { uploadReport, isUploading };
}
