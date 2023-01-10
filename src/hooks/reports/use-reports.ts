import { useReportStore } from "~/hooks/reports/use-report-store";

export default function useReports() {
  const { reports } = useReportStore();
  return reports;
}
