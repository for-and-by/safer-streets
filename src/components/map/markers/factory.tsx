import React, { useState } from "react";
import { MapGeoJSONFeature } from "maplibre-gl";

import useMapEvents from "~/hooks/map/use-map-events";
import useMap from "~/hooks/map/use-map";

interface Props {
  source: string;
  render: (feature: MapGeoJSONFeature) => JSX.Element;
  filter: (feature: MapGeoJSONFeature) => boolean;
}

export default function MarkerFactory({ source, render, filter }: Props) {
  const map = useMap();

  const [markers, setMarkers] = useState<MapGeoJSONFeature[]>(
    [] as MapGeoJSONFeature[]
  );

  const updateMarkers = () => {
    if (map) {
      setMarkers(map?.querySourceFeatures(source)?.filter(filter) ?? []);
    }
  };

  useMapEvents(map, {
    data: updateMarkers,
    moveend: updateMarkers,
  });

  if (!markers || markers.length === 0) return null;

  console.log(markers.map((marker) => marker.geometry));

  return <>{markers.map((marker) => render(marker))}</>;
}
