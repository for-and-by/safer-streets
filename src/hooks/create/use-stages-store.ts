import create, { StateCreator } from "zustand";

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

interface State {
  stage: STAGE;
}

interface Actions {
  nextStage: () => void;
  prevStage: () => void;
  jumpToStage: (value: State["stage"]) => void;
  getStageContent: () => Stage;
  resetStage: () => void;
}

interface Store extends Actions, State {}

export const stages: { [key in STAGE]: Stage } = {
  [STAGE.LOCATION]: {
    step: 1,
    heading: "Confirm Address",
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
    heading: "Upload Photo",
    description: "Add an image to the reports.",
    progress: 80,
    current: STAGE.IMAGE,
    prev: STAGE.DETAILS,
    next: STAGE.CONFIRM,
  },
  [STAGE.CONFIRM]: {
    step: 4,
    heading: "Confirm Details",
    description: "Please confirm that the following details were correct",
    progress: 90,
    current: STAGE.CONFIRM,
    prev: STAGE.IMAGE,
    next: EXIT.SUBMIT,
  },
};

const initialState: State = {
  stage: STAGE.LOCATION,
};

const store: StateCreator<Store> = (set, get) => ({
  ...initialState,
  nextStage: () => {
    const { stage } = get();
    set({
      stage: stages[stage].next as STAGE,
    });
  },
  prevStage: () => {
    const { stage } = get();
    set({
      stage: stages[stage].prev as STAGE,
    });
  },
  jumpToStage: (value) => {
    set({
      stage: value,
    });
  },
  getStageContent: () => {
    const { stage } = get();
    return stages[stage];
  },
  resetStage: () => {
    set(initialState);
  },
});

export const useStageStore = create<Store>(store);
