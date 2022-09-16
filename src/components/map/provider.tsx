import {
  HTMLAttributes,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";

import { createContext, useContextSelector } from "use-context-selector";
import { LngLatLike, Map } from "maplibre-gl";

import { UseStateHook } from "~/types/common";

import config from "~/config";

export interface ContextValue {
  map?: Map | null;
  ref: (node: HTMLDivElement | null) => void;
  useZoom: UseStateHook<number>;
  useCenter: UseStateHook<LngLatLike>;
  useIsLocked: UseStateHook<boolean>;
}

interface Props extends HTMLAttributes<"div"> {
  children?: ReactNode;
}

const initialValue: ContextValue = {
  map: null,
  ref: () => {},
  useZoom: [config.map.zoom.default, () => {}],
  useCenter: [config.map.center, () => {}],
  useIsLocked: [false, () => {}],
};

export const MapContext = createContext(initialValue);

export function useMapSelector<S>(selector: (value: ContextValue) => S) {
  return useContextSelector<ContextValue, S>(MapContext, selector);
}

export default function MapProvider({ children }: Props) {
  const {
    map: _map,
    useZoom: _useZoom,
    useCenter: _useCenter,
    useIsLocked: _useIsLocked,
  } = initialValue;

  const [map, setMap] = useState<ContextValue["map"]>(_map);

  const useZoom = useState<ContextValue["useZoom"][0]>(_useZoom[0]);
  const useCenter = useState<ContextValue["useCenter"][0]>(_useCenter[0]);
  const useIsLocked = useState<ContextValue["useIsLocked"][0]>(_useIsLocked[0]);

  const ref = useCallback<ContextValue["ref"]>((node) => {
    if (!!node && !map) {
      setMap(
        new Map({
          container: node,
          style: `${config.map.style}?key=${config.map.key}`,
          center: _useCenter[0],
          zoom: _useZoom[0],
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
    useZoom,
    useCenter,
    useIsLocked,
  };

  return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
}
