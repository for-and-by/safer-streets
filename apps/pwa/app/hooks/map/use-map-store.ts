import type { LngLatLike } from "maplibre-gl";

import type { StateCreator } from "zustand";
import { create } from "zustand";

import { config } from "~/config";

interface State {
  center: LngLatLike;
  isLocked: boolean;
}

interface Actions {
  setCenter: (value: State["center"]) => void;
  setIsLocked: (value: State["isLocked"]) => void;
}

interface Store extends Actions, State {}

const initialState: State = {
  center: config.map.center.default,
  isLocked: false,
};

const store: StateCreator<Store> = (set, get) => ({
  ...initialState,
  setCenter: (value) => set({ center: value }),
  setIsLocked: (value) =>
    set({
      isLocked: value,
    }),
});

export const useMapStore = create<Store>(store);
