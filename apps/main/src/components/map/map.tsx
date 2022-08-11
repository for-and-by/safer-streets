import React from "react";

import map from "~/store/map/actions";

import useTypedDispatch from "~/hooks/use-typed-dispatch";
import useTypedSelector from "~/hooks/use-typed-selector";
import useMapEvents from "~/hooks/use-map-events";

import { useMapContext } from "~/components/map/provider";

interface Props extends React.ComponentProps<"div"> {}

export default function Map(props: Props) {
  const dispatch = useTypedDispatch();
  const zoom = useTypedSelector((state) => state.map.zoom);
  const center = useTypedSelector((state) => state.map.center);

  const { ref, instance } = useMapContext();

  useMapEvents({
    dragend: (event) => {
      const { lng, lat } = event.target.getCenter();
      dispatch(map.center.set([lng, lat]));
    },
    zoomend: (event) => {
      const zoom = event.target.getZoom();
      dispatch(map.zoom.set(zoom));
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
