import { ReactNode, useEffect, useState } from "react";

import { Listener, LngLatLike, Marker, MarkerOptions } from "maplibre-gl";
import { createPortal } from "react-dom";

import useMap from "~/hooks/map/use-map";

interface Props extends MarkerOptions {
  coordinates: LngLatLike;
  children?: ReactNode;
  onDragEnd?: Listener;
  onDragStart?: Listener;
}

export default function BaseMarker({
  coordinates,
  children,
  onDragEnd = () => {},
  onDragStart = () => {},
  ...props
}: Props) {
  const [marker, setMarker] = useState<Marker | null>(null);
  const map = useMap();

  useEffect(() => {
    if (!marker) {
      setMarker(
        new Marker({
          element: document.createElement("div"),
          ...props,
        })
      );
    }
  }, [marker]);

  useEffect(() => {
    if (!!marker && !!map) {
      marker
        .setLngLat(coordinates)
        .addTo(map)
        .on("dragstart", onDragStart)
        .on("dragend", onDragEnd);
    }
  }, [marker, map]);

  useEffect(() => {
    if (marker) {
      marker.setLngLat(coordinates);
    }
  }, [marker, coordinates]);

  if (!marker) return null;

  return createPortal(children, marker.getElement());
}
