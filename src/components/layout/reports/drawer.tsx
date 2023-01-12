import React, { ReactNode, useEffect, useState } from "react";
import Modal from "~/components/composites/modal";
import useActiveReport from "~/hooks/reports/use-active-report";
import useAsync from "~/hooks/use-async";
import fetchReportContent from "~/lib/fetch-report-content";
import clsx from "clsx";

interface Props {
  children?: ReactNode;
  className?: string;
}

export default function ReportDrawer({ children, className }: Props) {
  const [activeReportId] = useActiveReport();
  const [fullImage, setFullImage] = useState(false);
  const [content, setContent] = useState<{ [key: string]: string | undefined }>(
    {}
  );

  const { data, trigger } = useAsync(async () =>
    activeReportId ? await fetchReportContent(activeReportId) : null
  );

  useEffect(() => {
    if (activeReportId) {
      trigger();
    }
  }, [activeReportId]);

  useEffect(() => {
    if (data) {
      setContent({
        Severity: data.severity.title,
        Details: data.details,
        ...data.data,
        "Created On": data.report.created_at
          ? new Date(data.report.created_at).toLocaleDateString()
          : undefined,
        "Last Updated": data.report.updated_at
          ? new Date(data.report.updated_at).toLocaleDateString()
          : undefined,
      });
    }
  }, [data]);

  console.log(data);

  if (!data) return null;

  return (
    <>
      <Modal>
        <Modal.Trigger className={className}>{children}</Modal.Trigger>
        <Modal.Body>
          <Modal.Tint />
          <Modal.Panel className="h-[50vh] divide-y divide-gray-200 overflow-y-scroll">
            <div className="sticky top-0 z-50 flex items-center justify-between bg-white p-2">
              <p className="ml-2 font-medium">{data.report.type.title}</p>
              <Modal.Close className="btn btn-light">
                <i className="icon icon-close" />
              </Modal.Close>
            </div>
            {data.image_url ? (
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
                  src={data?.image_url?.replace("/users/users", "/users")}
                  alt={`Report ${data.report.id} Thumbnail`}
                  className="h-full w-full object-cover"
                />
              </div>
            ) : null}
            <div className="flex flex-col space-y-2 p-2">
              {Object.keys(content).map((key) => (
                <div key={key} className="flex bg-gray-100 p-3">
                  <p className="min-w-[112px] capitalize text-gray-400">
                    {key}
                  </p>
                  <p>{content[key]}</p>
                </div>
              ))}
            </div>
            <div className="sticky bottom-0 flex justify-between bg-white p-2 shadow-md">
              <button className="btn btn-primary">
                <p className="btn-text">Edit Report</p>
              </button>
              <button className="btn btn-light">
                <p className="btn-text">Delete</p>
              </button>
            </div>
          </Modal.Panel>
        </Modal.Body>
      </Modal>
    </>
  );
}
