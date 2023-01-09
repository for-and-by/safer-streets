import React from "react";
import { useFormContext } from "react-hook-form";
import { EXIT, useCreateContext } from "~/components/views/create/context";
import CancelModal from "~/components/views/create/cancel";

export default function CreatePagination() {
  const { stage, nextStage, prevStage, stages } = useCreateContext();
  const { trigger } = useFormContext();

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

      <button className="btn btn-primary" onClick={handleNext}>
        <p className="btn-text">
          {stages?.[stage.next as keyof typeof stages]?.heading ?? "Submit"}
        </p>
      </button>
    </>
  );
}
