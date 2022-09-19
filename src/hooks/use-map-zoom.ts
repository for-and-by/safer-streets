import { useCallback } from "react";
import { useMapContext } from "~/contexts/map";

export default function useMapZoom() {
  const { state, dispatch } = useMapContext();

  const setZoom = useCallback(
    (value: typeof state.zoom) => {
      dispatch({
        type: "setZoom",
        payload: value,
      });
    },
    [dispatch]
  );

  return {
    value: state.zoom,
    set: setZoom,
    in: () => setZoom(state.zoom + 0.5),
    out: () => setZoom(state.zoom - 0.5),
  };
}
