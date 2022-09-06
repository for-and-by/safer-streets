import React from "react";

import { Severity, Type } from "~/types/db";

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
  reset: () => void;
  type?: Type;
  types: Type[];
  severities: Severity[];
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
  types: [],
  severities: [],
};

const CreateFormContext = React.createContext(initialValue);

export const useCreateForm = createContextHook({ CreateFormContext });

export function CreateFormProvider({ children }: Props) {
  const {
    stage: _stage,
    inputs: _inputs,
    errors: _errors,
    type: _type,
  } = initialValue;

  const [stage, setStage] = React.useState<string>(_stage.handle);
  const [inputs, setInputs] = React.useState<Inputs>(_inputs.values);
  const [errors, setErrors] = React.useState<Inputs>(_errors.values);
  const [type, setType] = React.useState<Type | undefined>(_type);

  const types = useAsync(async () => {
    const { data, error } = await supabase.from<Type>("types").select("*");

    if (error) throw error;
    return data;
  }, []);

  const severities = useAsync(async () => {
    const { data, error } = await supabase
      .from<Severity>("severities")
      .select("*");

    if (error) throw error;
    return data;
  }, []);

  React.useEffect(() => {
    setErrors(_errors.values);
  }, [inputs]);

  React.useEffect(() => {
    if (inputs?.type && types?.data) {
      setType(types.data.find((type) => type.handle === inputs.type));
    }
  }, [inputs.type, types.data]);

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
    type: type ?? undefined,
    types: types?.data ?? [],
    severities: severities?.data ?? [],
  };

  return (
    <>
      <Toast
        content={"Fetching form data..."}
        show={types.loading || severities.loading}
      />
      <CreateFormContext.Provider value={value}>
        {children}
      </CreateFormContext.Provider>
    </>
  );
}
