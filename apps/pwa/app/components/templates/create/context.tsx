import type { ComponentProps } from "react";
import React, { createContext, useState } from "react";

import createContextHook from "~/hooks/factories/create-context-hook";

export enum EXIT {
  CANCEL = "CANCEL",
  SUBMIT = "SUBMIT",
}

export enum STAGE {
  LOCATION = "LOCATION",
  DETAILS = "DETAILS",
  IMAGE = "IMAGE",
  CONFIRM = "CONFIRM",
}

export interface Stage {
  step: number;
  heading: string;
  description: string;
  progress: number;
  current: STAGE;
  next: STAGE | EXIT;
  prev: STAGE | EXIT;
}

export const stages: { [key in STAGE]: Stage } = {
  [STAGE.LOCATION]: {
    step: 1,
    heading: "Set Address",
    description:
      "Use the pin or drag the map to where the reports is referring to.",
    progress: 20,
    current: STAGE.LOCATION,
    prev: EXIT.CANCEL,
    next: STAGE.DETAILS,
  },
  [STAGE.DETAILS]: {
    step: 2,
    heading: "Add Details",
    description: "Provide some details about the reports.",
    progress: 55,
    current: STAGE.DETAILS,
    prev: STAGE.LOCATION,
    next: STAGE.IMAGE,
  },
  [STAGE.IMAGE]: {
    step: 3,
    heading: "Add Photo",
    description: "Add an image to the reports.",
    progress: 80,
    current: STAGE.IMAGE,
    prev: STAGE.DETAILS,
    next: STAGE.CONFIRM,
  },
  [STAGE.CONFIRM]: {
    step: 4,
    heading: "Confirm",
    description: "Please confirm that the following details were correct",
    progress: 90,
    current: STAGE.CONFIRM,
    prev: STAGE.IMAGE,
    next: EXIT.SUBMIT,
  },
};

interface ContextValue {
  stage: Stage;
  nextStage: () => void;
  prevStage: () => void;
  jumpToStage: (stage: STAGE) => void;
  resetStage: () => void;
  stages: typeof stages;
}

const initialValue: ContextValue = {
  stage: stages[STAGE.LOCATION],
  nextStage: () => {},
  prevStage: () => {},
  jumpToStage: () => {},
  resetStage: () => {},
  stages,
};
export const CreateContext = createContext(initialValue);
export const useCreateContext = createContextHook({ CreateContext });

type Props = ComponentProps<"div">;

export default function CreateProvider({ children }: Props) {
  const { stage: _stage } = initialValue;
  const [stage, setStage] = useState(_stage);

  const nextStage = () => {
    if (stage.next in STAGE) {
      setStage(stages[stage.next as STAGE]);
    }
  };

  const prevStage = () => {
    if (stage.prev in STAGE) {
      setStage(stages[stage.prev as STAGE]);
    }
  };

  const jumpToStage = (stage: STAGE) => {
    setStage(stages[stage]);
  };

  const resetStage = () => {
    setStage(_stage);
  };

  const value: ContextValue = {
    stage,
    nextStage,
    prevStage,
    jumpToStage,
    resetStage,
    stages,
  };

  return (
    <CreateContext.Provider value={value}>{children}</CreateContext.Provider>
  );
}
