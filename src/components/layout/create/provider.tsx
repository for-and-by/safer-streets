import React from "react";

import { Stage } from "~/types/create";

import stages from "~/data/stages";

import createContextHook from "~/lib/create-context-hook";

interface ContextValue {
  stage: {
    value: Stage;
    handle: string;
    next: () => void;
    prev: () => void;
  };
  stages: {
    count: number;
  };
  // form: {
  //   values: {};
  //   update: () => void;
  // };
}

interface Props {
  children?: React.ReactNode;
}

const initialValue: ContextValue = {
  stage: {
    value: Object.values(stages)[0],
    handle: Object.keys(stages)[0],
    next: () => {},
    prev: () => {},
  },
  stages: {
    count: Object.keys(stages).length,
  },
  // form: {
  //   values: {},
  //   update: () => {},
  // },
};

const CreateFormContext = React.createContext(initialValue);

export const useCreateForm = createContextHook({ CreateFormContext });

export function CreateFormProvider({ children }: Props) {
  const [stage, setStage] = React.useState<string>(Object.keys(stages)[0]);

  function handleNextStage() {
    const nextStage = stages[stage].next;
    setStage(nextStage);
  }

  function handlePrevStage() {
    const prevStage =
      Object.keys(stages).find((handle) => stage === stages[handle].next) ??
      stage;
    setStage(prevStage);
  }

  const value: ContextValue = {
    stage: {
      value: stages[stage],
      handle: stage,
      next: handleNextStage,
      prev: handlePrevStage,
    },
    stages: {
      count: Object.keys(stages).length,
    },
  };
  return (
    <CreateFormContext.Provider value={value}>
      {children}
    </CreateFormContext.Provider>
  );
}
