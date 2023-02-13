import React from "react";
import BaseMarker from "~/components/organisms/map/markers/base";
import useViewIsActive from "~/hooks/view/use-view-is-active";
import { VIEWS } from "~/hooks/view/use-view-store";
import type { LngLatLike } from "maplibre-gl";

interface Props {
  coordinates: LngLatLike;
}

export default function ReportMarker({ coordinates }: Props) {
  const isReportActive = useViewIsActive(VIEWS.REPORT);

  if (!coordinates || !isReportActive) return null;

  return (
    <BaseMarker
      coordinates={coordinates}
      anchor="bottom-right"
      offset={[0, -16]}
    >
      <div className="relative flex h-8 w-8 origin-bottom-right rotate-45 items-center justify-center rounded-full rounded-br-none bg-emerald-900 text-white transition-all">
        <i className="icon icon-sm icon-pin-fill -rotate-45" />
      </div>
    </BaseMarker>
  );
}
