import { useFormContext } from "react-hook-form";
import React from "react";

export default function SummaryField() {
  const { getValues } = useFormContext();

  const values = getValues();

  return (
    <div className="flex max-h-64 flex-grow flex-col divide-y-2 divide-white overflow-scroll">
      {values?.image ? (
        <img
          className="h-32 w-full object-cover"
          alt="Preview thumbnail"
          src={values.image}
        />
      ) : null}
      {Object.keys(values).map((key) =>
        !["location", "image", "details"].includes(key) && !!values[key] ? (
          <div className="flex space-x-4 bg-gray-100 p-3">
            <p className="w-24 capitalize text-gray-400">{key}</p>
            <p className="capitalize">{values[key]}</p>
          </div>
        ) : null
      )}
      <div className="flex space-x-4 bg-gray-100 p-3">
        <p className="w-24 capitalize text-gray-400">Details</p>
        <p>{values.details}</p>
      </div>
    </div>
  );
}
