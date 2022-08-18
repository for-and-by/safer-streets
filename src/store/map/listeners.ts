import type { StoreStartListening } from "~/types/store";
import * as Redux from "@reduxjs/toolkit";

import map from "~/store/map/actions";
import config from "~/config";

export default function addMapListeners(startListening: StoreStartListening) {
  startListening({
    matcher: Redux.isAnyOf(map.zoom.in, map.zoom.out),
    effect(_, { getState, dispatch }) {
      const state = getState();
      dispatch(
        map.zoom.set(
          state.map.zoom > config.map.zoom.max
            ? config.map.zoom.max
            : state.map.zoom < config.map.zoom.min
            ? config.map.zoom.min
            : state.map.zoom
        )
      );
    },
  });
}
