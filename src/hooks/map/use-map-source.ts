import React from "react";

import { FeatureCollection } from "geojson";
import { GeoJSONSource } from "maplibre-gl";

import useMapEvents from "~/hooks/map/use-map-events";
import { useMapContext } from "~/contexts/map";

export default function useMapSource(id: string, data: FeatureCollection) {
  const { map } = useMapContext();

  useMapEvents({
    load: () => {
      if (!!map)
        map.addSource(id, {
          type: "geojson",
          data: data,
        });
    },
  });

  React.useEffect(() => {
    if (!!map) {
      const source = map.getSource(id) as GeoJSONSource;
      if (source) source.setData(data);
    }
  }, [data]);
}
