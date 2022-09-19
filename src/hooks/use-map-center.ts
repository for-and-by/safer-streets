import { useCallback } from "react";
import { useMapContext } from "~/contexts/map";

export default function useMapCenter() {
  const { state, dispatch } = useMapContext();

  const setCenter = useCallback(
    (value: typeof state.center) => {
      dispatch({
        type: "setCenter",
        payload: value,
      });
    },
    [dispatch]
  );

  return {
    value: state.center,
    set: setCenter,
  };
}
