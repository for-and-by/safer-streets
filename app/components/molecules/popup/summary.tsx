import React, { useEffect, useState } from "react";
import Toast from "~/components/regions/toast";
import BaseMarker from "~/components/molecules/markers/base";
import { Link, useFetcher, useLocation } from "@remix-run/react";
import { parseImageUrl } from "~/lib/parse-image-url";
import type { ReportSummary } from "~/types/db";

interface Props {
  id?: string;
  onClose?: () => void;
}

export default function SummaryMarker({ onClose, id }: Props) {
  const fetcher = useFetcher();
  const location = useLocation();

  const [show, setShow] = useState(false);

  let summary = fetcher?.data?.summary as ReportSummary;

  const handleClose = () => {
    if (onClose) onClose();
    setShow(false);
  };

  useEffect(() => {
    if (id) fetcher.load(`/report/${id}/summary`);
  }, [id]);

  useEffect(() => {
    if (summary) setShow(true);
  }, [summary]);

  useEffect(() => {
    if (location.pathname !== "/") {
      handleClose();
    }
  }, [location]);

  if (!summary || !summary.content || !show) return null;

  return (
    <>
      <Toast content="Fetching summary..." show={fetcher.state === "loading"} />
      <BaseMarker coordinates={summary} anchor="bottom" offset={[0, -4]}>
        <div className="relative shadow-lg before:absolute before:bottom-0 before:left-1/2 before:h-3 before:w-3 before:-translate-x-1/2 before:translate-y-1 before:rotate-45 before:bg-white">
          <div className="flex flex-col overflow-hidden rounded bg-white">
            <button
              className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-black text-white hover:bg-gray-900"
              onClick={handleClose}
            >
              <i className="icon icon-close" />
            </button>
            <div className="h-16 w-48 overflow-hidden rounded-t bg-gray-100">
              {summary?.content?.image_url ? (
                <img
                  src={parseImageUrl(summary.content.image_url)}
                  alt={`Report ${summary.id} Thumbnail`}
                  className="h-full w-full object-cover"
                />
              ) : null}
            </div>
            <div className="flex flex-col p-2">
              <p className="text-bold">{summary.type.title}</p>
              <p className="text-gray-400">{summary.content.severity.title}</p>
              <Link to={`/report/${summary.id}`} className="text-brand-600">
                <p className="btn-text">See details</p>
              </Link>
            </div>
          </div>
        </div>
      </BaseMarker>
    </>
  );
}
