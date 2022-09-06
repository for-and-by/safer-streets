import React from "react";

import { useCreateForm } from "~/components/layout/create/provider";

import Drawer from "~/components/composites/drawer";

export default function ConfirmStage() {
  const form = useCreateForm();

  return (
    <>
      <Drawer.Row className="p-2">
        <div className="flex flex-grow flex-col space-y-2 bg-gray-100 p-3">
          {Object.keys(form.values).map((key) =>
            !(key === "lng" || key === "lat") ? (
              <div className="flex space-x-4">
                <p className="w-24 capitalize text-gray-400">{key}</p>
                <p className="capitalize">
                  {form.values[key as keyof typeof form.values]}
                </p>
              </div>
            ) : null
          )}
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
