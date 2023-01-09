import React from "react";
import { useController, useFormContext } from "react-hook-form";

import { useFilterSeverities } from "~/hooks/filter/use-filter-severities";

import Select from "~/components/inputs/select";

export default function SeverityField() {
  const { severities, isLoading } = useFilterSeverities();

  const { control } = useFormContext();
  const { field } = useController({
    name: "severity",
    control,
    rules: {
      required: "A severity is required",
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
