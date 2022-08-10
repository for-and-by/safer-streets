import type { LngLatLike, MapLibreEvent } from "maplibre-gl";

export interface MapState {
  zoom: number;
  center: LngLatLike;
}

export interface MapContextValue {
  instance?: maplibregl.Map | null;
  ref: (node: HTMLDivElement | null) => void;
}

export type MapEventGroup = {
  [key: string]: (event: MapLibreEvent) => void;
};
