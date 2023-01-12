import supabase from "~/lib/supabase-client";
import { Report, ReportFull } from "~/types/db";

export default async function fetchReportContent(id: string | number) {
  const query = supabase
    .from<Report>("reports")
    .select(
      "*, type:type_handle(*), content:content_id(*, severity:severity_handle (*))"
    )
    .eq("id", id)
    .limit(1)
    .single();

  const reports = await query;
  if (reports.error) throw reports.error;
  if (!reports.data) throw "No data was returned from fetch";

  return reports.data as unknown as ReportFull;
}
