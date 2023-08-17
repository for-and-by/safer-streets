import { useMapContext } from "~/components/organisms/map/context";

export function useMap() {
  const { map, ref } = useMapContext();
  return { map, ref };
}
