import React from "react";
import stages, { Stage } from "~/data/stages";

import createContextHook from "~/lib/create-context-hook";
import { Report, SEVERITIES, TYPES } from "~/types/db";

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
  values: {
    lng?: Report["lng"];
    lat?: Report["lat"];
    type?: TYPES;
    severity?: SEVERITIES;
    description?: string;
    address?: string;
    image?: string;
  };
  change: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  update: (value: { [key: string]: string | number | undefined }) => void;
  reset: () => void;
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
  values: {},
  update: () => {},
  change: () => {},
  reset: () => {},
};

const CreateFormContext = React.createContext(initialValue);

export const useCreateForm = createContextHook({ CreateFormContext });

export function CreateFormProvider({ children }: Props) {
  const [stage, setStage] = React.useState<string>(initialValue.stage.handle);
  const [values, setValues] = React.useState<ContextValue["values"]>(
    initialValue.values
  );

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

  const handleUpdateValue: ContextValue["update"] = (value) => {
    setValues({
      ...values,
      ...value,
    });
  };

  const handleChangeValue: ContextValue["change"] = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleResetValues: ContextValue["reset"] = () => {
    setValues(initialValue.values);
    setStage(initialValue.stage.handle);
  };

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
    values: values,
    update: handleUpdateValue,
    change: handleChangeValue,
    reset: handleResetValues,
  };
  return (
    <CreateFormContext.Provider value={value}>
      {children}
    </CreateFormContext.Provider>
  );
}
