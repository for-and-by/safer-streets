import type { LayerSpecification } from "maplibre-gl";

import useMap from "~/hooks/map/use-map";
import useMapEvents from "~/hooks/map/use-map-events";

export default function useMapLayer(options: LayerSpecification) {
  const map = useMap();

  const updateLayer = () => {
    if (!map) return;
    const layer = map.getLayer(options.id);
    if (layer) return;
    map.addLayer(options);
  };

  useMapEvents(map, {
    load: updateLayer,
    data: updateLayer,
    sourcedata: updateLayer,
  });
}
