import React from "react";
import clsx from "clsx";

import useTypedSelector from "~/hooks/use-typed-selector";
import useMapEvents from "~/hooks/use-map-events";
import { useMapContext } from "~/components/map/provider";
import useMapDispatch from "~/hooks/use-map-dispatch";

interface Props extends React.ComponentProps<"div"> {}

export default function Map({ className, ...props }: Props) {
  const map = useMapDispatch();

  const zoom = useTypedSelector((state) => state.map.zoom);
  const center = useTypedSelector((state) => state.map.center);
  const lock = useTypedSelector((state) => state.map.controls.lock);

  const { ref, instance } = useMapContext();

  useMapEvents({
    dragend: (event) => {
      map.center.set(event.target.getCenter());
    },
    zoomend: (event) => {
      map.center.set(event.target.getCenter());
      map.zoom.set(event.target.getZoom());
    },
  });

  // Update map with redux state options
  React.useEffect(() => {
    instance?.flyTo({ zoom, speed: 1 });
  }, [zoom]);

  React.useEffect(() => {
    instance?.flyTo({ center, speed: 1 });
  }, [center]);

  return (
    <div
      ref={ref}
      className={clsx(
        className,
        lock ? "pointer-events-none" : "pointer-events-auto"
      )}
      {...props}
    />
  );
}
