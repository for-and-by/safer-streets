import type { LayerSpecification } from "maplibre-gl";

import { useMapEvent } from "~/hooks/map/use-map-event";

export function useMapLayer(options: LayerSpecification) {
  useMapEvent("load", (event) => {
    const layer = event.target.getLayer(options.id);
    if (!layer) event.target.addLayer(options);
  });

  useMapEvent("sourcedata", (event) => {
    const layer = event.target.getLayer(options.id);
    if (!layer) event.target.addLayer(options);
  });
}
