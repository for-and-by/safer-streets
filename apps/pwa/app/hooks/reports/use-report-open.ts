import { useReportStore } from "~/hooks/reports/use-reports-store";

export function useReportOpen() {
  const opened = useReportStore((state) => state.opened);
  const open = useReportStore((state) => state.open);

  return [opened, open] as [typeof opened, typeof open];
}
