import type { MapEventGroup } from "~/types/map";

import React from "react";
import { useMapContext } from "~/components/map/provider";

export default function useMapEvents(events: MapEventGroup) {
  const { instance } = useMapContext();

  React.useEffect(() => {
    Object.keys(events).map((key) => {
      instance?.on(key, events[key]);
    });

    return () => {
      Object.keys(events).map((key) => {
        instance?.off(key, events[key]);
      });
    };
  }, [instance]);
}
