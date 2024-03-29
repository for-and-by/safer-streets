import React from "react";
import { useController, useFormContext } from "react-hook-form";

import { useFilterTypes } from "~/hooks/filter/use-filter-types";

import ImageInput from "~/components/inputs/image";

export default function ImageField() {
  const { control, resetField, getValues } = useFormContext();
  const type = useFilterTypes(getValues("type"));

  const { field, fieldState } = useController({
    name: "image",
    control,
    rules: {
      required: {
        value: !!type?.image_required,
        message: "An image is required for this type of report",
      },
    },
  });

  return (
    <ImageInput
      placeholder={
        type?.image_required
          ? "Upload a photo (required)"
          : "Upload a photo (optional)"
      }
      value={field.value}
      onUpload={(image) => field.onChange(image)}
      onRemove={() => resetField("image")}
      error={fieldState.error}
    />
  );
}
