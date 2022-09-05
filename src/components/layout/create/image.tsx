import React from "react";

import { useCreateForm } from "~/components/layout/create/provider";

import Drawer from "~/components/composites/drawer";
import ImageSelect from "~/components/elements/image-select";

export default function ImageStage() {
  const form = useCreateForm();

  const handleUpload = (image: string) => {
    form.update({ image });
  };

  const handleRemove = () => {
    form.update({ image: undefined });
  };

  return (
    <>
      <Drawer.Row className="p-2">
        <ImageSelect
          onUpload={handleUpload}
          onRemove={handleRemove}
          value={form.values.image}
        />
      </Drawer.Row>
      <Drawer.Row className="justify-between p-2">
        <button className="btn btn-light" onClick={() => form.stage.prev()}>
          <p className="btn-text">Go Back</p>
        </button>
        <button className="btn btn-primary" onClick={() => form.stage.next()}>
          <p className="btn-text">Confirm Details</p>
        </button>
      </Drawer.Row>
    </>
  );
}
