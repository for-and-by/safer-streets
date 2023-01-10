import React, {
  ComponentProps,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";

import { Map } from "maplibre-gl";

import config from "~/config";
import createContextHook from "~/hooks/factories/create-context-hook";

interface ContextValue {
  map: Map | null;
  ref: (node: HTMLDivElement | null) => void;
}

const initialValue: ContextValue = {
  map: null,
  ref: () => {
    return;
  },
};

export const MapContext = createContext(initialValue);
export const useMapContext = createContextHook({ MapContext });

type Props = ComponentProps<"div">;

export default function MapProvider({ children }: Props) {
  const { map: _map } = initialValue;
  const [map, setMap] = useState(_map);

  const ref = useCallback<ContextValue["ref"]>((node) => {
    if (!!node && !map) {
      setMap(
        new Map({
          container: node,
          style: `${config.map.style}?key=${config.map.key}`,
          center: config.map.center.default,
          zoom: config.map.zoom.default,
          minZoom: config.map.zoom.min,
          maxZoom: config.map.zoom.max,
        })
      );
    }
  }, []);

  useEffect(() => {
    return () => {
      map?.remove();
    };
  }, []);

  const value: ContextValue = {
    ref: ref,
    map: map,
  };

  return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
}
