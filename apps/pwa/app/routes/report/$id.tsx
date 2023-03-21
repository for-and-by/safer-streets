import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";

import { fetchReportContent } from "@safer-streets/db";

import { useReportOpen } from "~/hooks/reports/use-report-open";
import useMapLock from "~/hooks/map/use-map-lock";
import useMapCenter from "~/hooks/map/use-map-center";
import React, { useEffect } from "react";
import ReportMarker from "~/components/molecules/markers/report";
import Header from "~/components/regions/header";
import { formatMetadata } from "~/utils/seo";

export const meta: MetaFunction = ({ data }) => {
  return formatMetadata({
    title: `${data.report.type.title} Report #${data.report.id}`,
    description: data.report.content.details,
    image: data.report.content.image_url,
  });
};

export const loader: LoaderFunction = async ({ params }) => {
  if (!params.id) return redirect("/");
  const report = await fetchReportContent(params.id);
  return json({ report });
};

export default function Report() {
  const loader = useLoaderData();
  console.log(loader);
  const data = loader?.report;

  const [, open] = useReportOpen();
  const [isLocked, { setLock }] = useMapLock();
  const [, setCenter] = useMapCenter();

  useEffect(() => {
    if (!isLocked) setLock();
    open(data.content_id);
    setCenter(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ReportMarker coordinates={data} />
      <Header>
        <div className="flex flex-col divide-y divide-gray-100">
          <div className="flex flex-row items-center bg-white p-2">
            <Link to="/" className="btn btn-light">
              <i className="btn-icon icon icon-arrow-left" />
            </Link>
            <div className="flex flex-col px-3">
              <h3 className="font-medium">Report Details</h3>
              <p className="text-sm text-base-400">
                Details for Report #{data.id}
              </p>
            </div>
          </div>
        </div>
      </Header>
      <Outlet />
    </>
  );
}
