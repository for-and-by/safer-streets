import ImageInput from "~/components/inputs/image";
import React from "react";
import { useController, useFormContext } from "react-hook-form";

interface Props {
  required?: boolean;
}

export function ImageField({ required }: Props) {
  const { control, resetField } = useFormContext();
  const { field } = useController({
    name: "image",
    control,
    rules: { required: true },
  });

  return (
    <ImageInput
      placeholder={
        required ? "Upload a photo (required)" : "Upload a photo (optional)"
      }
      value={field.value}
      onUpload={field.onChange}
      onRemove={() => resetField("image")}
    />
  );
}
