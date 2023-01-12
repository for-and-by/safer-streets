import React from "react";
import useMapZoom from "~/hooks/map/use-map-zoom";
import useReportSync from "~/hooks/reports/use-report-sync";

export default function Controls() {
  const [, { zoomIn, zoomOut }] = useMapZoom();
  const { syncReports } = useReportSync();

  return (
    <div className="pointer-events-auto inline-flex flex-col space-y-2 self-end">
      <button className="btn btn-white" onClick={() => syncReports().finally()}>
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
