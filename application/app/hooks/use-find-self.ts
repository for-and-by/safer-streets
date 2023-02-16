import { useState } from "react";
import type { LngLatLike } from "maplibre-gl";

export default function useFindSelf() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [coords, setCoords] = useState<LngLatLike | undefined>(undefined);

  function run() {
    setIsLoading(true);
    if (navigator && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        setIsLoading(false);
        setCoords([coords.longitude, coords.latitude]);
      });
    }
  }

  return { isLoading, coords, run };
}
