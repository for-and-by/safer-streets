import React from "react";
import useAsync from "~/hooks/use-async";
import Select from "~/components/inputs/select";
import fetchTypes from "~/lib/fetch-types";

export function TypeSelect() {
  const { data, isLoading } = useAsync(fetchTypes, { immediate: true });

  if (!isLoading && (!data || data.length === 0)) return null;

  return (
    <Select
      label="Type"
      name="type"
      placeholder="Loading types..."
      options={data?.map((result) => ({
        label: result.title,
        value: result.handle,
      }))}
      onChange={console.log}
      loading={isLoading}
      value={data?.[0].handle}
    />
  );
}
