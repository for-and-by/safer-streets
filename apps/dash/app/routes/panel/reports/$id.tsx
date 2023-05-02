import { Link, useLoaderData } from "@remix-run/react";

import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";

import type { ReportContent, Severity } from "@safer-streets/db";
import { SupabaseClient } from "@safer-streets/db";

import { formatMetadata } from "~/utils/seo";
import { getPageRange } from "~/utils/data";

import { Pagination } from "~/components/elements/pagination";
import { TypeIcon } from "~/components/elements/type-icon";
import { parseDateAsString } from "~/utils/date";

export const meta: MetaFunction = ({ params }) => {
  return formatMetadata({
    title: `Report #${params.id}`,
  });
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const report = await SupabaseClient.from("reports")
    .select("*, type:type_handle(*)")
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

  const content = await SupabaseClient.from("reports_content")
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

  return (
    <div className="flex h-[100vh] flex-col divide-y divide-gray-100 overflow-y-scroll">
      <div className="flex justify-between gap-4 p-8">
        <div className="flex items-center gap-4">
          <TypeIcon
            type={report.type_handle}
            className="before:text-brand-700"
          />
          <h1 className="text-xl font-medium">Report #{report.id}</h1>
          <p>{report.type.title}</p>
        </div>
        <div className="flex items-center gap-8 rounded bg-white p-4">
          <div className="flex flex-col items-start gap-1">
            <p className="font-medium">Created At</p>
            <p>{parseDateAsString(report.created_at)}</p>
          </div>
          <div className="flex flex-col items-start gap-1">
            <p className="font-medium">Updated At</p>
            <p>{parseDateAsString(report.updated_at)}</p>
          </div>
        </div>
      </div>
      <div className="p-8">
        <h1 className="font-medium">Content History</h1>
      </div>
      <div className="flex flex-col gap-2 p-4">
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
