import type { StoreStartListening } from "./types";

import { createListenerMiddleware, configureStore } from "@reduxjs/toolkit";

import mapReducer, { addMapListeners } from "~/store/map";
import toastReducer, { addToastListeners } from "~/store/toast";
import viewReducer from "~/store/view";

// Middleware setup

const listener = createListenerMiddleware();
const startListening = listener.startListening as StoreStartListening;

addMapListeners(startListening);
addToastListeners(startListening);

// Store Creator
const store = configureStore({
  reducer: {
    map: mapReducer,
    toast: toastReducer,
    view: viewReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listener.middleware),
});

export default store;
