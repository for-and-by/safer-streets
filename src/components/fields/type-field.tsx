import React from "react";
import { Select } from "~/components/inputs/select";
import { useFilterTypes } from "~/hooks/filter/use-filter-types";
import { useFormContext } from "react-hook-form";

export function TypeField() {
  const { register } = useFormContext();
  const { types, isLoading } = useFilterTypes();

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
      {...register("type", { required: true })}
    />
  );
}
