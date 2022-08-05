import React from "react";
import maplibregl from "maplibre-gl";

import config from "~/config";

interface Props extends React.HTMLAttributes<"div"> {
  children?: React.ReactNode;
}

type MapInstance = maplibregl.Map | null;

const MapContext = React.createContext<MapInstance>(null);

export const useMapContext = () => React.useContext(MapContext);

export default function Map({ children, className }: Props) {
  const [instance, setInstance] = React.useState<MapInstance>(null);

  const ref = React.useCallback((node: HTMLDivElement | null) => {
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

  return (
    <MapContext.Provider value={instance}>
      <div className={className} ref={ref}>
        {children}
      </div>
    </MapContext.Provider>
  );
}
