import { useEffect } from "react";

import type { MapEventHandler, MapEvent } from "~/types/map";

import { useMapContext } from "~/components/organisms/map/context";

export function useMapEvent<Event extends MapEvent>(
  name: Event,
  callback: MapEventHandler<Event>
) {
  const { map } = useMapContext();

  useEffect(() => {
    if (!map) return () => {};
    map.on(name, callback);

    return () => {
      map.off(name, callback);
    };
  }, [map, callback]);
}
