import BaseMarker from "~/components/map/markers/base";
import React from "react";
import { LngLatLike } from "maplibre-gl";

interface Props {
  coordinates: LngLatLike;
  count: number;
}

export default function ClusterMarker({ coordinates, count }: Props) {
  return (
    <BaseMarker
      coordinates={coordinates}
      anchor="bottom-right"
      className="bg-sky-700 text-white"
      text={count?.toString()}
    />
  );
}
