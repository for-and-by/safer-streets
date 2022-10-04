import { LngLatLike } from "maplibre-gl";

import create, { StateCreator } from "zustand";

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

const initialState: State = {
  zoom: config.map.zoom.default,
  center: config.map.center.default,
  isLocked: false,
};

const store: StateCreator<Store> = (set, get) => ({
  ...initialState,
  incrementZoom: (value) => {
    const { zoom } = get();
    set({
      zoom: zoom + value,
    });
  },
  setZoom: (value) => set({ zoom: value }),
  setCenter: (value) => set({ center: value }),
  setIsLocked: (value) =>
    set({
      isLocked: value,
    }),
});

export const useMapStore = create<Store>(store);
