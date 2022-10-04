import create, { StateCreator } from "zustand";

export enum VIEWS {
  HOME = "home",
  SEARCH = "search",
  CREATE = "create",
}

interface State {
  view: VIEWS;
}

interface Actions {
  setView: (value: State["view"]) => void;
  resetView: () => void;
}

interface Store extends Actions, State {}

const initialState: State = {
  view: VIEWS.HOME,
};

const store: StateCreator<Store> = (set) => ({
  ...initialState,
  setView: (value) =>
    set({
      view: value,
    }),
  resetView: () => set(initialState),
});

export const useViewStore = create<Store>(store);
