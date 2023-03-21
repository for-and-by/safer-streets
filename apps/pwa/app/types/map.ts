import type { LngLatLike, MapLayerEventType, MapLibreEvent } from "maplibre-gl";
import type maplibregl from "maplibre-gl";

export interface MapState {
  zoom: number;
  center: LngLatLike;
}

export interface MapContextValue {
  map?: maplibregl.Map | null;
  ref: (node: HTMLDivElement | null) => void;
}

export type MapEventGroup = {
  [key in keyof MapLayerEventType]?: (event: MapLibreEvent) => void;
};
