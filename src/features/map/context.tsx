import React, { useEffect } from "react";
import Leaflet from "leaflet";

interface Props extends React.HTMLAttributes<"div"> {
  children?: React.ReactNode;
}

const MapContext = React.createContext<Leaflet.Map | null>(null);

export const useMapContext = () => React.useContext(MapContext);

export default function Map({ children, className }: Props) {
  const [instance, setInstance] = React.useState<Leaflet.Map | null>(null);

  const ref = React.useCallback((node: HTMLDivElement | null) => {
    if (node !== null && instance === null) {
      const map = Leaflet.map(node);
      map.setView([-27.4705, 153.026], 13);
      setInstance(map);
    }
  }, []);

  useEffect(() => {
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
