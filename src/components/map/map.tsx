import { ComponentProps, useEffect } from "react";
import clsx from "clsx";

import { GeoJSONSource } from "maplibre-gl";

import useTypedSelector from "~/hooks/use-typed-selector";

import useMap from "~/hooks/map/use-map";
import useMapCenter from "~/hooks/map/use-map-center";
import useMapEvents from "~/hooks/map/use-map-events";
import useMapLock from "~/hooks/map/use-map-lock";
import useMapZoom from "~/hooks/map/use-map-zoom";

export default function Map(props: ComponentProps<"div">) {
  const { ref, map } = useMap();
  const zoom = useMapZoom();
  const center = useMapCenter();
  const isLocked = useMapLock();

  const reports = useTypedSelector((state) => state.reports.features);

  useMapEvents({
    load: () => {
      if (!!map)
        map.addSource("reports", {
          type: "geojson",
          data: reports,
        });
    },
    dragend: (event) => {
      center.set(event.target.getCenter());
    },
    zoomend: (event) => {
      center.set(event.target.getCenter());
      zoom.set(event.target.getZoom());
    },
  });

  // Update map with redux state options
  useEffect(() => {
    map?.flyTo({ zoom: zoom.value, speed: 1 });
  }, [zoom.value]);

  useEffect(() => {
    map?.flyTo({ center: center.value, speed: 1 });
  }, [center.value]);

  useEffect(() => {
    if (!!map) {
      const source = map.getSource("reports") as GeoJSONSource;
      if (source) source.setData(reports);
    }
  }, [reports]);

  return (
    <>
      <div
        className={clsx(
          "absolute inset-0 z-10",
          isLocked.value ? "block" : "hidden"
        )}
      />
      <div ref={ref} {...props} />
    </>
  );
}
