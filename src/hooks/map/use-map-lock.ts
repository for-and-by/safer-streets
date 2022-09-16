import { useMapSelector } from "~/components/map/provider";

export default function useMapLock() {
  const [isLocked, setIsLocked] = useMapSelector((value) => value.useIsLocked);

  return {
    value: isLocked,
    unlock: () => setIsLocked(false),
    lock: () => setIsLocked(true),
  };
}
