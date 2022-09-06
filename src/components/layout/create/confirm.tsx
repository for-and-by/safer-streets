import React from "react";

import { useCreateForm } from "~/components/layout/create/provider";

import Drawer from "~/components/composites/drawer";

export default function ConfirmStage() {
  const form = useCreateForm();

  return (
    <>
      <Drawer.Row className="p-2">
        <div className="flex flex-grow flex-col divide-y-2 divide-white bg-gray-100">
          {Object.keys(form.inputs.values).map((key) =>
            !(key === "lng" || key === "lat" || key === "image") ? (
              <div className="flex space-x-4 p-2">
                <p className="w-24 capitalize text-gray-400">{key}</p>
                <p className="capitalize">
                  {form.inputs.values[key as keyof typeof form.inputs.values]}
                </p>
              </div>
            ) : null
          )}
          {form?.inputs?.values?.image ? (
            <div className="flex space-x-4 p-2">
              <p className="w-24 capitalize text-gray-400">Thumbnail</p>
              <img
                className="h-16 w-32 object-cover"
                alt="Preview thumbnail"
                src={form.inputs.values.image ?? ""}
              />
            </div>
          ) : null}
        </div>
      </Drawer.Row>
      <Drawer.Row className="justify-between p-2">
        <button className="btn btn-light" onClick={() => form.stage.prev()}>
          <p className="btn-text">Go Back</p>
        </button>
        <button className="btn btn-primary" onClick={() => form.stage.next()}>
          <p className="btn-text">Submit Report</p>
        </button>
      </Drawer.Row>
    </>
  );
}
