import React from "react";

import { SEVERITIES, TYPES } from "~/types/db";

import uploadReport from "~/lib/upload-report";
import fetchTypes from "~/lib/fetch-types";

import useAsync from "~/hooks/use-async";
import { useCreateForm } from "~/components/layout/create/provider";

import Drawer from "~/components/composites/drawer";
import Toast from "~/components/composites/toast";

export default function ConfirmStage() {
  const [uploading, setUploading] = React.useState<boolean>(false);

  const form = useCreateForm();

  const upload = useAsync(async () => {
    if (!uploading) return;

    const inputs = form.inputs.values;

    const [type] = await fetchTypes(inputs.type);
    const fields = Object.keys(type.custom_fields);

    const additionalData = fields.reduce((obj, field) => {
      const value = inputs[field as keyof typeof inputs];
      if (!value) return obj;
      return Object.assign(obj, {
        [field]: value,
      });
    }, {});

    if (!(inputs.lng && inputs.lat))
      throw "No valid coordinates provided for report";

    const results = await uploadReport({
      lng: inputs?.lng,
      lat: inputs?.lat,
      type_handle: inputs?.type as TYPES,
      is_deleted: false,
      description: inputs?.description ?? "",
      severity_handle: inputs?.severity as SEVERITIES,
      data: additionalData,
      image: form.image.value,
    });

    console.log(results);
  }, [uploading]);

  React.useEffect(() => {
    if (!upload.loading) {
      setUploading(false);
    }
  }, [upload.loading]);

  const handleSubmit = () => {
    if (!uploading) {
      setUploading(true);
    }
  };

  return (
    <>
      <Toast content="Uploading image..." show={upload.loading} />
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
