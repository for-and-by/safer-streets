import React from "react";
import { LngLatLike } from "maplibre-gl";

export default function useFindSelf() {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [coords, setCoords] = React.useState<LngLatLike | undefined>(undefined);

  function run() {
    setLoading(true);
    if (navigator && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        setLoading(false);
        setCoords([coords.longitude, coords.latitude]);
      });
    }
  }

  return { loading, coords, run };
}
