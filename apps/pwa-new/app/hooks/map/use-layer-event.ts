import { useEffect } from "react";

import type { MapLayerEvent, MapLayerEventHandler } from "~/types/map";

import { useMap } from "~/hooks/map/use-map";

export function useLayerEvent<Event extends MapLayerEvent>(
  name: Event,
  layer: string,
  callback: MapLayerEventHandler<Event>
) {
  const { map } = useMap();

  useEffect(() => {
    if (!map) return () => {};
    map.on(name, layer, callback);
    return () => {
      map.off(name, layer, callback);
    };
  }, [map, callback]);
}
