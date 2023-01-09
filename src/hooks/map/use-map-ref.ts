import { useMapContext } from "~/components/layout/map/context";

export default function useMapRef() {
  const { ref } = useMapContext();
  return ref;
}
