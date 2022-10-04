import { useMapStore } from "~/hooks/map/use-map-store";

export default function useMapLock() {
  const isLocked = useMapStore((state) => state.isLocked);
  const setIsLocked = useMapStore((state) => state.setIsLocked);

  const actions = {
    setIsLocked: setIsLocked,
    setLock: () => setIsLocked(true),
    setUnlock: () => setIsLocked(false),
  };

  return [isLocked, actions] as [typeof isLocked, typeof actions];
}
