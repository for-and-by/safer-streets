import { useFormContext } from "react-hook-form";
import React from "react";

export default function SummaryField() {
  const { getValues } = useFormContext();

  const values = getValues();

  console.log("values :>>", values);

  return (
    <div className="flex max-h-64 flex-grow flex-col divide-y-2 divide-white overflow-scroll">
      {values?.image ? (
        <img
          className="h-32 w-full object-cover"
          alt="Preview thumbnail"
          src={values.image.data}
        />
      ) : null}
      {Object.keys(values).map((key) =>
        !["location", "image", "details", "custom"].includes(key) &&
        !!values[key] ? (
          <div key={key} className="flex space-x-4 bg-gray-100 p-3">
            <p className="w-24 capitalize text-gray-400">{key}</p>
            <p className="capitalize">{values[key]}</p>
          </div>
        ) : null
      )}
      {Object.keys(values?.custom ?? {}).map((key) =>
        values.custom[key] ? (
          <div key={key} className="flex space-x-4 bg-gray-100 p-3">
            <p className="w-24 capitalize text-gray-400">{key}</p>
            <p className="capitalize">{values.custom[key]}</p>
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
