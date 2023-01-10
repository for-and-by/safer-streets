import useMap from "~/hooks/map/use-map";
import { LayerSpecification } from "maplibre-gl";
import useMapEvents from "~/hooks/map/use-map-events";

type Props = LayerSpecification;

export default function Layer({ id, ...props }: Props) {
  const map = useMap();

  useMapEvents({
    load: () => {
      if (!map) return;
      const layer = map.getLayer(id);
      if (!layer) {
        map.addLayer({ id, ...props });
      }
    },
  });

  return null;
}
