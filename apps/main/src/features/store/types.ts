import type {
  ListenerMiddlewareInstance,
  TypedStartListening,
} from "@reduxjs/toolkit";

import store from ".";

export type StoreState = ReturnType<typeof store.getState>;
export type StoreDispatch = typeof store.dispatch;

export type StoreListener = ListenerMiddlewareInstance<
  StoreState,
  StoreDispatch
>;

export type StoreStartListening = TypedStartListening<
  StoreState,
  StoreDispatch
>;
