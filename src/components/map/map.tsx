import React from "react";
import clsx from "clsx";

import { GeoJSONSource } from "maplibre-gl";

import useTypedSelector from "~/hooks/use-typed-selector";
import useMapEvents from "~/hooks/use-map-events";
import useMapDispatch from "~/hooks/use-map-dispatch";
import { useMapContext } from "~/components/map/provider";

interface Props extends React.ComponentProps<"div"> {}

export default function Map(props: Props) {
  const map = useMapDispatch();

  const zoom = useTypedSelector((state) => state.map.zoom);
  const center = useTypedSelector((state) => state.map.center);
  const lock = useTypedSelector((state) => state.map.controls.lock);

  const reports = useTypedSelector((state) => state.reports.features);

  const { ref, instance } = useMapContext();

  useMapEvents({
    load: () => {
      if (!!instance)
        instance.addSource("reports", {
          type: "geojson",
          data: reports,
        });
    },
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

  React.useEffect(() => {
    if (!!instance) {
      const source = instance.getSource("reports") as GeoJSONSource;
      if (source) source.setData(reports);
    }
  }, [reports]);

  return (
    <>
      <div
        className={clsx("absolute inset-0 z-10", lock ? "block" : "hidden")}
      />
      <div ref={ref} {...props} />
    </>
  );
}
