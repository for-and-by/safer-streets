import React from "react";
import maplibregl from "maplibre-gl";

import { useMapSelector } from "~/components/map/provider";
import ReactDOM from "react-dom";
import clsx from "clsx";

interface Props {
  coordinates: maplibregl.LngLatLike;
  children?: React.ReactNode;
  className?: string;
  icon?: string;
  onDragEnd?: maplibregl.Listener;
  onDragStart?: maplibregl.Listener;
  draggable?: boolean;
  anchor?: maplibregl.PositionAnchor;
}

export default function BaseMarker({
  coordinates,
  children,
  className = "",
  icon = "icon-pin-fill",
  draggable = false,
  onDragEnd = () => {},
  onDragStart = () => {},
}: Props) {
  const [marker, setMarker] = React.useState<maplibregl.Marker | null>(null);
  const map = useMapSelector((value) => value.map);

  React.useEffect(() => {
    if (!marker) {
      const options: maplibregl.MarkerOptions = {
        draggable,
        element: document.createElement("div"),
        anchor: "bottom-right",
      };

      setMarker(new maplibregl.Marker(options));
    }
  }, [marker]);

  React.useEffect(() => {
    if (!!marker && !!map) {
      marker
        .setLngLat(coordinates)
        .addTo(map)
        .on("dragstart", onDragStart)
        .on("dragend", onDragEnd);
    }
  }, [marker, map]);

  React.useEffect(() => {
    if (!!marker) {
      marker.setLngLat(coordinates);
    }
  }, [marker, coordinates]);

  if (!marker) return null;
  return ReactDOM.createPortal(
    <>
      <div
        className={clsx(
          "relative flex h-8 w-8 origin-bottom-right rotate-45 items-center justify-center rounded-full rounded-br-none bg-brand-600",
          className
        )}
      >
        <i
          className={clsx(icon, "icon icon-sm -rotate-45 before:text-white")}
        />
      </div>
      {children}
    </>,
    marker.getElement()
  );
}
