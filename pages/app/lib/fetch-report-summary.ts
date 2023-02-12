import supabase from "~/lib/supabase-client";
import { Report, ReportSummary } from "~/types/db";

export default async function fetchReportSummary(id: string | number) {
  const query = supabase
    .from<Report>("reports")
    .select(
      "id, lng, lat, type:type_handle (title), content:content_id(image_url, severity:severity_handle(title) )"
    )
    .eq("id", id)
    .limit(1)
    .single();

  const reports = await query;
  if (reports.error) throw reports.error;
  if (!reports.data) throw "No data was returned from fetch";

  return reports.data as unknown as ReportSummary;
}
