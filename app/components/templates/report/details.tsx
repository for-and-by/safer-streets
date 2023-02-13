import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { Link, useRouteLoaderData, useTransition } from "@remix-run/react";
import { parseDateAsString } from "~/lib/parse-date-as-string";
import DeleteReportModal from "~/components/templates/report/delete";
import Footer from "~/components/regions/footer";
import type { ReportFull } from "~/types/db";

export default function ReportDetailsTemplate() {
  const { type } = useTransition();

  const loader = useRouteLoaderData("routes/report") as { report: ReportFull };
  const data = loader.report;

  const [fullImage, setFullImage] = useState(false);
  const [content, setContent] = useState<{ [key: string]: string | undefined }>(
    {}
  );

  useEffect(() => {
    if (data) {
      setContent({
        Severity: data.content.severity.title,
        Details: data.content.details,
        ...data.content.data,
        "Created On": parseDateAsString(data.created_at),
        "Last Updated": parseDateAsString(data.updated_at),
      });
    }
  }, [data]);

  if (!data) return null;

  return (
    <Footer show={type !== "normalRedirect"}>
      <div className="max-h-[50vh] divide-y divide-gray-200 overflow-y-scroll">
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
          <Link to={`/report/${data.id}/edit`} className="btn btn-primary">
            <p className="btn-text">Edit Report</p>
          </Link>
          <DeleteReportModal>
            <p className="btn-text">Delete</p>
          </DeleteReportModal>
        </div>
      </div>
    </Footer>
  );
}
