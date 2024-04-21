import { useState } from "react";

import { useMap } from "~/hooks/map/use-map";
import { useMapEvent } from "~/hooks/map/use-map-event";

import { config } from "~/config";

export function useMapZoom() {
  const { map } = useMap();
  const [zoom, setZoom] = useState<number>(config.map.zoom.default);

  useMapEvent("zoomend", (event) => {
    setZoom(event.target.getZoom());
  });

  const updateZoom = (value: number) => {
    if (!map) return;
    console.log("updating zoom", value);
    map.easeTo({ zoom: value });
  };

  const incrementZoom = (value: number) => {
    if (!map) return;
    const zoom = map.getZoom();
    map.easeTo({ zoom: zoom + value });
  };

  const actions = {
    setZoom: updateZoom,
    zoomIn: () => incrementZoom(config.map.zoom.increment),
    zoomOut: () => incrementZoom(config.map.zoom.increment * -1),
  };

  return [zoom, actions] as [typeof zoom, typeof actions];
}
