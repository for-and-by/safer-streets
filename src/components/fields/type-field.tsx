import React from "react";
import { Select } from "~/components/inputs/select";
import { useFilterTypes } from "~/hooks/filter/use-filter-types";
import { useController, useFormContext } from "react-hook-form";

export default function TypeField() {
  const { types, isLoading } = useFilterTypes();

  const { control } = useFormContext();
  const { field, fieldState, formState } = useController({
    name: "type",
    control,
    rules: {
      required: true,
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
      {...field}
    />
  );
}
