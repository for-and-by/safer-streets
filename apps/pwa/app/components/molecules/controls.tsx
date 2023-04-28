import React from "react";

import useMapZoom from "~/hooks/map/use-map-zoom";

export default function Controls() {
  const [, { zoomIn, zoomOut }] = useMapZoom();

  return (
    <div className="pointer-events-auto inline-flex flex-col self-end space-y-2">
      <button className="btn btn-white" onClick={zoomIn}>
        <i className="icon icon-plus btn-icon" />
      </button>
      <button className="btn btn-white" onClick={zoomOut}>
        <i className="icon icon-minus btn-icon" />
      </button>
    </div>
  );
}
