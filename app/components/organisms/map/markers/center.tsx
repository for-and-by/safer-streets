import React, { useState } from "react";
import clsx from "clsx";

import useMapCenter from "~/hooks/map/use-map-center";
import BaseMarker from "~/components/organisms/map/markers/base";

export default function CenterMarker() {
  const [dragging, setDragging] = useState(false);

  const [center, setCenter] = useMapCenter();

  if (!center) return null;

  return (
    <BaseMarker
      coordinates={center}
      anchor="bottom-right"
      onDragStart={() => {
        setDragging(true);
      }}
      onDragEnd={(event) => {
        setCenter(event.target.getLngLat());
        setDragging(false);
      }}
      draggable
    >
      <div
        className={clsx(
          "relative flex h-8 w-8 origin-bottom-right rotate-45 items-center justify-center rounded-full rounded-br-none bg-emerald-600 text-white transition-all",
          dragging ? "scale-125" : "scale-110"
        )}
      >
        <i className="icon icon-sm icon-pin-fill -rotate-45" />
      </div>
    </BaseMarker>
  );
}
