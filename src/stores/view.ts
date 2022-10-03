import create, { StateCreator } from "zustand";
import { immer } from "zustand/middleware/immer";

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

const store: StateCreator<Store, [["zustand/immer", never]]> = (set) => ({
  view: VIEWS.HOME,
  setView: (value) =>
    set((state) => {
      state.view = value;
    }),
  resetView: () =>
    set((state) => {
      state.view = VIEWS.HOME;
    }),
});

export const useViewStore = create<Store>()(immer(store));
