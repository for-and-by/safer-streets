import React from "react";

import { useCreateForm } from "~/components/layout/create/provider";

import Drawer from "~/components/composites/drawer";
import ImageSelect from "~/components/elements/image-select";

export default function ImageStage() {
  const form = useCreateForm();

  const handleUpload = ({ image, file }: { image: string; file: File }) => {
    form?.inputs?.update({ thumbnail: image });
    form?.image?.update(file);
  };

  const handleRemove = () => {
    form?.image?.clear();
  };

  const handleNextStage = () => {
    if (form.type?.image_required && !form.image.value)
      form.errors.update({
        image: "We need an image for this type of report",
      });
    else form.stage.next();
  };

  return (
    <>
      <Drawer.Row className="flex-col p-2">
        <div className="flex w-full flex-col space-y-2">
          <ImageSelect
            onUpload={handleUpload}
            onRemove={handleRemove}
            thumb={form.inputs.values.thumbnail}
            value={form.image.value}
            error={form.errors.values.image}
            placeholder={
              form.type?.image_required
                ? "Upload a photo (required)"
                : "Upload a photo (optional)"
            }
          />
        </div>
      </Drawer.Row>
      <Drawer.Row className="justify-between p-2">
        <button className="btn btn-light" onClick={() => form.stage.prev()}>
          <p className="btn-text">Go Back</p>
        </button>
        <button className="btn btn-primary" onClick={handleNextStage}>
          <p className="btn-text">Confirm Details</p>
        </button>
      </Drawer.Row>
    </>
  );
}
