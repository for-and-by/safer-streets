import useTypedDispatch from "~/hooks/use-typed-dispatch";
import map from "~/store/map/actions";
import { LngLatLike } from "maplibre-gl";

export default function useMapDispatch() {
  const dispatch = useTypedDispatch();

  return {
    zoom: {
      in: () => dispatch(map.zoom.in()),
      out: () => dispatch(map.zoom.out()),
      set: (value: number) => dispatch(map.zoom.set(value)),
    },
    center: {
      set: (value: LngLatLike) => dispatch(map.center.set(value)),
    },
    controls: {
      lock: () => dispatch(map.controls.lock()),
      unlock: () => dispatch(map.controls.unlock()),
    },
  };
}
