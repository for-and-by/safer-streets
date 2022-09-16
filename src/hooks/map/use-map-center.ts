import { useMapSelector } from "~/components/map/provider";
import parseLngLat from "~/lib/parse-lng-lat";

export default function useMapCenter() {
  const [center, setCenter] = useMapSelector((value) => value.useCenter);

  return {
    value: parseLngLat(center),
    set: setCenter,
  };
}
