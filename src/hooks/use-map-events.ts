import type { MapEventGroup } from "~/types/map";

import React from "react";
import { useMapContext } from "~/contexts/map";

export default function useMapEvents(events: MapEventGroup) {
  const { map } = useMapContext();

  React.useEffect(() => {
    Object.keys(events).map((key) => {
      map?.on(key, events[key]);
    });

    return () => {
      Object.keys(events).map((key) => {
        map?.off(key, events[key]);
      });
    };
  }, [map]);
}
