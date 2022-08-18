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
  controls: {
    center: {
      show: Redux.createAction("map/controls/center/show"),
      hide: Redux.createAction("map/controls/center/hides"),
    },
  },
};

export default map;
