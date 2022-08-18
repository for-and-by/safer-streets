import React from "react";
import maplibregl from "maplibre-gl";

import map from "~/store/map/actions";

import useTypedSelector from "~/hooks/use-typed-selector";
import useTypedDispatch from "~/hooks/use-typed-dispatch";

import BaseMarker from "~/components/map/markers/base";

export default function CenterMarker() {
  const dispatch = useTypedDispatch();
  const center = useTypedSelector((state) => state.map.center);

  const [dragging, setDragging] = React.useState(false);

  const handleDragStart: maplibregl.Listener = () => {
    setDragging(true);
  };

  const handleDragEnd: maplibregl.Listener = (event) => {
    const { lng, lat } = event.target.getLngLat();
    dispatch(map.center.set([lng, lat]));
    setDragging(false);
  };

  return (
    <BaseMarker
      coordinates={center}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div>{dragging ? "Dragging" : "Dropped"}</div>
    </BaseMarker>
  );
}
