import supabase from "~/lib/supabase-client";
import { Report } from "~/types/db";

export default async function fetchReportSummary(id: string | number) {
  const query = supabase
    .from<Report>("reports")
    .select("*")
    .eq("id", id)
    .limit(1)
    .single();

  const reports = await query;
  if (reports.error) throw reports.error;
  if (!reports.data) throw "No data was returned from fetch";

  return reports.data;
}
