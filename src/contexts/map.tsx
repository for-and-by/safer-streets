import {
  ComponentProps,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Map } from "maplibre-gl";

import config from "~/config";
import useMapEvents from "~/hooks/use-map-events";
import createContextHook from "~/hooks/create-context-hook";
import useMapZoom from "~/hooks/use-map-zoom";
import useMapCenter from "~/hooks/use-map-center";

interface ContextValue {
  map?: Map | null;
  ref: (node: HTMLDivElement | null) => void;
}

const initialValue: ContextValue = {
  map: null,
  ref: () => {},
};

export const MapContext = createContext(initialValue);
export const useMapContext = createContextHook({ MapContext });

interface Props extends ComponentProps<"div"> {}

export default function MapProvider({ children }: Props) {
  const { map: _map } = initialValue;
  const [map, setMap] = useState(_map);

  const [zoom, { setZoom }] = useMapZoom();
  const [center, setCenter] = useMapCenter();
  //TODO: Replace with zustand state
  // const reports = useTypedSelector((state) => state.reports.features);
  // useMapSource("reports", reports);

  useMapEvents({
    dragend: (event) => {
      setCenter(event.target.getCenter());
    },
    zoomend: (event) => {
      setCenter(event.target.getCenter());
      setZoom(event.target.getZoom());
    },
  });

  const ref = useCallback<ContextValue["ref"]>((node) => {
    if (!!node && !map) {
      setMap(
        new Map({
          container: node,
          style: `${config.map.style}?key=${config.map.key}`,
          center: center,
          zoom: zoom,
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

  useEffect(() => {
    map?.flyTo({ zoom, center, speed: 1 });
  }, [zoom, center]);

  const value: ContextValue = {
    ref: ref,
    map: map,
  };

  return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
}
