import React from "react";

import useMapZoom from "~/hooks/map/use-map-zoom";

export default function Controls() {
  const [, { zoomIn, zoomOut }] = useMapZoom();

  return (
    <div className="pointer-events-auto inline-flex flex-col space-y-2 self-end">
      <button className="btn btn-white" onClick={zoomIn} aria-label="Zoom In">
        <i className="icon icon-plus btn-icon" />
      </button>
      <button className="btn btn-white" onClick={zoomOut} aria-label="Zoom Out">
        <i className="icon icon-minus btn-icon" />
      </button>
    </div>
  );
}
