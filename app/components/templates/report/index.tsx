import React, { useEffect } from "react";
import useViewIsActive from "~/hooks/view/use-view-is-active";
import { VIEWS } from "~/hooks/view/use-view-store";
import Bumper from "~/components/elements/bumper";
import Header from "~/components/regions/header";
import Footer from "~/components/regions/footer";
import useActiveReport from "~/hooks/reports/use-active-report";
import useViewReset from "~/hooks/view/use-view-reset";
import DeleteReportModal from "~/components/templates/report/delete";
import useAsync from "~/hooks/use-async";
import ReportInfo from "~/components/templates/report/info";
import ReportMarker from "~/components/layout/map/markers/report";
import useMapLock from "~/hooks/map/use-map-lock";
import { fetchReportContent } from "~/lib/supabase";

export default function Report() {
  const resetView = useViewReset();
  const isReportActive = useViewIsActive(VIEWS.REPORT);

  const [activeReportId, setActiveReportId] = useActiveReport();
  const [, { setLock, setUnlock }] = useMapLock();

  const { trigger, data } = useAsync(async () => {
    if (activeReportId) return await fetchReportContent(activeReportId);
    else return null;
  });

  useEffect(() => {
    if (activeReportId) {
      trigger();
    }
  }, [activeReportId]);

  useEffect(() => {
    if (!activeReportId) resetView();
  }, [activeReportId]);

  useEffect(() => {
    if (isReportActive) setLock();
    else setUnlock();
  }, [isReportActive]);

  if (!data) return null;

  return (
    <>
      <ReportMarker coordinates={data} />
      <Header>
        <Bumper
          show={isReportActive}
          className="flex flex-row items-center bg-white p-2"
        >
          <button
            className="btn btn-light"
            onClick={() => setActiveReportId(undefined)}
          >
            <i className="btn-icon icon icon-left" />
          </button>
          <div className="flex flex-col px-3">
            <h3 className="font-medium">Report</h3>
          </div>
        </Bumper>
      </Header>
      <Footer>
        <Bumper
          show={isReportActive}
          className="max-h-[50vh] divide-y divide-gray-200 overflow-y-scroll"
        >
          <ReportInfo data={data} />
          <div className="sticky bottom-0 flex justify-between bg-white p-2 shadow-md">
            <button className="btn btn-primary">
              <p className="btn-text">Edit Report</p>
            </button>
            <DeleteReportModal>
              <p className="btn-text">Delete</p>
            </DeleteReportModal>
          </div>
        </Bumper>
      </Footer>
    </>
  );
}
