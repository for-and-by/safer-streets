import React from "react";
import { Report, TYPES } from "~/types/db";

import BaseMarker from "~/components/map/markers/base";
import { LngLatLike } from "maplibre-gl";

interface Props {
  coordinates: LngLatLike;
  report: Report;
}

export default function ReportMarker({ report, coordinates }: Props) {
  const icons = {
    [TYPES.BUSHFIRE]: "icon-fire",
    [TYPES.FLOOD]: "icon-flood",
    [TYPES.CYCLIST]: "icon-cyclist",
    [TYPES.MOTORIST]: "icon-motorist",
    [TYPES.PEDESTRIAN]: "icon-pedestrian",
    [TYPES.WILDLIFE]: "icon-wildlife",
  };

  return (
    <>
      <BaseMarker
        coordinates={coordinates}
        anchor="bottom-right"
        className="bg-emerald-600 text-white"
        icon={icons[report.type_handle as keyof typeof icons]}
      />
    </>
  );
}
