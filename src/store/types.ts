import type {
  ListenerMiddlewareInstance,
  TypedStartListening,
} from "@reduxjs/toolkit";
import type { LngLatLike } from "maplibre-gl";

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

export interface MapState {
  zoom: number;
  center: LngLatLike;
}

export interface ToastState {
  content?: string;
  show: boolean;
}
