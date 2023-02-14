import type { LoaderFunction, MetaFunction } from "@remix-run/cloudflare";
import { json, redirect } from "@remix-run/cloudflare";
import { Outlet } from "@remix-run/react";

import { config } from "~/config";

import { fetchReportContent } from "~/lib/supabase";

import ReportTemplate from "~/components/templates/report";

export const meta: MetaFunction = ({ data }) => ({
  title:
    `${data.report.type.title} Report #${data.report.id}  | ` +
    config.seo.default.title,
  description: data.report.content.details,
  "og-image": data.report.content.image_url,
});

export const loader: LoaderFunction = async ({ params }) => {
  if (!params.id) return redirect("/");
  const report = await fetchReportContent(params.id);
  return json({ report });
};

export default function Report() {
  return (
    <ReportTemplate>
      <Outlet />
    </ReportTemplate>
  );
}
