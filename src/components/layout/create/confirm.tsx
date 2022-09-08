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
    reports
      .upload({ inputs: form.inputs.values, image: form.image.value })
      .then(() => {
        view.active.reset();
        map.controls.unlock();
        form.reset();
        reports.sync();
      });
  };

  return (
    <>
      <Toast content="Uploading report..." show={uploading} />
      <Drawer.Row className="p-2">
        <div className="flex flex-grow flex-col divide-y-2 divide-white bg-gray-100">
          {Object.keys(form.inputs.values).map((key) =>
            !(key === "lng" || key === "lat" || key === "thumbnail") ? (
              <div className="flex space-x-4 p-2">
                <p className="w-24 capitalize text-gray-400">{key}</p>
                <p className="capitalize">
                  {form.inputs.values[key as keyof typeof form.inputs.values]}
                </p>
              </div>
            ) : null
          )}
          {form?.inputs?.values?.thumbnail ? (
            <div className="flex space-x-4 p-2">
              <p className="w-24 capitalize text-gray-400">Thumbnail</p>
              <img
                className="h-16 w-32 object-cover"
                alt="Preview thumbnail"
                src={form.inputs.values.thumbnail ?? ""}
              />
            </div>
          ) : null}
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
