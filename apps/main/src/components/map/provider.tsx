import type { MapContextValue } from "~/types/map";

import React from "react";
import maplibregl from "maplibre-gl";

import createContextHook from "~/lib/create-context-hook";

import config from "~/config";

interface Props extends React.HTMLAttributes<"div"> {
  children?: React.ReactNode;
}

export const MapContext = React.createContext<MapContextValue>({
  instance: null,
  ref: () => {},
});

export const useMapContext = createContextHook<MapContextValue>({ MapContext });

export default function MapProvider({ children }: Props) {
  const [instance, setInstance] =
    React.useState<MapContextValue["instance"]>(null);

  const ref = React.useCallback<MapContextValue["ref"]>((node) => {
    if (!!node && !instance) {
      setInstance(
        new maplibregl.Map({
          container: node,
          style: `${config.map.style}?key=${config.map.key}`,
          center: config.map.center,
          zoom: config.map.zoom.default,
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
