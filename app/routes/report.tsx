import type { LoaderFunction } from "@remix-run/router";
import { json, redirect } from "@remix-run/cloudflare";
import { Outlet } from "@remix-run/react";

import { fetchReportContent } from "~/lib/supabase";

import ReportTemplate from "~/components/templates/report";

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
