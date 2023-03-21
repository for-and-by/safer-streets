import { useEffect } from "react";

import type { GeoJSONSource, GeoJSONSourceSpecification } from "maplibre-gl";
import type { GeoJSON } from "geojson";

import useMap from "~/hooks/map/use-map";
import useMapEvents from "~/hooks/map/use-map-events";

export default function useMapSource({
  id,
  data,
  ...options
}: GeoJSONSourceSpecification & { id: string }) {
  const map = useMap();

  const loadSource = () => {
    if (!map) return;
    const source = map.getSource(id);

    if (source) return;
    else map.addSource(id, { data, ...options });
  };

  useMapEvents(map, {
    styledata: loadSource,
  });

  useEffect(() => {
    if (map) {
      const source = map.getSource(id) as GeoJSONSource;
      const _data = data as GeoJSON;
      if (source) source.setData(_data);
    }
    //	eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
}
