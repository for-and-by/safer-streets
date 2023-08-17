import { useMapContext } from "~/components/organisms/map/context";

export function useMapLock() {
  const { isLocked, setIsLocked } = useMapContext();

  const actions = {
    setIsLocked: setIsLocked,
    setLock: () => setIsLocked(true),
    setUnlock: () => setIsLocked(false),
  };

  return [isLocked, actions] as [typeof isLocked, typeof actions];
}
