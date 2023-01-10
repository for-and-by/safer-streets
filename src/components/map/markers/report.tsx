import React from "react";
import { Report, TYPES } from "~/types/db";

import BaseMarker from "~/components/map/markers/base";

interface Props {
  report: Report;
}

export default function ReportMarker({ report }: Props) {
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
        coordinates={report}
        anchor="bottom-right"
        icon={icons[report.type_handle as keyof typeof icons]}
      />
    </>
  );
}
