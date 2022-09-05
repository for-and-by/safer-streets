import React from "react";

import { useCreateForm } from "~/components/layout/create/provider";

import Drawer from "~/components/composites/drawer";
import Select from "~/components/elements/select";
import Textarea from "~/components/elements/textarea";

export default function DetailsStage() {
  const form = useCreateForm();

  return (
    <>
      <Drawer.Row className="p-2">
        <div className="flex flex-grow flex-col space-y-2">
          <Select
            label="Type"
            options={[{ value: "type-1", label: "Type 1" }]}
            onChange={form.change}
            value={form?.values?.type ?? ""}
            name="type"
          />
          <Select
            label="Severity"
            options={[{ value: "high", label: "High" }]}
            onChange={form.change}
            value={form?.values?.type ?? ""}
            name="type"
          />
          <Textarea label="Details" />
        </div>
      </Drawer.Row>
      <Drawer.Row className="justify-between p-2">
        <button className="btn btn-light" onClick={() => form.stage.prev()}>
          <p className="btn-text">Go Back</p>
        </button>
        <button className="btn btn-primary" onClick={() => form.stage.next()}>
          <p className="btn-text">Upload Images</p>
        </button>
      </Drawer.Row>
    </>
  );
}
