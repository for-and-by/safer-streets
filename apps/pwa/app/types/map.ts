import type {
  LngLatLike,
  Map,
  MapLayerEventType,
  MapLibreEvent,
  MapEventType,
} from "maplibre-gl";

export interface MapState {
  zoom: number;
  center: LngLatLike;
}

export interface MapContextValue {
  map?: Map | null;
  ref: (node: HTMLDivElement | null) => void;
}

export type MapEventGroup = {
  [key in keyof MapLayerEventType]?: (event: MapLibreEvent) => void;
};

export type MapEvent = keyof MapEventType;
export type MapEventHandler<Event extends MapEvent> = (
  event: MapEventType[Event]
) => void;

export type MapLayerEvent = keyof MapLayerEventType;
export type MapLayerEventHandler<Event extends MapLayerEvent> = (
  event: MapLayerEventType[Event]
) => void;
