import React from "react";
import Textarea from "~/components/inputs/textarea";
import { useFormContext } from "react-hook-form";

export function DetailsField() {
  const { register } = useFormContext();

  return <Textarea label="Details" {...register("description")} />;
}
