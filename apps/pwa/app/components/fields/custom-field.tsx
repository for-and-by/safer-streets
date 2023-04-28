import React from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";

import { useFilterTypes } from "~/hooks/filter/use-filter-types";
import { capitaliseString } from "~/utils/string";

import Text from "~/components/inputs/text";

export default function CustomField() {
  const { control } = useFormContext();
  const typeValue = useWatch({ name: "type" });
  const type = useFilterTypes(typeValue);

  if (!type?.custom_fields) return null;

  return (
    <>
      {Object.keys(type?.custom_fields).map((key) => (
        <Controller
          key={key}
          control={control}
          name={`custom.${key}`}
          render={({ field, fieldState: { error } }) => (
            <Text {...field} label={capitaliseString(key)} error={error} />
          )}
          defaultValue=""
        />
      ))}
    </>
  );
}
