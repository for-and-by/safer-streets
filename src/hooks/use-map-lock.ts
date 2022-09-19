import { useCallback } from "react";
import { useMapContext } from "~/contexts/map";

export default function useMapLock() {
  const { state, dispatch } = useMapContext();

  const setIsLocked = useCallback(
    (value: typeof state.isLocked) => {
      dispatch({
        type: "setIsLocked",
        payload: value,
      });
    },
    [dispatch]
  );

  return {
    value: state.isLocked,
    set: setIsLocked,
    lock: () => setIsLocked(true),
    unlock: () => setIsLocked(false),
  };
}
