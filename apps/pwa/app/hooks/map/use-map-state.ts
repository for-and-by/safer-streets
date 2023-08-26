import { useState } from "react";
import type { FlyToOptions, LngLatLike } from "maplibre-gl";

import { useMap } from "~/hooks/map/use-map";
import { useMapEvent } from "~/hooks/map/use-map-event";

import { config } from "~/config";

export function useMapState() {
  const { map } = useMap();
  const [zoom, setZoom] = useState<number>(config.map.zoom.default);
  const [center, setCenter] = useState<LngLatLike>(config.map.center.default);

  useMapEvent("moveend", (event) => {
    setCenter(event.target.getCenter());
  });

  useMapEvent("zoomend", (event) => {
    setZoom(event.target.getZoom());
  });

  const updateState = (options: FlyToOptions) => {
    if (!map) return;
    map.easeTo(options);
  };

  const updateCenter = (value: LngLatLike) => {
    if (!map) return;
    map.easeTo({ center: value });
  };

  const updateZoom = (value: number) => {
    if (!map) return;
    map.easeTo({ zoom: value });
  };

  const incrementZoom = (value: number) => {
    if (!map) return;
    const zoom = map.getZoom();
    map.easeTo({ zoom: zoom + value });
  };

  const state = {
    zoom,
    center,
  };

  const actions = {
    setMapState: updateState,
    setCenter: updateCenter,
    setZoom: updateZoom,
    zoomIn: () => incrementZoom(config.map.zoom.increment),
    zoomOut: () => incrementZoom(config.map.zoom.increment * -1),
  };

  return [state, actions] as [typeof state, typeof actions];
}
