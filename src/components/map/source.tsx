import useMap from "~/hooks/map/use-map";
import { GeoJSONSourceSpecification } from "maplibre-gl";
import useMapEvents from "~/hooks/map/use-map-events";

type Props = { id: string } & GeoJSONSourceSpecification;

export default function Source({ id, data, ...props }: Props) {
  const map = useMap();

  useMapEvents({
    load: () => {
      if (!map) return;
      const source = map.getSource(id);
      if (!source) {
        map.addSource(id, { data, ...props });
      }
    },
  });

  return null;
}
