import type { TypedStartListening } from "@reduxjs/toolkit";

import store from "~/store";

export type StoreState = ReturnType<typeof store.getState>;
export type StoreDispatch = typeof store.dispatch;

export type StoreStartListening = TypedStartListening<
  StoreState,
  StoreDispatch
>;
