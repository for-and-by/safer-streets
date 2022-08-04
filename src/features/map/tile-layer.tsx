import React from "react";
import Leaflet from "leaflet";

import { useMapContext } from "./context";

interface Props {
  attribution: string;
  url: string;
}

export default function TileLayer({ attribution, url }: Props) {
  const instance = useMapContext();

  React.useEffect(() => {
    if (instance) {
      Leaflet.tileLayer(url, {
        attribution,
      }).addTo(instance);
    }
  });
  return null;
}
