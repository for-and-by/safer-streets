import { GeoJSONSource, GeoJSONSourceSpecification } from "maplibre-gl";

import useMap from "~/hooks/map/use-map";
import useMapEvents from "~/hooks/map/use-map-events";
import { useEffect } from "react";
import { GeoJSON } from "geojson";

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
  }, [data]);
}
