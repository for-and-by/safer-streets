import type { MapContextValue } from "./types";

import React from "react";
import maplibregl from "maplibre-gl";

import config from "~/config";

interface Props extends React.HTMLAttributes<"div"> {
  children?: React.ReactNode;
}

export const MapContext = React.createContext<MapContextValue>({
  instance: null,
  ref: () => {},
});

export default function MapProvider({ children }: Props) {
  const [instance, setInstance] =
    React.useState<MapContextValue["instance"]>(null);

  const ref = React.useCallback<MapContextValue["ref"]>((node) => {
    if (node !== null && instance === null) {
      setInstance(
        new maplibregl.Map({
          container: node,
          style: `${config.map.style}?key=${config.map.key}`,
        })
      );
    }
  }, []);

  React.useEffect(() => {
    return () => {
      instance?.remove();
    };
  }, []);

  const value: MapContextValue = {
    instance,
    ref,
  };

  return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
}
