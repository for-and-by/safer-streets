import { VIEWS } from "~/hooks/view/use-view-store";
import useViewIsActive from "~/hooks/view/use-view-is-active";
import useStages from "~/hooks/create/use-stages";

import Header from "~/components/regions/header";
import Footer from "~/components/regions/footer";

import CancelModal from "~/components/layout/create/cancel";
import ProgressBar from "~/components/elements/progress-bar";
import Bumper from "~/components/elements/bumper";
import { EXIT } from "~/hooks/create/use-stages-store";
import React from "react";

export default function Create() {
  const isCreateShow = useViewIsActive(VIEWS.CREATE);
  const [stage, { nextStage, prevStage }] = useStages();

  return (
    <>
      <Header>
        <Bumper show={isCreateShow} className="flex flex-col bg-white">
          <div className="flex flex-row p-2">
            <CancelModal>
              <button className="btn btn-light">
                <i className="btn-icon icon icon-left" />
              </button>
            </CancelModal>

            <div className="flex flex-col px-3">
              <h3 className="font-medium">{stage.heading}</h3>
              <p className="text-sm text-base-400">Step {stage.step} of 4</p>
            </div>
          </div>
          <ProgressBar value={stage.progress} />
        </Bumper>
      </Header>
      <Footer bg-e>
        <Bumper
          show={isCreateShow}
          className="divider-gray-200 flex flex-col divide-y bg-white"
        >
          <div className="p-3">
            <p className="text-base">{stage.description}</p>
          </div>
          <div className="flex flex-row justify-between p-2">
            {stage.prev === EXIT.CANCEL ? (
              <CancelModal>
                <button className="btn btn-light">
                  <p className="btn-text">Cancel</p>
                </button>
              </CancelModal>
            ) : (
              <button className="btn btn-light" onClick={prevStage}>
                <p className="btn-text">Go Back</p>
              </button>
            )}
            {stage.next === EXIT.SUBMIT ? (
              <CancelModal>
                <button className="btn btn-light">
                  <p className="btn-text">Submit Details</p>
                </button>
              </CancelModal>
            ) : (
              <button className="btn btn-primary" onClick={nextStage}>
                <p className="btn-text">Provide Details</p>
              </button>
            )}
          </div>
        </Bumper>
      </Footer>
    </>
  );
}
