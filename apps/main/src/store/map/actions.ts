import type { LngLatLike } from "maplibre-gl";

import * as Redux from "@reduxjs/toolkit";

const map = {
  zoom: {
    in: Redux.createAction("map/zoom/in"),
    out: Redux.createAction("map/zoom/out"),
    set: Redux.createAction<number>("map/zoom/set"),
  },
  center: {
    set: Redux.createAction<LngLatLike>("map/center/set"),
  },
};

export default map;
