import type { Dispatch, SetStateAction } from "react";
import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";

import type { MetaFunction } from "@remix-run/cloudflare";
import { Outlet, useNavigate, useOutletContext } from "@remix-run/react";

import { formatMetadata } from "~/utils/seo";

import Header from "~/components/regions/header";

import CenterMarker from "~/components/molecules/markers/center";
import { Warning, useWarning } from "~/components/composites/warning";
import { ProgressBar } from "~/components/atoms/progress-bar";

export function meta() {
  return formatMetadata({
    title: "Create New Report",
  });
}

type Stage = {
  step: number;
  progress: number;
  heading: string;
};

type ContextValue = {
  stage: Stage;
  setStage: Dispatch<SetStateAction<Stage>>;
  showWarning: () => void;
};

export default function CreateIndex() {
  const navigate = useNavigate();
  const [stage, setStage] = useState<Stage>({
    step: 1,
    progress: 20,
    heading: "Confirm a location",
  });

  const methods = useForm({
    defaultValues: {
      type: "",
      severity: "",
    },
    mode: "onChange",
  });

  const [isShow, { showWarning, hideWarning, confirmWarning }] = useWarning(
    () => {
      navigate("/");
    }
  );

  const value: ContextValue = {
    stage,
    setStage,
    showWarning,
  };

  return (
    <FormProvider {...methods}>
      <CenterMarker />
      <Header>
        <div className="flex flex-col bg-white">
          <div className="flex flex-row p-2">
            <Warning.Trigger className="btn btn-light" onShow={showWarning}>
              <i className="btn-icon icon icon-arrow-left" />
            </Warning.Trigger>
            <div className="flex flex-col px-3">
              <h3 className="font-medium">{stage.heading}</h3>
              <p className="text-sm text-base-400">Step {stage.step} of 4</p>
            </div>
          </div>
          <ProgressBar value={stage.progress} />
        </div>
      </Header>
      <Outlet context={value} />
      <Warning.Panel
        heading="Cancel Report Submission"
        body="Are you sure you want to cancel this submission? All data submitted up to this point will be lost."
        isShow={isShow}
        onHide={hideWarning}
        onConfirm={confirmWarning}
      />
    </FormProvider>
  );
}

export function useCreateOutlet() {
  return useOutletContext<ContextValue>();
}
