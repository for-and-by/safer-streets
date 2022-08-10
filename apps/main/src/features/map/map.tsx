import React from "react";

import { useTypedDispatch, useTypedSelector } from "~/features/store/hooks";
import { setCenter, setZoom } from "~/features/map/store";
import { useMapContext, useMapEvents } from "./hooks";

interface Props extends React.ComponentProps<"div"> {}

export default function Map(props: Props) {
  const dispatch = useTypedDispatch();
  const zoom = useTypedSelector((state) => state.map.zoom);
  const center = useTypedSelector((state) => state.map.center);

  const { ref, instance } = useMapContext();

  useMapEvents({
    dragend: (event) => {
      const { lng, lat } = event.target.getCenter();
      console.log(lng, lat);
      dispatch(setCenter([lng, lat]));
    },
    zoomend: (event) => {
      const zoom = event.target.getZoom();
      console.log(zoom);
      dispatch(setZoom(zoom));
    },
  });

  // Update map with redux state options
  React.useEffect(() => {
    instance?.flyTo({ zoom, speed: 1 });
  }, [zoom]);

  React.useEffect(() => {
    instance?.flyTo({ center, speed: 1 });
  }, [center]);

  return <div ref={ref} {...props} />;
}
