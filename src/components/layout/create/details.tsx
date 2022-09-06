import React from "react";

import { SEVERITIES, TYPES } from "~/types/db";
import capitaliseString from "~/lib/capitalise-string";

import { useCreateForm } from "~/components/layout/create/provider";

import Drawer from "~/components/composites/drawer";
import Select from "~/components/elements/select";
import Textarea from "~/components/elements/textarea";
import TextInput from "~/components/elements/text-input";

export default function DetailsStage() {
  const form = useCreateForm();

  const handleNextStage = () => {
    const { type, severity, description } = form.inputs.values;

    const isValid = (...args: (string | undefined)[]) =>
      args.every((arg) => arg && arg !== "");

    if (!isValid(type))
      form.errors.update({ type: "A report type needs to be selected" });
    if (!isValid(severity))
      form.errors.update({ severity: "A severity needs to be selected" });
    if (!isValid(description))
      form.errors.update({ description: "Some details need to be provided" });

    if (isValid(type, severity, description)) {
      form.stage.next();
    }
  };

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
            onChange={form.inputs.bind}
            value={form.inputs.values.type ?? ""}
            name="type"
            error={form.errors.values.type}
          />
          <Select
            label="Severity"
            options={Object.keys(SEVERITIES).map((key) => ({
              value: SEVERITIES[key as keyof typeof SEVERITIES].toString(),
              label: capitaliseString(key),
            }))}
            value={form.inputs.values.severity ?? ""}
            onChange={form.inputs.bind}
            name="severity"
            error={form.errors.values.severity}
          />
          {form?.type?.custom_fields
            ? Object.keys(form?.type?.custom_fields).map((key) => {
                console.log(key, form.inputs.values);
                return (
                  <TextInput
                    key={key}
                    name={key}
                    label={capitaliseString(key)}
                    onChange={form.inputs.bind}
                    value={form?.inputs?.values?.[key] ?? ""}
                    type={form?.type?.custom_fields[key]}
                  />
                );
              })
            : null}
          <Textarea
            label="Details"
            onChange={form.inputs.bind}
            value={form.inputs.values.description ?? ""}
            name="description"
            error={form.errors.values.description}
          />
        </div>
      </Drawer.Row>
      <Drawer.Row className="justify-between p-2">
        <button className="btn btn-light" onClick={() => form.stage.prev()}>
          <p className="btn-text">Go Back</p>
        </button>
        <button className="btn btn-primary" onClick={handleNextStage}>
          <p className="btn-text">Upload Images</p>
        </button>
      </Drawer.Row>
    </>
  );
}
