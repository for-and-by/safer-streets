import Image from "~/components/inputs/image";
import React from "react";

interface Props {
  required?: boolean;
}

export function ImageField({ required }: Props) {
  return (
    <Image
      placeholder={
        required ? "Upload a photo (required)" : "Upload a photo (optional)"
      }
    />
  );
}
