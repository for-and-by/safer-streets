import { SourceSpecification } from "maplibre-gl";

import useMap from "~/hooks/map/use-map";
import useMapEvents from "~/hooks/map/use-map-events";

export default function useMapSource({
  id,
  ...options
}: SourceSpecification & { id: string }) {
  const map = useMap();

  const updateSource = () => {
    if (!map) return;
    const source = map.getSource(id);

    if (source) return;
    map.addSource(id, options);
  };

  useMapEvents(map, {
    load: updateSource,
    data: updateSource,
  });
}
