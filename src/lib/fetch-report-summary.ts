import supabase from "~/lib/supabase-client";
import { ReportContent, ReportSummary } from "~/types/db";

export default async function fetchReportSummary(id: string | number) {
  const query = supabase
    .from<ReportContent>("reports_content")
    .select(
      "image_url, severity:severity_handle (title), report:report_id (id, lng, lat, type:type_handle (title))"
    )
    .eq("report_id", id)
    .limit(1)
    .single();

  const reports = await query;
  if (reports.error) throw reports.error;
  if (!reports.data) throw "No data was returned from fetch";

  return reports.data as unknown as ReportSummary;
}
