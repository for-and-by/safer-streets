import ReportInfo from "~/components/templates/report/info";
import React from "react";
import type { LoaderFunction } from "@remix-run/router";
import { json, redirect } from "@remix-run/cloudflare";
import { fetchReportContent } from "~/lib/supabase";

export const loader: LoaderFunction = async ({ params }) => {
  if (!params.id) return redirect("/");
  const report = await fetchReportContent(params.id);
  return json({ report });
};

export default function ReportIndex() {
  return <ReportInfo />;
}
