import { useEffect } from "react";
import type {
  Map,
  MapEventType,
  MapLayerEventType,
  MapLayerMouseEvent,
  MapLayerTouchEvent,
  MapMouseEvent,
  MapTouchEvent,
} from "maplibre-gl";

type MapEventObject = {
  [key in keyof MapEventType]?: (event: MapMouseEvent | MapTouchEvent) => void;
};

type MapLayerEventObject = {
  [key in keyof MapLayerEventType]?: (
    event: MapLayerMouseEvent | MapLayerTouchEvent
  ) => void;
};

export default function useMapEvents(
  a: Map | null,
  b: string | MapEventObject,
  c?: MapLayerEventObject
): void {
  useEffect(() => {
    const map = a;
    const events = c ?? b;
    const layer = typeof b === "string" ? b : undefined;

    if (!map) return () => {};

    if (layer) {
      const keys = Object.keys(events) as (keyof MapLayerEventType)[];
      const layerEvents = events as {
        [key in keyof MapLayerEventType]: (
          event: MapLayerMouseEvent | MapLayerTouchEvent
        ) => void;
      };

      keys.forEach((key) => {
        if (layerEvents[key]) {
          map.on(key, layer, layerEvents[key]);
        }
      });

      return () => {
        keys.forEach((key) => {
          if (layerEvents[key]) {
            map.off(key, layer, layerEvents[key]);
          }
        });
      };
    } else {
      const keys = Object.keys(events) as (keyof MapEventType)[];
      const mapEvents = events as {
        [key in keyof MapEventType]: (
          event: MapMouseEvent | MapTouchEvent
        ) => void;
      };

      keys.forEach((key) => {
        if (mapEvents[key]) {
          map.on(key, mapEvents[key]);
        }
      });

      return () => {
        keys.forEach((key) => {
          if (mapEvents[key]) {
            map.off(key, mapEvents[key]);
          }
        });
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [a]);
}
