import React, { useEffect, useState } from "react";
import {
  Link,
  useRouteLoaderData,
  useSubmit,
  useTransition,
} from "@remix-run/react";

import type { ReportFull } from "~/types/db";
import { parseDateAsString } from "~/lib/parse-date-as-string";

import Footer from "~/components/regions/footer";
import Toast from "~/components/regions/toast";

import { Warning } from "~/components/composites/warning";
import { ImageCollapse } from "~/components/molecules/image-collapse";

export default function ReportDetailsTemplate() {
  const { state } = useTransition();
  const submit = useSubmit();

  const loader = useRouteLoaderData("routes/report") as { report: ReportFull };
  const data = loader.report;

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

  const handleDelete = () => {
    submit(null, { action: `/report/${data.id}/delete`, method: "delete" });
  };

  if (!data) return null;

  return (
    <>
      <Toast content="Deleting report..." show={state === "submitting"} />
      <Warning>
        <Footer>
          <div className="max-h-[50vh] divide-y divide-gray-200 overflow-y-scroll">
            {data.content.image_url ? (
              <ImageCollapse src={data.content.image_url} />
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
              <Link to={`/report/${data.id}/edit`} className="btn btn-primary">
                <p className="btn-text">Edit Report</p>
              </Link>
              <Warning.Trigger className="btn btn-light">
                <p className="btn-text">Delete</p>
              </Warning.Trigger>
            </div>
          </div>
        </Footer>
        <Warning.Panel
          heading="Delete Report"
          body="Are you sure you want to delete this report? You won't be able to recover it without "
          onConfirm={handleDelete}
        />
      </Warning>
    </>
  );
}
