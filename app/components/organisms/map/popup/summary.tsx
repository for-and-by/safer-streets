import React, { useEffect, useState } from "react";

import useAsync from "~/hooks/use-async";
import Toast from "~/components/regions/toast";
import useActiveReport from "~/hooks/reports/use-active-report";
import BaseMarker from "~/components/organisms/map/markers/base";
import { fetchReportSummary } from "~/lib/supabase";
import { Link } from "@remix-run/react";
import { parseImageUrl } from "~/lib/parse-image-url";

export default function SummaryMarker() {
  const [show, setShow] = useState(false);

  const [activeReportId, setActiveReportId] = useActiveReport();

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

  useEffect(() => {
    if (activeReportId) handleLoad();
    else handleClose();
  }, [activeReportId]);

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
                  src={parseImageUrl(data.content.image_url)}
                  alt={`Report ${data.id} Thumbnail`}
                  className="h-full w-full object-cover"
                />
              ) : null}
            </div>
            <div className="flex flex-col p-2">
              <p className="text-bold">{data.type.title}</p>
              <p className="text-gray-400">{data.content.severity.title}</p>
              <Link to={`/report/${data.id}`} className="text-brand-600">
                <p className="btn-text">See details</p>
              </Link>
            </div>
          </div>
        </div>
      </BaseMarker>
    </>
  );
}
