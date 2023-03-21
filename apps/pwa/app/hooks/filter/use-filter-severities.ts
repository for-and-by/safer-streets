import { useFilterStore } from "~/hooks/filter/use-filter-store";
import type { Severity } from "@safer-streets/db";
import { useEffect, useState } from "react";

export function useFilterSeverities(): [
  Severity[],
  (handle?: string) => Severity
];
export function useFilterSeverities(handle: string): Severity;

export function useFilterSeverities(handle?: string) {
  const { severities } = useFilterStore();

  function getSeverity(handle?: string) {
    return severities.find((severity) => {
      return severity.handle === handle;
    });
  }

  const [severity, setSeverity] = useState(getSeverity(handle));

  useEffect(() => {
    setSeverity(getSeverity(handle));
    //	eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handle]);

  return handle ? severity : [severities, getSeverity];
}
