import React, { useEffect, useState } from "react";
import { useController, useFormContext } from "react-hook-form";

import { useFilterTypes } from "~/hooks/filter/use-filter-types";

import ImageInput from "~/components/inputs/image";

export default function ImageField() {
  const { control, resetField, getValues } = useFormContext();
  const { types } = useFilterTypes();

  const [required, setRequired] = useState(() => {
    return types.find((type) => type.handle === getValues("type"))
      ?.image_required;
  });

  useEffect(() => {
    setRequired(
      types.find((type) => type.handle === getValues("type"))?.image_required
    );
  }, []);

  const {
    field,
    fieldState: { error },
  } = useController({
    name: "image",
    control,
    rules: {
      required: {
        value: !!required,
        message: "An image is required for this type of report",
      },
    },
  });

  return (
    <ImageInput
      placeholder={
        required ? "Upload a photo (required)" : "Upload a photo (optional)"
      }
      value={field.value}
      onUpload={field.onChange}
      onRemove={() => resetField("image")}
      error={error}
    />
  );
}
