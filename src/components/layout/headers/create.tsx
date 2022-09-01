import { VIEWS } from "~/types/view";

import React from "react";

import useTypedSelector from "~/hooks/use-typed-selector";
import useTypedDispatch from "~/hooks/use-typed-dispatch";

import Drawer from "~/components/composites/drawer";
import view from "~/store/view/actions";
import stages from "~/data/stages";
import ProgressBar from "~/components/elements/progress-bar";
import create from "~/store/create/actions";

export default function CreateHeader() {
  const stage = useTypedSelector((state) => state.create.stage);
  const dispatch = useTypedDispatch();

  const handleExitSearch = () => {
    dispatch(view.active.set(VIEWS.HOME));
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
            Step {stage.step} of {stages.length}
          </p>
        </div>
      </Drawer.Row>
      <Drawer.Row>
        <ProgressBar value={stage.progress} />
      </Drawer.Row>
    </>
  );
}
