import React from "react";

import useViewDispatch from "~/hooks/use-view-dispatch";
import { useCreateForm } from "~/components/layout/create/provider";

import Drawer from "~/components/composites/drawer";
import ProgressBar from "~/components/elements/progress-bar";

export default function CreateHeader() {
  const form = useCreateForm();
  const view = useViewDispatch();

  const stage = form.stage.value;

  const handleExitSearch = () => {
    view.active.reset();
  };

  return (
    <>
      <Drawer.Row className="p-2">
        <button className="btn btn-light" onClick={handleExitSearch}>
          <i className="btn-icon icon icon-left" />
        </button>
        <div className="flex flex-col px-3">
          <h3 className="text-base text-base-700">{stage.heading}</h3>
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
