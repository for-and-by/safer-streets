import type { LngLatLike } from "maplibre-gl";

import React from "react";
import maplibregl from "maplibre-gl";

import { useMapContext } from "~/components/map/provider";

interface Props {
  coordinates: LngLatLike;
  children?: React.ReactNode;
  draggable?: boolean;
}

export default function Marker({
  coordinates,
  children,
  draggable = false,
}: Props) {
  const { instance } = useMapContext();
  const [marker, setMarker] = React.useState<maplibregl.Marker | null>(null);
  const [point, setPoint] = React.useState<LngLatLike>(coordinates);

  React.useEffect(() => {
    if (!marker) {
      setMarker(new maplibregl.Marker());
    }
  }, [instance]);

  React.useEffect(() => {
    if (!!marker && !!instance) {
      marker
        .setLngLat(point)
        .setDraggable(draggable ?? false)
        .addTo(instance);

      if (draggable) {
      }
    }
  }, [marker, instance]);

  return null;
}
