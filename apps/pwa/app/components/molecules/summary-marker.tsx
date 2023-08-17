import { useEffect, useState } from "react";
import { Link, useFetcher, useLocation, useNavigation } from "@remix-run/react";

import type { ReportSummary } from "@safer-streets/db";
import { getMetadataFromContent } from "@safer-streets/utils";

import { parseImageUrl } from "~/lib/image";

import { useMapCenter } from "~/hooks/map/use-map-center";
import { useLayerEvent } from "~/hooks/map/use-layer-event";

import BaseMarker from "~/components/molecules/markers/base";
import Toast from "~/components/regions/toast";

type PropsContent = {
  summary: ReportSummary;
  show: boolean;
  onClose: () => void;
};

function SummaryContent({ summary, show, onClose }: PropsContent) {
  if (!summary || !show) return null;

  const { isAging } = getMetadataFromContent(summary.content, summary.type);

  return (
    <BaseMarker coordinates={summary} anchor="bottom" offset={[0, -25]}>
      <div className="relative shadow-lg before:absolute before:bottom-0 before:left-1/2 before:h-3 before:w-3 before:-translate-x-1/2 before:translate-y-1 before:rotate-45 before:bg-white">
        <div className="flex w-48 flex-col overflow-hidden rounded bg-white">
          <button
            className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-black text-white hover:bg-gray-900"
            onClick={onClose}
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
              <p className="text-gray-500">{summary.content.severity.title}</p>
              {isAging ? (
                <p className="my-1 rounded bg-gray-800 px-1 text-sm text-white">
                  Needs Verifying
                </p>
              ) : null}
            </div>
            <div className="p-2">
              <Link to={`/report/${summary.id}`} className="text-brand-700">
                <p className="btn-text">See details</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </BaseMarker>
  );
}

export function SummaryMarker() {
  const fetcher = useFetcher();
  const [show, setShow] = useState(false);

  const location = useLocation();
  const navigation = useNavigation();
  const [, setCenter] = useMapCenter();

  useLayerEvent("click", "reports-bg", (event) => {
    setCenter(event.lngLat);

    const [feature] = event.target.queryRenderedFeatures(event.point, {
      layers: ["reports-bg"],
    });

    const id = feature?.properties?.id;
    if (!id) return;

    fetcher.load(`/report/${id}/summary`);
  });

  useEffect(() => {
    setShow(
      fetcher.state === "idle" && !!fetcher.data && location.pathname === "/"
    );
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetcher.state]);

  useEffect(() => {
    if (navigation.state !== "idle") {
      setShow(false);
    }
  }, [navigation.state]);

  const summary = fetcher?.data?.summary;
  if (location.pathname !== "/") return null;

  return (
    <>
      <Toast content="Fetching summary..." show={fetcher.state === "loading"} />
      <SummaryContent
        summary={summary}
        show={show}
        onClose={() => setShow(false)}
      />
    </>
  );
}
