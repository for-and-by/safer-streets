import React from "react";
import { useFormContext } from "react-hook-form";
import { EXIT, useCreateContext } from "~/components/templates/create/context";
import useReportUpload from "~/hooks/reports/use-report-upload";
import { Warning } from "~/components/composites/warning";
import { useSubmit } from "@remix-run/react";

export default function CreatePagination() {
  const { stage, nextStage, prevStage, stages } = useCreateContext();
  const { trigger, handleSubmit } = useFormContext();
  const submit = useSubmit();

  const { uploadReport, isUploading } = useReportUpload();

  const handleNext = () => {
    trigger().then((result) => {
      if (result) {
        nextStage();
      }
    });
  };

  const handleComplete = () => {
    handleSubmit(async (values) => {
      const data = new FormData();
      console.log(values);
    });
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
        <button className="btn btn-primary" onClick={handleComplete}>
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
