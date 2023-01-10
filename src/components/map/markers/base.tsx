import React, { ReactNode, useEffect, useState } from "react";

import {
  Listener,
  LngLatLike,
  Marker,
  MarkerOptions,
  PositionAnchor,
} from "maplibre-gl";
import { createPortal } from "react-dom";
import clsx from "clsx";

import useMap from "~/hooks/map/use-map";

interface Props {
  coordinates: LngLatLike;
  children?: ReactNode;
  className?: string;
  icon?: string;
  text?: string;
  onDragEnd?: Listener;
  onDragStart?: Listener;
  draggable?: boolean;
  anchor?: PositionAnchor;
}

export default function BaseMarker({
  coordinates,
  children,
  className = "",
  icon = "icon-pin-fill",
  text,
  draggable = false,
  onDragEnd = () => {},
  onDragStart = () => {},
}: Props) {
  const [marker, setMarker] = useState<Marker | null>(null);
  const map = useMap();

  useEffect(() => {
    if (!marker) {
      const options: MarkerOptions = {
        draggable,
        element: document.createElement("div"),
        anchor: "bottom-right",
      };

      setMarker(new Marker(options));
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

  return createPortal(
    <>
      <div
        className={clsx(
          "relative flex h-8 w-8 origin-bottom-right rotate-45 items-center justify-center rounded-full rounded-br-none",
          className
        )}
      >
        {text ? (
          <p className="-rotate-45">{text}</p>
        ) : (
          <i className={clsx(icon, "icon icon-sm -rotate-45")} />
        )}
      </div>
      {children}
    </>,
    marker.getElement()
  );
}
