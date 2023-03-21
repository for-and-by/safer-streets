import React, { useEffect, useState } from "react";
import Toast from "~/components/regions/toast";
import BaseMarker from "~/components/molecules/markers/base";
import { Link, useFetcher, useNavigation } from "@remix-run/react";
import type { ReportSummary } from "@safer-streets/db";
import { parseImageUrl } from "~/lib/image";
import { parseDatesFromReport } from "~/utils/date";

interface Props {
  id?: string;
  onClose?: () => void;
}

export default function SummaryMarker({ onClose, id }: Props) {
  const fetcher = useFetcher();
  const { state } = useNavigation();

  const [show, setShow] = useState(false);

  let summary = fetcher?.data?.summary as ReportSummary;
  const { verifyDate } = parseDatesFromReport(summary);

  const handleClose = () => {
    if (onClose) onClose();
    setShow(false);
  };

  useEffect(() => {
    if (id) fetcher.load(`/report/${id}/summary`);
    //   eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (summary) setShow(true);
  }, [summary]);

  useEffect(() => {
    if (state !== "idle" && onClose) {
      onClose();
    }
    //   eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <>
      <Toast content="Fetching summary..." show={fetcher.state === "loading"} />
      {summary?.content && id && show ? (
        <BaseMarker coordinates={summary} anchor="bottom" offset={[0, -25]}>
          <div className="relative shadow-lg before:absolute before:bottom-0 before:left-1/2 before:h-3 before:w-3 before:-translate-x-1/2 before:translate-y-1 before:rotate-45 before:bg-white">
            <div className="flex w-48 flex-col overflow-hidden rounded bg-white">
              <button
                className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-black text-white hover:bg-gray-900"
                onClick={handleClose}
              >
                <i className="icon icon-close icon-sm" />
              </button>
              {summary?.content?.image_url ? (
                <div className="h-16 w-full overflow-hidden rounded-t bg-gray-100">
                  <img
                    src={parseImageUrl(summary.content.image_url, {
                      height: 270,
                      width: 480,
                    })}
                    alt={`Report ${summary.id} Thumbnail`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : null}
              <div className="flex flex-col divide-y divide-gray-200">
                <div className="flex flex-col items-start p-2">
                  <p className="text-bold">{summary.type.title}</p>
                  <p className="text-gray-500">
                    {summary.content.severity.title}
                  </p>
                  {verifyDate && verifyDate.valueOf() < Date.now() ? (
                    <p className="my-1 rounded bg-gray-800 px-1 text-sm text-white">
                      Needs Verifying
                    </p>
                  ) : null}
                </div>
                <div className="p-2">
                  <Link to={`/report/${summary.id}`} className="text-brand-600">
                    <p className="btn-text">See details</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </BaseMarker>
      ) : null}
    </>
  );
}
