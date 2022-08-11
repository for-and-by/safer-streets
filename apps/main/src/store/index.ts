import type { StoreStartListening } from "~/types/store";
import { createListenerMiddleware, configureStore } from "@reduxjs/toolkit";

import viewReducer from "~/store/view/reducer";
import toastReducer from "~/store/toast/reducer";
import mapReducer from "~/store/map/reducer";
import searchReducer from "~/store/search/reducer";
import createReducer from "~/store/create/reducer";

import addToastListeners from "~/store/toast/listeners";
import addMapListeners from "~/store/map/listeners";
import addSearchListeners from "~/store/search/listeners";

// Middleware setup

const listener = createListenerMiddleware();
const startListening = listener.startListening as StoreStartListening;

addMapListeners(startListening);
addToastListeners(startListening);
addSearchListeners(startListening);

// Store Creator
const store = configureStore({
  reducer: {
    map: mapReducer,
    toast: toastReducer,
    view: viewReducer,
    search: searchReducer,
    create: createReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listener.middleware),
});

export default store;
