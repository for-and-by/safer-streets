import { useEffect } from "react";
import { Map } from "maplibre-gl";
import type { MapEventGroup } from "~/types/map";

export default function useMapEvents(
  map: Map | null | undefined,
  events: MapEventGroup
) {
  useEffect(() => {
    if (!map) return () => {};
    Object.keys(events).map((key) => {
      map.on(key, events[key]);
    });
    return () => {
      Object.keys(events).map((key) => {
        map.off(key, events[key]);
      });
    };
  }, [map]);
}
