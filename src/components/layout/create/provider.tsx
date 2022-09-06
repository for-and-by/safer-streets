import React from "react";

import { Type } from "~/types/db";

import createContextHook from "~/lib/create-context-hook";
import supabase from "~/lib/supabase-client";

import stages, { Stage } from "~/data/stages";

import useAsync from "~/hooks/use-async";

import Toast from "~/components/composites/toast";

export interface Inputs {
  id?: string;
  lng?: string;
  lat?: string;
  address?: string;
  description?: string;
  image?: string;
  severity?: string;
  type?: string;
  [key: string]: string | undefined;
}

interface ContextValue {
  stage: {
    value: Stage;
    handle: string;
    next: () => void;
    prev: () => void;
    count: number;
  };
  inputs: {
    values: Inputs;
    bind: (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => void;
    update: (value: Inputs) => void;
    clear: () => void;
  };
  errors: {
    values: Inputs;
    update: (value: Inputs) => void;
    clear: () => void;
  };
  type?: Type;
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
    count: Object.keys(stages).length,
  },
  inputs: {
    values: {},
    update: () => {},
    bind: () => {},
    clear: () => {},
  },
  errors: {
    values: {},
    update: () => {},
    clear: () => {},
  },
  reset: () => {},
  type: undefined,
};

const CreateFormContext = React.createContext(initialValue);

export const useCreateForm = createContextHook({ CreateFormContext });

export function CreateFormProvider({ children }: Props) {
  const { stage: _stage, inputs: _inputs, errors: _errors } = initialValue;
  const [stage, setStage] = React.useState<string>(_stage.handle);
  const [inputs, setInputs] = React.useState<Inputs>(_inputs.values);
  const [errors, setErrors] = React.useState<Inputs>(_errors.values);

  const { loading, data: type } = useAsync(async () => {
    if (inputs.type) {
      const { data, error } = await supabase
        .from<Type>("types")
        .select("*")
        .match({ handle: inputs.type })
        .limit(1)
        .single();

      if (error) throw error;
      return data;
    }
  }, [inputs.type]);

  React.useEffect(() => {
    setErrors(_errors.values);
  }, [inputs]);

  const value: ContextValue = {
    stage: {
      value: stages[stage],
      handle: stage,
      next: () => {
        const nextStage = stages[stage].next;
        setStage(nextStage);
      },
      prev: () => {
        const prevStage =
          Object.keys(stages).find((handle) => stage === stages[handle].next) ??
          stage;
        setStage(prevStage);
      },
      count: Object.keys(stages).length,
    },
    inputs: {
      values: inputs,
      update: (input) => {
        setInputs({
          ...inputs,
          ...input,
        });
      },
      bind: (event) => {
        setInputs({
          ...inputs,
          [event.target.name]: event.target.value,
        });
      },
      clear: () => {
        setInputs(_inputs.values);
      },
    },
    errors: {
      values: errors,
      update: (error) => {
        setErrors((errors) => ({
          ...errors,
          ...error,
        }));
      },
      clear: () => {
        setErrors(_errors.values);
      },
    },
    reset: () => {
      setStage(_stage.handle);
      setErrors(_errors.values);
      setInputs(_inputs.values);
    },
    type,
  };

  return (
    <>
      <Toast content={"Fetching type data..."} show={loading} />
      <CreateFormContext.Provider value={value}>
        {children}
      </CreateFormContext.Provider>
    </>
  );
}
