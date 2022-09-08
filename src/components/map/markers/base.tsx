import React from "react";
import maplibregl from "maplibre-gl";

import { useMapContext } from "~/components/map/provider";
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
  const { instance } = useMapContext();
  const [marker, setMarker] = React.useState<maplibregl.Marker | null>(null);

  React.useEffect(() => {
    if (!marker) {
      const options: maplibregl.MarkerOptions = {
        draggable,
        element: document.createElement("div"),
        anchor: "bottom-right",
      };

      setMarker(new maplibregl.Marker(options));
    }
  }, [instance]);

  React.useEffect(() => {
    if (!!marker && !!instance) {
      marker
        .setLngLat(coordinates)
        .addTo(instance)
        .on("dragstart", onDragStart)
        .on("dragend", onDragEnd);
    }
  }, [marker, instance]);

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
