import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { VIEWS } from "~/hooks/view/use-view-store";
import useViewIsActive from "~/hooks/view/use-view-is-active";
import useStages from "~/hooks/create/use-stages";

import Header from "~/components/regions/header";
import Footer from "~/components/regions/footer";

import CancelModal from "~/components/views/create/cancel";
import ProgressBar from "~/components/elements/progress-bar";
import Bumper from "~/components/elements/bumper";
import useStagesReset from "~/hooks/create/use-stages-reset";
import CreateForm from "~/components/views/create/form";
import useMapLock from "~/hooks/map/use-map-lock";

export default function Create() {
  const isCreateShow = useViewIsActive(VIEWS.CREATE);
  const methods = useForm({});

  const [stage] = useStages();
  const resetStages = useStagesReset();
  const [, { setUnlock }] = useMapLock();

  useEffect(() => {
    if (!isCreateShow) {
      resetStages();
      methods.reset();
      setUnlock();
    }
  }, [isCreateShow]);

  return (
    <FormProvider {...methods}>
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
      <Footer>
        <Bumper
          show={isCreateShow}
          className="divider-gray-200 flex flex-col divide-y bg-white"
        >
          <div className="p-3">
            <p className="text-base">{stage.description}</p>
          </div>
          <CreateForm />
        </Bumper>
      </Footer>
    </FormProvider>
  );
}
