import React from "react";
import { useRevalidator } from "@remix-run/react";

import useMapZoom from "~/hooks/map/use-map-zoom";

export default function Controls() {
  const [, { zoomIn, zoomOut }] = useMapZoom();
  const revalidator = useRevalidator();

  return (
    <div className="pointer-events-auto inline-flex flex-col space-y-2 self-end">
      <button
        className="btn btn-white"
        onClick={() => revalidator.revalidate()}
      >
        <i className="icon icon-map-target btn-icon" />
      </button>
      <button className="btn btn-white" onClick={zoomIn}>
        <i className="icon icon-plus btn-icon" />
      </button>
      <button className="btn btn-white" onClick={zoomOut}>
        <i className="icon icon-minus btn-icon" />
      </button>
    </div>
  );
}
