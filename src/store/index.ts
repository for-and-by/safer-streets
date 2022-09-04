import type { StoreStartListening } from "~/types/store";
import { createListenerMiddleware, configureStore } from "@reduxjs/toolkit";

import viewReducer from "~/store/view/reducer";
import mapReducer from "~/store/map/reducer";

import addMapListeners from "~/store/map/listeners";

// Middleware setup

const listener = createListenerMiddleware();
const startListening = listener.startListening as StoreStartListening;

addMapListeners(startListening);

// Store Creator
const store = configureStore({
  reducer: {
    map: mapReducer,
    view: viewReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listener.middleware),
});

export default store;
