import * as Redux from "@reduxjs/toolkit";
import config from "~/config";
import map from "~/store/map/actions";
import parseLngLat from "~/lib/parse-lng-lat";

interface State {
  zoom: number;
  center: [number, number];
  controls: {
    lock: boolean;
  };
}

const initialState: State = {
  zoom: config.map.zoom.default,
  center: config.map.center,
  controls: {
    lock: false,
  },
};

const reducer = Redux.createReducer(initialState, (builder) => {
  builder
    .addCase(map.zoom.in, (state) => {
      state.zoom += 0.5;
    })
    .addCase(map.zoom.out, (state) => {
      state.zoom -= 0.5;
    })
    .addCase(map.zoom.set, (state, action) => {
      state.zoom = action.payload;
    })
    .addCase(map.center.set, (state, action) => {
      const center = parseLngLat(action.payload);
      if (!center) throw new Error("Center was not a valid coordinate");
      state.center = center;
    })
    .addCase(map.controls.lock, (state) => {
      state.controls.lock = true;
    })
    .addCase(map.controls.unlock, (state) => {
      state.controls.lock = false;
    });
});

export default reducer;