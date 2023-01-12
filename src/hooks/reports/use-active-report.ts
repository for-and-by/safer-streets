import { useReportStore } from "~/hooks/reports/use-report-store";

export default function useActiveReport() {
  const { activeReportId, setActiveReportId } = useReportStore();
  return [activeReportId, setActiveReportId] as [
    typeof activeReportId,
    typeof setActiveReportId
  ];
}
