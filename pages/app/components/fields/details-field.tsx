import React from "react";
import Textarea from "~/components/inputs/textarea";
import { useController, useFormContext } from "react-hook-form";

export default function DetailsField() {
  const { control } = useFormContext();
  const {
    field,
    fieldState: { error },
  } = useController({
    name: "details",
    control,
    rules: {
      required: "A brief description of the report is required",
    },
  });

  return <Textarea label="Details" {...field} error={error} />;
}
