import { useMapSelector } from "~/components/map/provider";

export default function useMap() {
  const ref = useMapSelector((value) => value.ref);
  const map = useMapSelector((value) => value.map);

  return { ref, map };
}
