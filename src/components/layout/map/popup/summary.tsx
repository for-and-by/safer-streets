import React, { useEffect } from "react";

import fetchReportSummary from "~/lib/fetch-report-summary";

import useAsync from "~/hooks/use-async";
import Toast from "~/components/regions/toast";
import useActiveReport from "~/hooks/reports/use-active-report";
import BasePopup from "~/components/layout/map/popup/base";
import ReportDrawer from "~/components/layout/reports/drawer";

export default function SummaryMarker() {
  const [activeReportId, setActiveReportId] = useActiveReport();

  const { isLoading, data, trigger } = useAsync(async () =>
    activeReportId ? await fetchReportSummary(activeReportId) : null
  );

  useEffect(() => {
    if (activeReportId) {
      trigger();
    }
  }, [activeReportId]);

  if (!data || !data.content) return null;

  return (
    <>
      <Toast content="Fetching summary..." show={isLoading} />
      <BasePopup
        coordinates={data}
        anchor="bottom"
        offset={[0, -4]}
        onClose={() => setActiveReportId(undefined)}
      >
        <div className="relative flex flex-col bg-white before:absolute before:bottom-0 before:left-1/2 before:h-3 before:w-3 before:-translate-x-1/2 before:translate-y-1 before:rotate-45 before:bg-white">
          <div className="h-16 w-48 overflow-hidden rounded-t bg-gray-100">
            {data?.content?.image_url ? (
              <img
                src={data.content.image_url?.replace("/users/users", "/users")}
                alt={`Report ${data.id} Thumbnail`}
                className="h-full w-full object-cover"
              />
            ) : null}
          </div>
          <div className="flex flex-col p-2">
            <p className="text-bold">{data.type.title}</p>
            <p className="text-gray-400">{data.content.severity.title}</p>
            <ReportDrawer className="text-brand-600">
              <p className="btn-text">See details</p>
            </ReportDrawer>
          </div>
        </div>
      </BasePopup>
    </>
  );
}
