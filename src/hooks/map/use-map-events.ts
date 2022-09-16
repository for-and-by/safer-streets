import type { MapEventGroup } from "~/types/map";

import React from "react";
import { useMapSelector } from "~/components/map/provider";

export default function useMapEvents(events: MapEventGroup) {
  const map = useMapSelector((state) => state.map);

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
