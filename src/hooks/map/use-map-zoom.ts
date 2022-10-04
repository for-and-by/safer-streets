import { useMapStore } from "~/hooks/map/use-map-store";
import config from "~/config";

export default function useMapZoom() {
  const zoom = useMapStore((state) => state.zoom);
  const setZoom = useMapStore((state) => state.setZoom);
  const incrementZoom = useMapStore((state) => state.incrementZoom);

  const actions = {
    setZoom: setZoom,
    zoomIn: () => incrementZoom(config.map.zoom.increment),
    zoomOut: () => incrementZoom(config.map.zoom.increment * -1),
  };

  return [zoom, actions] as [typeof zoom, typeof actions];
}
