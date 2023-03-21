import React from "react";
import { useSubmit } from "@remix-run/react";
import type { SubmitErrorHandler, SubmitHandler } from "react-hook-form";
import { useFormContext } from "react-hook-form";

import { EXIT, useCreateContext } from "~/components/templates/create/context";
import { Warning } from "~/components/composites/warning";

export default function CreatePagination() {
  const submit = useSubmit();
  const { trigger, handleSubmit } = useFormContext();

  const { stage, nextStage, prevStage, stages } = useCreateContext();

  const handleNext = () => {
    trigger().then((result) => {
      if (result) {
        nextStage();
      }
    });
  };

  const handleSuccess: SubmitHandler<any> = (values) => {
    const data = new FormData();
    data.append("create", JSON.stringify(values));
    submit(data, { method: "post", action: "/create" });
  };

  const handleError: SubmitErrorHandler<any> = (errors) => {
    throw errors;
  };

  return (
    <>
      {stage.prev === EXIT.CANCEL ? (
        <Warning.Trigger className="btn btn-light">
          <p className="btn-text">Cancel</p>
        </Warning.Trigger>
      ) : (
        <button className="btn btn-light" onClick={prevStage}>
          <p className="btn-text">
            {stages?.[stage.prev as keyof typeof stages]?.heading}
          </p>
        </button>
      )}
      {stage.next === EXIT.SUBMIT ? (
        <button
          className="btn btn-primary"
          onClick={handleSubmit(handleSuccess, handleError)}
        >
          <p className="btn-text">Submit Report</p>
        </button>
      ) : (
        <button className="btn btn-primary" onClick={handleNext}>
          <p className="btn-text">
            {stages?.[stage.next as keyof typeof stages]?.heading}
          </p>
        </button>
      )}
    </>
  );
}
