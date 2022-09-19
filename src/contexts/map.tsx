import React, { ComponentProps } from "react";
import { LngLatLike, Map } from "maplibre-gl";

import config from "~/config";
import useMapEvents from "~/hooks/use-map-events";
import useMapSource from "~/hooks/use-map-source";
import useTypedSelector from "~/hooks/use-typed-selector";
import createContextHook from "~/hooks/create-context-hook";

interface ContextValue {
  map?: Map | null;
  ref: (node: HTMLDivElement | null) => void;
  state: {
    zoom: number;
    center: LngLatLike;
    isLocked: boolean;
  };
  dispatch: React.Dispatch<Action>;
}

type Action =
  | { type: "setZoom"; payload: number }
  | { type: "setCenter"; payload: LngLatLike }
  | { type: "setIsLocked"; payload: boolean };

const initialValue: ContextValue = {
  map: null,
  ref: () => {},
  state: {
    zoom: config.map.zoom.default,
    center: config.map.center,
    isLocked: false,
  },
  dispatch: () => {},
};

export const MapContext = React.createContext(initialValue);
export const useMapContext = createContextHook({ MapContext });

function reducer(state: ContextValue["state"], action: Action) {
  switch (action.type) {
    case "setZoom":
      return Object.assign(state, { zoom: action.payload });
    case "setCenter":
      return Object.assign(state, { center: action.payload });
    case "setIsLocked":
      return Object.assign(state, { isLocked: action.payload });
    default:
      return state;
  }
}

interface Props extends ComponentProps<"div"> {}

export default function MapProvider({ children }: Props) {
  const { map: _map, state: _state } = initialValue;
  const [map, setMap] = React.useState<ContextValue["map"]>(_map);
  const [state, dispatch] = React.useReducer(reducer, _state);

  const ref = React.useCallback<ContextValue["ref"]>((node) => {
    if (!!node && !map) {
      setMap(
        new Map({
          container: node,
          style: `${config.map.style}?key=${config.map.key}`,
          center: state.center,
          zoom: state.zoom,
          minZoom: config.map.zoom.min,
          maxZoom: config.map.zoom.max,
        })
      );
    }
  }, []);

  const reports = useTypedSelector((state) => state.reports.features);
  useMapSource("reports", reports);

  useMapEvents({
    dragend: (event) => {
      dispatch({
        type: "setCenter",
        payload: event.target.getCenter(),
      });
    },
    zoomend: (event) => {
      dispatch({
        type: "setCenter",
        payload: event.target.getCenter(),
      });
      dispatch({
        type: "setZoom",
        payload: event.target.getZoom(),
      });
    },
  });

  React.useEffect(() => {
    return () => {
      map?.remove();
    };
  }, []);

  React.useEffect(() => {
    map?.flyTo({ zoom: state.zoom, center: state.center, speed: 1 });
  }, [state.zoom, state.center]);

  const value: ContextValue = {
    ref: ref,
    map: map,
    state: state,
    dispatch: dispatch,
  };

  return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
}
