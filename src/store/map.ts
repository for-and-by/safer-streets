import type { PayloadAction } from "@reduxjs/toolkit";
import type { LngLatLike } from "maplibre-gl";
import { MapState, StoreStartListening } from "./types";

import { createSlice, isAnyOf } from "@reduxjs/toolkit";

import config from "~/config";

const initialState: MapState = {
  zoom: config.map.zoom.default,
  center: config.map.center,
};

export const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    zoomIn: (state) => {
      state.zoom += 0.5;
    },
    zoomOut: (state) => {
      state.zoom -= 0.5;
    },
    setZoom: (state, action: PayloadAction<number>) => {
      state.zoom = action.payload;
    },
    setCenter: (state, action: PayloadAction<LngLatLike>) => {
      state.center = action.payload;
    },
  },
});

export const { zoomIn, zoomOut, setZoom, setCenter } = mapSlice.actions;

export function addMapListeners(startListening: StoreStartListening) {
  startListening({
    matcher: isAnyOf(zoomIn, zoomOut),
    effect: (_, { getState, dispatch }) => {
      const state = getState();
      const { zoom } = state.map;
      const { max, min } = config.map.zoom;

      if (zoom > max) {
        dispatch(setZoom(max));
      } else if (zoom < min) {
        dispatch(setZoom(min));
      }
    },
  });
}

const MapReducer = mapSlice.reducer;
export default MapReducer;
