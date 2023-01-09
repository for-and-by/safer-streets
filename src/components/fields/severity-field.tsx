import React from "react";
import { Select } from "~/components/inputs/select";
import { useFilterSeverities } from "~/hooks/filter/use-filter-severities";
import { useController, useFormContext } from "react-hook-form";

export default function SeverityField() {
  const { severities, isLoading } = useFilterSeverities();

  const { control } = useFormContext();
  const { field } = useController({
    name: "severity",
    control,
    rules: {
      required: true,
    },
  });

  if ((!severities || severities.length === 0) && !isLoading) return null;

  return (
    <Select
      label="Severity"
      placeholder="Loading severities..."
      options={severities?.map((result) => ({
        label: result.title,
        value: result.handle,
      }))}
      loading={isLoading}
      {...field}
    />
  );
}
