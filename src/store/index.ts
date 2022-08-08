import type { StoreStartListening } from "./types";

import {
  createListenerMiddleware,
  configureStore,
  createSerializableStateInvariantMiddleware,
  isPlain,
} from "@reduxjs/toolkit";

import { Set } from "immutable";

import mapReducer, { addMapListeners } from "~/store/map";
import toastReducer, { addToastListeners } from "~/store/toast";
import viewReducer from "~/store/view";

// Middleware setup

const listener = createListenerMiddleware();
const startListening = listener.startListening as StoreStartListening;

addMapListeners(startListening);
addToastListeners(startListening);

const serializable = createSerializableStateInvariantMiddleware({
  isSerializable(value) {
    return Set.isSet(value) || isPlain(value);
  },
});

// Store Creator
const store = configureStore({
  reducer: {
    map: mapReducer,
    toast: toastReducer,
    view: viewReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listener.middleware).prepend(serializable),
});

export default store;
