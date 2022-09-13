import React, {
  HTMLAttributes,
  ReactNode,
  useState,
  useRef,
  useCallback,
  useEffect,
} from "react";

import { LngLatLike, Map } from "maplibre-gl";

import config from "~/config";
import createSmartContext from "~/lib/create-smart-context";

interface ContextValue {
  map?: Map | null;
  ref: (node: HTMLDivElement | null) => void;
  zoom: number;
  setZoom: (value: number) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  center: LngLatLike;
  setCenter: (value: LngLatLike) => void;
}

interface Props extends HTMLAttributes<"div"> {
  children?: ReactNode;
}

const initialValue: ContextValue = {
  map: null,
  ref: () => {},
  zoom: config.map.zoom.default,
  setZoom: () => {},
  zoomIn: () => {},
  zoomOut: () => {},
  center: config.map.center,
  setCenter: () => {},
};

export const MapContext = createSmartContext(initialValue);

export default function MapProvider({ children }: Props) {
  const { zoom: _zoom, center: _center, map: _map } = initialValue;

  const map = useRef<ContextValue["map"]>(_map);
  const [zoom, setZoom] = useState<ContextValue["zoom"]>(_zoom);
  const [center, setCenter] = useState<ContextValue["center"]>(_center);

  const ref = useCallback<ContextValue["ref"]>((node) => {
    if (!!node && !map.current) {
      map.current = new Map({
        container: node,
        style: `${config.map.style}?key=${config.map.key}`,
        center: _center,
        zoom: _zoom,
      });
    }
  }, []);

  useEffect(() => {
    return () => {
      map?.current?.remove();
    };
  }, []);

  const value: ContextValue = {
    ref: ref,
    map: map.current,
    zoom: zoom,
    setZoom: (value) => setZoom(value),
    zoomIn: () => setZoom((state) => state + 0.5),
    zoomOut: () => setZoom((state) => state - 0.5),
    center: center,
    setCenter: (value) => setCenter(value),
  };

  return (
    <MapContext.Provider value={value as any}>{children}</MapContext.Provider>
  );
}
