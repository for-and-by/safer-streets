import { useMapStore } from "~/hooks/map/use-map-store";

export default function useMapCenter() {
  const center = useMapStore((state) => state.center);
  const setCenter = useMapStore((state) => state.setCenter);

  return [center, setCenter] as [typeof center, typeof setCenter];
}
