import { useState } from "react";

import { useMapCenter } from "~/hooks/map/use-map-center";

import BaseMarker from "~/components/molecules/markers/base";

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
        data-dragging={dragging}
        className="
          relative flex h-8 w-8
          origin-bottom-right rotate-45 scale-110
          items-center justify-center
          rounded-full rounded-br-none
          bg-emerald-600 text-white transition-all
          data-dragging:scale-125"
      >
        <i className="icon icon-sm icon-circle -rotate-45" />
      </div>
    </BaseMarker>
  );
}
