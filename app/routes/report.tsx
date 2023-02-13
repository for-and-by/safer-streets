import { ReportTemplate } from "~/components/templates/report";
import type { LoaderFunction } from "@remix-run/router";
import { fetchReportContent } from "~/lib/supabase";
import { json, redirect } from "@remix-run/cloudflare";
import { Outlet } from "@remix-run/react";

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
