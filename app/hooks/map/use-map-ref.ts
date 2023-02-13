import { useMapContext } from "~/components/organisms/map/context";

export default function useMapRef() {
  const { ref } = useMapContext();
  return ref;
}
