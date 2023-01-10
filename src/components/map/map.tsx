import React, { ComponentProps, useEffect } from "react";
import clsx from "clsx";

import useMap from "~/hooks/map/use-map";
import useMapRef from "~/hooks/map/use-map-ref";
import useMapEvents from "~/hooks/map/use-map-events";

import useMapLock from "~/hooks/map/use-map-lock";
import useMapZoom from "~/hooks/map/use-map-zoom";
import useMapCenter from "~/hooks/map/use-map-center";

type Props = ComponentProps<"div">;

export default function Map(props: Props) {
  const map = useMap();
  const mapRef = useMapRef();

  const [isLocked] = useMapLock();
  const [zoom, { setZoom }] = useMapZoom();
  const [center, setCenter] = useMapCenter();

  useMapEvents(map, {
    dragend: (event) => {
      setCenter(event.target.getCenter());
    },
    zoomend: (event) => {
      setCenter(event.target.getCenter());
      setZoom(event.target.getZoom());
    },
  });

  useEffect(() => {
    map?.flyTo({ zoom, center, speed: 1 });
  }, [zoom, center]);

  return (
    <>
      <div
        className={clsx("absolute inset-0 z-10", isLocked ? "block" : "hidden")}
      />
      <div ref={mapRef} {...props} />
    </>
  );
}
