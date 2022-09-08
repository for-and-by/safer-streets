import React from "react";

import { useCreateForm } from "~/components/layout/create/provider";
import useViewDispatch from "~/hooks/use-view-dispatch";
import useMapDispatch from "~/hooks/use-map-dispatch";
import useReportsDispatch from "~/hooks/use-reports-dispatch";

import Drawer from "~/components/composites/drawer";
import Toast from "~/components/composites/toast";
import useTypedSelector from "~/hooks/use-typed-selector";

export default function ConfirmStage() {
  const form = useCreateForm();
  const view = useViewDispatch();
  const map = useMapDispatch();
  const reports = useReportsDispatch();

  const uploading = useTypedSelector((state) => state.reports.pending.upload);

  const handleSubmit = () => {
    reports.upload(form.inputs.values).then(() => {
      view.active.reset();
      map.controls.unlock();
      form.reset();
      reports.sync();
    });
  };

  return (
    <>
      <Toast content="Uploading report..." show={uploading} />
      <Drawer.Row>
        <div className="flex max-h-64 flex-grow flex-col divide-y-2 divide-white overflow-scroll bg-gray-100 p-2">
          {form?.inputs?.values?.image ? (
            <img
              className="h-32 w-full object-cover"
              alt="Preview thumbnail"
              src={form.inputs.values.image ?? ""}
            />
          ) : null}
          {Object.keys(form.inputs.values).map((key) =>
            !(
              key === "lng" ||
              key === "lat" ||
              key === "image" ||
              key === "description"
            ) ? (
              <div className="flex space-x-4 p-2">
                <p className="w-24 capitalize text-gray-400">{key}</p>
                <p className="capitalize">
                  {form.inputs.values[key as keyof typeof form.inputs.values]}
                </p>
              </div>
            ) : null
          )}
          <div className="flex space-x-4 p-2">
            <p className="w-24 capitalize text-gray-400">Description</p>
            <p>{form.inputs.values.description}</p>
          </div>
        </div>
      </Drawer.Row>
      <Drawer.Row className="justify-between p-2">
        <button className="btn btn-light" onClick={() => form.stage.prev()}>
          <p className="btn-text">Go Back</p>
        </button>
        <button className="btn btn-primary" onClick={handleSubmit}>
          <p className="btn-text">Submit Report</p>
        </button>
      </Drawer.Row>
    </>
  );
}
