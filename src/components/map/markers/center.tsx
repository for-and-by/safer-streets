import React, { useState } from "react";
import { Listener } from "maplibre-gl";
import clsx from "clsx";

import useMapCenter from "~/hooks/map/use-map-center";
import BaseMarker from "~/components/map/markers/base";
import useViewIsActive from "~/hooks/view/use-view-is-active";
import { VIEWS } from "~/hooks/view/use-view-store";

export default function CenterMarker() {
  const [center, setCenter] = useMapCenter();
  const isCreateActive = useViewIsActive(VIEWS.CREATE);

  const [dragging, setDragging] = useState(false);

  const handleDragStart: Listener = () => {
    setDragging(true);
  };

  const handleDragEnd: Listener = (event) => {
    setCenter(event.target.getLngLat());
    setDragging(false);
  };

  if (!center || !isCreateActive) return null;

  return (
    <>
      <BaseMarker
        coordinates={center}
        anchor="bottom-right"
        draggable
        className={clsx(
          "bg-emerald-600 text-white transition-all",
          dragging ? "scale-125" : "scale-110"
        )}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      />
    </>
  );
}
