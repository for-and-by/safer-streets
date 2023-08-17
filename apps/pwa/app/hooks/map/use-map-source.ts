import { useEffect } from "react";

import type { GeoJSONSource, GeoJSONSourceSpecification } from "maplibre-gl";
import type { GeoJSON } from "geojson";

import { useMap } from "~/hooks/map/use-map";
import { useMapEvent } from "./use-map-event";

export function useMapSource({
  id,
  data,
  ...options
}: GeoJSONSourceSpecification & { id: string }) {
  const { map } = useMap();

  useMapEvent("styledata", (event) => {
    const source = event.target.getSource(id);
    if (!source) event.target.addSource(id, { data, ...options });
  });

  useEffect(() => {
    if (!map) return () => {};
    const source = map.getSource(id) as GeoJSONSource;
    if (source) source.setData(data as GeoJSON);
    //	eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
}
