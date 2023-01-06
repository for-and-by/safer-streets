import { useFilterStore } from "~/hooks/filter/use-filter-store";
import { useEffect } from "react";

export function useFilterSeverities() {
  const { severities, fetchSeverities } = useFilterStore();

  useEffect(() => {
    if (!severities || severities.length === 0) {
      fetchSeverities().finally();
    }
  }, [severities]);

  return severities;
}
