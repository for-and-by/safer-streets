import supabase from "~/lib/supabase-client";
import { ReportContent, ReportFull } from "~/types/db";

export default async function fetchReportContent(id: string | number) {
  const query = supabase
    .from<ReportContent>("reports_content")
    .select(
      "*, severity:severity_handle (*), report:report_id (*, type:type_handle (*))"
    )
    .eq("report_id", id)
    .limit(1)
    .single();

  const reports = await query;
  if (reports.error) throw reports.error;
  if (!reports.data) throw "No data was returned from fetch";

  return reports.data as unknown as ReportFull;
}
