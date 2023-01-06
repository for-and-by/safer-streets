import React from "react";
import Select from "~/components/inputs/select";
import { useFilterTypes } from "~/hooks/filter/use-filter-types";

export function TypeField() {
  const { types, isLoading } = useFilterTypes();

  if (!isLoading && (!types || types.length === 0)) return null;

  return (
    <Select
      label="Type"
      name="type"
      placeholder="Loading types..."
      options={types?.map((result) => ({
        label: result.title,
        value: result.handle,
      }))}
      onChange={console.log}
      loading={isLoading}
      value={types?.[0]?.handle}
    />
  );
}
