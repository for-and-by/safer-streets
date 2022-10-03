import { LngLatLike } from "maplibre-gl";

import create, { StateCreator } from "zustand";
import { immer } from "zustand/middleware/immer";

import config from "~/config";

interface State {
  zoom: number;
  center: LngLatLike;
  isLocked: boolean;
}

interface Actions {
  incrementZoom: (value: State["zoom"]) => void;
  setZoom: (value: State["zoom"]) => void;
  setCenter: (value: State["center"]) => void;
  setIsLocked: (value: State["isLocked"]) => void;
}

interface Store extends Actions, State {}

const store: StateCreator<Store, [["zustand/immer", never]]> = (set) => ({
  zoom: config.map.zoom.default,
  center: config.map.center.default,
  isLocked: false,
  incrementZoom: (value) => {
    set((state) => {
      state.zoom += value;
    });
  },
  setZoom: (value) =>
    set((state) => {
      state.zoom = value;
    }),
  setCenter: (value) =>
    set((state) => {
      state.center = value;
    }),
  setIsLocked: (value) =>
    set((state) => {
      state.isLocked = value;
    }),
});

export const useMapStore = create<Store>()(immer(store));
