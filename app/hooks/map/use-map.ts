import { useMapContext } from "~/components/organisms/map/context";

export default function useMap() {
  const { map } = useMapContext();
  return map;
}
