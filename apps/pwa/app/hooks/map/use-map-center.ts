import { useState } from "react";
import type { LngLatLike } from "maplibre-gl";

import { config } from "~/config";

import { useMapEvent } from "~/hooks/map/use-map-event";
import { useMap } from "~/hooks/map/use-map";

export function useMapCenter() {
  const { map } = useMap();
  const [center, setCenter] = useState<LngLatLike>(config.map.center.default);

  useMapEvent("moveend", (event) => {
    setCenter(event.target.getCenter());
  });

  const updateCenter = (value: LngLatLike) => {
    if (!map) return;
    map.flyTo({
      center: value,
    });
  };

  return [center, updateCenter] as [typeof center, typeof updateCenter];
}
