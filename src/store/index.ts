import type { StoreDispatch, StoreStartListening, StoreState } from "./types";
import type { TypedStartListening } from "@reduxjs/toolkit";

import { createListenerMiddleware, configureStore } from "@reduxjs/toolkit";

import mapReducer, { addMapListeners } from "./map";

// Middleware setup

const listener = createListenerMiddleware();
const startListening = listener.startListening as StoreStartListening;

addMapListeners(startListening);

// Store Creator
const store = configureStore({
  reducer: {
    map: mapReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listener.middleware),
});

export default store;
