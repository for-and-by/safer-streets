import React from "react";
import { useFormContext } from "react-hook-form";
import { EXIT, useCreateContext } from "~/components/views/create/context";
import CancelModal from "~/components/views/create/cancel";
import useReportUpload from "~/hooks/reports/use-report-upload";
import useViewReset from "~/hooks/view/use-view-reset";
import { FormValues } from "~/types/form";
import useReportStatus from "~/hooks/reports/use-report-status";

export default function CreatePagination() {
  const { stage, nextStage, prevStage, stages } = useCreateContext();
  const { trigger, handleSubmit } = useFormContext();
  const uploadReport = useReportUpload();
  const { isUploading } = useReportStatus();
  const resetView = useViewReset();

  const handleNext = () => {
    trigger().then((result) => {
      if (result) {
        nextStage();
      }
    });
  };

  return (
    <>
      {stage.prev === EXIT.CANCEL ? (
        <CancelModal>
          <button className="btn btn-light" onClick={prevStage}>
            <p className="btn-text">Cancel</p>
          </button>
        </CancelModal>
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
          onClick={handleSubmit(async (values) => {
            await uploadReport(values as FormValues);
            resetView();
          })}
        >
          <p className="btn-text">Submit Report</p>
        </button>
      ) : (
        <button
          className="btn btn-primary"
          onClick={handleNext}
          disabled={isUploading}
        >
          <p className="btn-text">
            {stages?.[stage.next as keyof typeof stages]?.heading}
          </p>
        </button>
      )}
    </>
  );
}
