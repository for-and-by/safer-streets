import type { LngLatLike } from "maplibre-gl";

import React from "react";
import maplibregl from "maplibre-gl";

import { useMapContext } from "~/components/map/provider";
import ReactDOM from "react-dom";

interface Props {
  coordinates: LngLatLike;
  children?: React.ReactNode;
  draggable: boolean;
  onDragEnd: maplibregl.Listener;
  onDragStart: maplibregl.Listener;
}

export default function BaseMarker({
  coordinates,
  children,
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
        element: React.Children.toArray(children).find((child) => !!child)
          ? document.createElement("div")
          : undefined,
        anchor: "bottom",
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
  return ReactDOM.createPortal(children, marker.getElement());
}
