import type { StoreStartListening } from "~/types/store";
import { createListenerMiddleware, configureStore } from "@reduxjs/toolkit";

import viewReducer from "~/store/view/reducer";
import toastReducer from "~/store/toast/reducer";
import mapReducer from "~/store/map/reducer";
import createReducer from "~/store/create/reducer";

import addMapListeners from "~/store/map/listeners";

// Middleware setup

const listener = createListenerMiddleware();
const startListening = listener.startListening as StoreStartListening;

addMapListeners(startListening);

// Store Creator
const store = configureStore({
  reducer: {
    map: mapReducer,
    toast: toastReducer,
    view: viewReducer,
    create: createReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listener.middleware),
});

export default store;
