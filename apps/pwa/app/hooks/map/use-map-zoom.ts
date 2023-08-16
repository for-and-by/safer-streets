import { useState } from "react";

import { useMapContext } from "~/components/organisms/map/context";

import { config } from "~/config";
import { useMapEvent } from "./use-map-event";

export default function useMapZoom() {
  const { map } = useMapContext();
  const [zoom, setZoom] = useState<number>(config.map.zoom.default);

  useMapEvent("zoomend", (event) => {
    setZoom(event.target.getZoom());
  });

  const updateZoom = (value: number) => {
    if (!map) return;
    map.flyTo({ zoom: value });
  };

  const incrementZoom = (value: number) => {
    if (!map) return;
    const zoom = map.getZoom();
    map.flyTo({ zoom: zoom + value });
  };

  const actions = {
    setZoom: updateZoom,
    zoomIn: () => incrementZoom(config.map.zoom.increment),
    zoomOut: () => incrementZoom(config.map.zoom.increment * -1),
  };

  return [zoom, actions] as [typeof zoom, typeof actions];
}
