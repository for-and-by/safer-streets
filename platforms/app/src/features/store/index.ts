import type { StoreStartListening } from "./types";

import { createListenerMiddleware, configureStore } from "@reduxjs/toolkit";

import mapReducer, { addMapListeners } from "~/features/map/store";
import toastReducer, { addToastListeners } from "~/features/toast/store";
import viewReducer from "~/features/views/store";
import searchReducer from "~/features/search/store";

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
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listener.middleware),
});

export default store;
