import React from "react";
import Select from "~/components/inputs/select";
import { useFilterSeverities } from "~/hooks/filter/use-filter-severities";

export function SeveritySelect() {
  const { severities, isLoading } = useFilterSeverities();

  if ((!severities || severities.length === 0) && !isLoading) return null;

  return (
    <Select
      label="Severity"
      name="severity"
      placeholder="Loading severities..."
      options={severities?.map((result) => ({
        label: result.title,
        value: result.handle,
      }))}
      onChange={console.log}
      loading={isLoading}
      value={severities?.[0]?.handle}
    />
  );
}
