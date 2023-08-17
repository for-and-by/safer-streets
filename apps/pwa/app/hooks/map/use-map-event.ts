import { useEffect } from "react";

import type { MapEventHandler, MapEvent } from "~/types/map";

import { useMap } from "~/hooks/map/use-map";

export function useMapEvent<Event extends MapEvent>(
  name: Event,
  callback: MapEventHandler<Event>
) {
  const { map } = useMap();

  useEffect(() => {
    if (!map) return () => {};
    map.on(name, callback);

    return () => {
      map.off(name, callback);
    };
  }, [map, callback]);
}
