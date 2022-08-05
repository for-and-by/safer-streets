import React from "react";
import maplibregl from "maplibre-gl";

import config from "~/config";

interface Props extends React.HTMLAttributes<"div"> {
  children?: React.ReactNode;
}

interface MapContext {
  instance?: maplibregl.Map | null;
  ref: (node: HTMLDivElement | null) => void;
}

const MapContext = React.createContext<MapContext>({
  instance: null,
  ref: () => {},
});

export const useMapContext = () => React.useContext(MapContext);

export default function MapProvider({ children }: Props) {
  const [instance, setInstance] = React.useState<MapContext["instance"]>(null);

  const ref = React.useCallback<MapContext["ref"]>((node) => {
    if (node !== null && instance === null) {
      const map = new maplibregl.Map({
        container: node,
        style: `${config.map.style}?key=${config.map.key}`,
        center: config.map.default.center,
        zoom: config.map.default.zoom,
      });

      setInstance(map);
    }
  }, []);

  React.useEffect(() => {
    return () => {
      instance?.remove();
    };
  }, []);

  const value: MapContext = {
    instance,
    ref,
  };

  return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
}
