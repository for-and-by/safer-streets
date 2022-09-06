import React from "react";

import { SEVERITIES, TYPES } from "~/types/db";
import capitaliseString from "~/lib/capitalise-string";

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
            options={Object.keys(TYPES).map((key) => ({
              value: TYPES[key as keyof typeof TYPES],
              label: capitaliseString(key),
            }))}
            onChange={form.change}
            value={form?.values?.type?.toString() ?? ""}
            name="type"
          />
          <Select
            label="Severity"
            options={Object.keys(SEVERITIES).map((key) => ({
              value: SEVERITIES[key as keyof typeof SEVERITIES].toString(),
              label: capitaliseString(key),
            }))}
            value={form?.values?.severity?.toString() ?? ""}
            onChange={form.change}
            name="severity"
          />
          <Textarea
            label="Details"
            onChange={form.change}
            value={form?.values?.description ?? ""}
            name="description"
          />
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
