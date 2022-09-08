import type { StoreStartListening } from "~/types/store";
import { createListenerMiddleware, configureStore } from "@reduxjs/toolkit";

import viewReducer from "~/store/view/reducer";
import mapReducer from "~/store/map/reducer";
import reportsReducer from "~/store/reports/reducer";

import addMapListeners from "~/store/map/listeners";

import map from "~/store/map/actions";

// Middleware setup

const listener = createListenerMiddleware();
const startListening = listener.startListening as StoreStartListening;

addMapListeners(startListening);

// Store Creator
const store = configureStore({
  reducer: {
    map: mapReducer,
    view: viewReducer,
    reports: reportsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [map.center.set.type],
      },
    }).prepend(listener.middleware),
});

export default store;
