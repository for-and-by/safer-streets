import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { useCreateContext } from "~/components/views/create/context";
import CreateForm from "~/components/views/create/form";
import CreatePagination from "~/components/views/create/pagination";

import { VIEWS } from "~/hooks/view/use-view-store";
import useViewIsActive from "~/hooks/view/use-view-is-active";
import useReportUpload from "~/hooks/reports/use-report-upload";
import useMapLock from "~/hooks/map/use-map-lock";

import Header from "~/components/regions/header";
import Footer from "~/components/regions/footer";

import CancelModal from "~/components/views/create/cancel";
import ProgressBar from "~/components/elements/progress-bar";
import Bumper from "~/components/elements/bumper";
import Toast from "~/components/regions/toast";
import CenterMarker from "~/components/layout/map/markers/center";

export default function Create() {
  const isCreateShow = useViewIsActive(VIEWS.CREATE);
  const methods = useForm({
    defaultValues: {
      type: "",
      severity: "",
    },
    mode: "onChange",
  });

  const { resetStage, stage } = useCreateContext();
  const [, { setUnlock }] = useMapLock();
  const { isUploading } = useReportUpload();

  useEffect(() => {
    if (!isCreateShow) {
      resetStage();
      methods.reset();
      setUnlock();
    }
  }, [isCreateShow]);

  return (
    <FormProvider {...methods}>
      <CenterMarker />
      <Header>
        <Bumper show={isCreateShow} className="flex flex-col bg-white">
          <div className="flex flex-row p-2">
            <CancelModal className="btn btn-light">
              <i className="btn-icon icon icon-left" />
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
          <div className="space-y-2 p-2">
            <CreateForm />
          </div>
          <div className="flex flex-row justify-between p-2">
            <CreatePagination />
          </div>
        </Bumper>
      </Footer>
      <Toast show={isUploading} content="Uploading report..." />
    </FormProvider>
  );
}
