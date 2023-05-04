import React, { useEffect } from "react";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";

import { formatMetadata } from "~/utils/seo";

import { useReportOpen } from "~/hooks/reports/use-report-open";
import useMapLock from "~/hooks/map/use-map-lock";
import useMapCenter from "~/hooks/map/use-map-center";

import ReportMarker from "~/components/molecules/markers/report";
import Header from "~/components/regions/header";

export const meta: MetaFunction = ({ data }) => {
  return formatMetadata({
    title: `${data.report.type.title} Report #${data.report.id}`,
    description: data.report.content.details,
    image: data.report.content.image_url,
  });
};

export const loader: LoaderFunction = async ({ params, context }) => {
  if (!params.id) return redirect("/");
  const supabase = context.getSupabase();

  const select = `
    *,
    type:type_handle(
      *
    ),
    content:content_id(
      *,
      severity:severity_handle(
        *
      )
    )
  `;

  const report = await supabase
    .from("reports")
    .select(select)
    .eq("id", params.id)
    .limit(1)
    .single();

  if (report.error) throw report.error;
  if (!report.data) return redirect("/");

  return json({ report: report.data });
};

export default function Report() {
  const loader = useLoaderData();
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
