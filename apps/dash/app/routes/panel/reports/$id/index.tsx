import React from "react";
import { Link, useLoaderData } from "@remix-run/react";

import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";

import type { ReportContent, Severity } from "@safer-streets/db";

import { formatMetadata } from "~/utils/seo";
import { getPageRange } from "~/utils/data";

import { Pagination } from "~/components/elements/pagination";
import { TypeIcon } from "~/components/elements/type-icon";
import { parseDateAsString, parseDatesFromReport } from "~/utils/date";
import { getCookieSession } from "~/lib/session.server";

export const meta: MetaFunction = ({ params }) => {
  return formatMetadata({
    title: `Report #${params.id}`,
  });
};

export const loader: LoaderFunction = async ({ request, params, context }) => {
  const session = await getCookieSession(request);
  const supabase = await context.getSupabase(session);

  const report = await supabase
    .from("reports")
    .select("*, type:type_handle(*), content:content_id(is_deleted)")
    .eq("id", params.id)
    .single();

  if (!report.data) return redirect("/panel/reports");

  const url = new URL(request.url);
  const page = url.searchParams.get("page") ?? "1";
  const [from, to] = getPageRange(20, parseInt(page));

  const select = `
    *,
    severity:severity_handle(
      title
    ),
    details
  `;

  const content = await supabase
    .from("reports_content")
    .select(select, { count: "exact" })
    .eq("report_id", params.id)
    .order("id", { ascending: false })
    .range(from, to);

  if (content.error) throw new Error(content.error.message);

  const pageCount = content.count ? Math.ceil(content.count / 20) : 1;

  return json({
    report: report.data,
    content: content.data,
    pageCount,
  });
};

export default function Page() {
  const { report, content } = useLoaderData<typeof loader>();

  const { verifyDate, expiryDate } = parseDatesFromReport(report);
  const isAging = verifyDate && verifyDate.valueOf() < Date.now();
  const isExpired = expiryDate && expiryDate.valueOf() < Date.now();
  const isHidden = report?.content?.is_deleted || isExpired;

  return (
    <div className="flex h-[100vh] flex-col divide-y divide-gray-100 overflow-y-scroll">
      <div className="flex flex-col gap-4 px-12 py-20">
        <Link to={`/panel/reports`} className="flex items-center gap-4">
          <i className="icon icon-arrow-left" />
          <span>Go To Reports</span>
        </Link>
        <div className="flex h-10 items-center gap-4">
          <h1 className="text-xl font-medium">Report #{report.id}</h1>
        </div>
        <div className="flex gap-4">
          <Link
            to={`https://app.saferstreets.info/report/${report.id}`}
            target="_blank"
            className="btn btn-primary"
          >
            View In App
          </Link>
          <Link
            to={`https://app.saferstreets.info/report/${report.id}/edit`}
            target="_blank"
            className="btn btn-light"
          >
            Edit In App
          </Link>
          <Link
            to={`/panel/reports/${report.id}/verify`}
            className="btn btn-light"
          >
            Verify Report
          </Link>

          <Link
            to={`/panel/reports/${report.id}/delete`}
            className="btn btn-light text-danger-600"
          >
            Delete Report
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-4 p-8">
        <p className="mb-2 ml-6 font-medium">Metadata</p>
        <div className="flex flex-col gap-4 bg-white p-8">
          <div className="flex max-w-2xl gap-4">
            <p className="w-40 font-medium">Type</p>
            <div className="flex items-center gap-2">
              <p>{report.type.title}</p>
              <TypeIcon
                type={report.type_handle}
                className="before:text-brand-700"
              />
            </div>
          </div>
          <div className="flex max-w-2xl gap-4">
            <p className="w-40 font-medium">Created On</p>
            <p>{parseDateAsString(report.created_at)}</p>
          </div>
          <div className="flex max-w-2xl gap-4">
            <p className="w-40 font-medium">Updated On</p>
            <p>{parseDateAsString(report.updated_at)}</p>
          </div>
          <div className="flex max-w-2xl gap-4">
            <p className="w-40 font-medium">Is Aging</p>
            <p>{isAging ? "Yes" : "No"}</p>
          </div>
          <div className="flex max-w-2xl gap-4">
            <p className="w-40 font-medium">Is Expired</p>
            <p>{isExpired ? "Yes" : "No"}</p>
          </div>
          <div className="flex max-w-2xl gap-4">
            <p className="w-40 font-medium">Is Deleted</p>
            <p>{report.content.is_deleted ? "Yes" : "No"}</p>
          </div>
          <div className="flex max-w-2xl gap-4">
            <p className="w-40 font-medium">Is Hidden</p>
            <p>{isHidden ? "Yes" : "No"}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 p-8">
        <h1 className="mb-6 ml-6 font-medium">Content History</h1>
        {content?.map((item: ReportContent & { severity: Severity }) => (
          <Link
            to={`/panel/content/${item.id}`}
            key={item.id}
            className="flex justify-between bg-white p-8"
          >
            <div className="flex flex-col gap-4">
              <p className="text-lg font-medium">Report Content #{item.id}</p>
              <p className="max-w-2xl truncate text-gray-500">{item.details}</p>
              <div className="flex gap-2">
                {item.id === report.content_id ? (
                  <div className="flex h-8 items-center rounded bg-brand-700 px-2 text-white">
                    <p className="text-sm font-medium">Active Content</p>
                  </div>
                ) : null}
                <div className="flex h-8 items-center rounded bg-gray-100 px-2">
                  <p className="text-sm font-medium">
                    {parseDateAsString(item.created_at)}
                  </p>
                </div>
                <div className="flex h-8 items-center rounded bg-gray-100 px-2">
                  <p className="text-sm font-medium">{item.severity.title}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="p-8">
        <Pagination />
      </div>
    </div>
  );
}
