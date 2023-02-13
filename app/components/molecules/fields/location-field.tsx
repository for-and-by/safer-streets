import React from "react";
import { useController, useFormContext } from "react-hook-form";

import MapCenterInput from "~/components/molecules/inputs/map-center";

export default function LocationField() {
  const { control } = useFormContext();

  const { field: coordinatesField } = useController({
    name: "location.coordinates",
    control,
    rules: {
      required: true,
    },
  });

  const { field: addressField } = useController({
    name: "location.address",
    control,
    rules: {
      required: true,
    },
  });

  return (
    <MapCenterInput
      onCenterChange={coordinatesField.onChange}
      onAddressChange={addressField.onChange}
    />
  );
}
