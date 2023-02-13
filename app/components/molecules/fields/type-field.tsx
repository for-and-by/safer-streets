import React from "react";
import { useController, useFormContext } from "react-hook-form";

import { useFilterTypes } from "~/hooks/filter/use-filter-types";

import Select from "~/components/molecules/inputs/select";

export default function TypeField() {
  const { types, isLoading } = useFilterTypes();

  const { control } = useFormContext();
  const {
    field,
    fieldState: { error },
  } = useController({
    name: "type",
    control,
    rules: {
      required: "A report type is required",
    },
  });

  if (!isLoading && (!types || types.length === 0)) return null;

  return (
    <Select
      label="Type"
      placeholder="Loading types..."
      options={types?.map((result) => ({
        label: result.title,
        value: result.handle,
      }))}
      loading={isLoading}
      error={error}
      {...field}
    />
  );
}
