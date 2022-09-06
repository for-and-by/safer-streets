import React from "react";

import { useCreateForm } from "~/components/layout/create/provider";

import Drawer from "~/components/composites/drawer";
import ProgressBar from "~/components/elements/progress-bar";
import CancelModal from "~/components/layout/create/cancel";

export default function CreateHeader() {
  const form = useCreateForm();
  const stage = form.stage.value;

  return (
    <>
      <Drawer.Row className="p-2">
        <CancelModal>
          <button className="btn btn-light">
            <i className="btn-icon icon icon-left" />
          </button>
        </CancelModal>

        <div className="flex flex-col px-3">
          <h3 className="font-medium">{stage.heading}</h3>
          <p className="text-sm text-base-400">
            Step {stage.step} of {form.stages.count}
          </p>
        </div>
      </Drawer.Row>
      <Drawer.Row>
        <ProgressBar value={stage.progress} />
      </Drawer.Row>
    </>
  );
}
