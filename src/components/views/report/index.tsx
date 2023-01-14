import React, { useEffect, useState } from "react";
import useViewIsActive from "~/hooks/view/use-view-is-active";
import { VIEWS } from "~/hooks/view/use-view-store";
import Bumper from "~/components/elements/bumper";
import Header from "~/components/regions/header";
import Footer from "~/components/regions/footer";
import useActiveReport from "~/hooks/reports/use-active-report";
import useViewReset from "~/hooks/view/use-view-reset";
import clsx from "clsx";
import DeleteReportModal from "~/components/views/report/delete";
import useAsync from "~/hooks/use-async";
import fetchReportContent from "~/lib/fetch-report-content";

export default function Report() {
  const resetView = useViewReset();
  const isReportActive = useViewIsActive(VIEWS.REPORT);

  const [activeReportId, setActiveReportId] = useActiveReport();
  const [fullImage, setFullImage] = useState(false);
  const [content, setContent] = useState<{ [key: string]: string | undefined }>(
    {}
  );

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
    if (data) {
      setContent({
        Severity: data.content.severity.title,
        Details: data.content.details,
        ...data.content.data,
        "Created On": data.created_at
          ? new Date(data.created_at).toLocaleDateString()
          : undefined,
        "Last Updated": data.updated_at
          ? new Date(data.updated_at).toLocaleDateString()
          : undefined,
      });
    }
  }, [data]);

  useEffect(() => {
    if (!activeReportId) resetView();
  }, [activeReportId]);

  if (!data) return null;

  return (
    <>
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
          {data.content.image_url ? (
            <div
              className={clsx(
                "relative overflow-hidden transition-all",
                !fullImage ? "h-36" : "h-96"
              )}
            >
              <button
                className="btn btn-white absolute bottom-2 right-2 z-20"
                onClick={() => setFullImage((state) => !state)}
              >
                <i
                  className={clsx(
                    "btn-icon icon",
                    !fullImage ? "icon-plus" : "icon-minus"
                  )}
                />
              </button>
              <img
                src={data.content.image_url?.replace("/users/users", "/users")}
                alt={`Report ${data.id} Thumbnail`}
                className="h-full w-full object-cover"
              />
            </div>
          ) : null}
          <div className="flex flex-col space-y-2 p-2">
            {Object.keys(content).map((key) => (
              <div key={key} className="flex bg-gray-100 p-3">
                <p className="min-w-[112px] capitalize text-gray-400">{key}</p>
                <p>{content[key]}</p>
              </div>
            ))}
          </div>
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
