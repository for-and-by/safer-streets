import React, { useEffect, useState } from "react";

import useAsync from "~/hooks/use-async";
import Toast from "~/components/regions/toast";
import useActiveReport from "~/hooks/reports/use-active-report";
import useView from "~/hooks/view/use-view";
import { VIEWS } from "~/hooks/view/use-view-store";
import BaseMarker from "~/components/organisms/map/markers/base";
import useViewIsActive from "~/hooks/view/use-view-is-active";
import { fetchReportSummary } from "~/lib/supabase";

export default function SummaryMarker() {
  const [show, setShow] = useState(false);

  const [, setView] = useView();

  const [activeReportId, setActiveReportId] = useActiveReport();
  const isReportActive = useViewIsActive(VIEWS.REPORT);

  const { isLoading, data, trigger, reset } = useAsync(async () =>
    activeReportId ? await fetchReportSummary(activeReportId) : null
  );

  const handleLoad = () => {
    trigger();
    setShow(true);
  };

  const handleClose = () => {
    reset();
    setShow(false);
    setActiveReportId(undefined);
  };

  const handleMoreDetails = () => {
    setView(VIEWS.REPORT);
  };

  useEffect(() => {
    if (activeReportId) handleLoad();
    else handleClose();
  }, [activeReportId]);

  useEffect(() => {
    if (isReportActive) setShow(false);
  }, [isReportActive]);

  if (!data || !data.content || !show) return null;

  return (
    <>
      <Toast content="Fetching summary..." show={isLoading} />
      <BaseMarker coordinates={data} anchor="bottom" offset={[0, -4]}>
        <div className="relative shadow-lg before:absolute before:bottom-0 before:left-1/2 before:h-3 before:w-3 before:-translate-x-1/2 before:translate-y-1 before:rotate-45 before:bg-white">
          <div className="flex flex-col overflow-hidden rounded bg-white">
            <button
              className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-black text-white hover:bg-gray-900"
              onClick={handleClose}
            >
              <i className="icon icon-close" />
            </button>
            <div className="h-16 w-48 overflow-hidden rounded-t bg-gray-100">
              {data?.content?.image_url ? (
                <img
                  src={data.content.image_url?.replace(
                    "/users/users",
                    "/users"
                  )}
                  alt={`Report ${data.id} Thumbnail`}
                  className="h-full w-full object-cover"
                />
              ) : null}
            </div>
            <div className="flex flex-col p-2">
              <p className="text-bold">{data.type.title}</p>
              <p className="text-gray-400">{data.content.severity.title}</p>
              <button className="text-brand-600" onClick={handleMoreDetails}>
                <p className="btn-text">See details</p>
              </button>
            </div>
          </div>
        </div>
      </BaseMarker>
    </>
  );
}
