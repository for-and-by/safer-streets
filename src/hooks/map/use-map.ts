import { useMapContext } from "~/components/layout/map/context";

export default function useMap() {
  const { map } = useMapContext();
  return map;
}
