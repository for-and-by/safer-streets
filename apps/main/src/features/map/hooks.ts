import type { MapEventGroup } from "./types";

import React from "react";

import { MapContext } from "./provider";

const ERRORS = {
  NOT_IN_CONTEXT:
    "This hook or component must be used within the Map Provider Component",
};

export function useMapContext() {
  const context = React.useContext(MapContext);

  if (!context) {
    throw new Error(ERRORS.NOT_IN_CONTEXT);
  }

  return context;
}

export function useMapEvents(events: MapEventGroup) {
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
