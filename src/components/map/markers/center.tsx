import { useState } from "react";
import { Listener } from "maplibre-gl";
import clsx from "clsx";

import useMapCenter from "~/hooks/use-map-center";

import BaseMarker from "~/components/map/markers/base";

export default function CenterMarker() {
  const center = useMapCenter();

  const [dragging, setDragging] = useState(false);

  const handleDragStart: Listener = () => {
    setDragging(true);
  };

  const handleDragEnd: Listener = (event) => {
    const { lng, lat } = event.target.getLngLat();
    center.set([lng, lat]);
    setDragging(false);
  };

  if (!center?.value) return null;

  return (
    <>
      <BaseMarker
        coordinates={center.value}
        anchor="bottom-right"
        draggable
        className={clsx("transition-all", dragging ? "scale-125" : "scale-110")}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      ></BaseMarker>
    </>
  );
}
