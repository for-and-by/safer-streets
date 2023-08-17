import type { ComponentProps, Dispatch, SetStateAction } from "react";
import React, { createContext, useCallback, useEffect, useState } from "react";

import { Map } from "maplibre-gl";

import { config } from "~/config";
import createContextHook from "~/hooks/factories/create-context-hook";

interface ContextValue {
  map: Map | null;
  ref: (node: HTMLDivElement | null) => void;
  isLocked: boolean;
  setIsLocked: Dispatch<SetStateAction<boolean>>;
}

const initialValue: ContextValue = {
  map: null,
  ref: () => {
    return;
  },
  isLocked: false,
  setIsLocked: () => {},
};

export const MapContext = createContext(initialValue);
export const useMapContext = createContextHook({ MapContext });

type Props = ComponentProps<"div">;

export default function MapProvider({ children }: Props) {
  const { map: _map, isLocked: _isLocked } = initialValue;
  const [map, setMap] = useState(_map);
  const [isLocked, setIsLocked] = useState(_isLocked);

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
          dragRotate: false,
          touchPitch: false,
          touchZoomRotate: false,
        })
      );
    }
    //	eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      map?.remove();
    };
    //	eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value: ContextValue = {
    ref: ref,
    map: map,
    isLocked,
    setIsLocked,
  };

  return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
}
