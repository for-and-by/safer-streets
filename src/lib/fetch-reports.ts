import supabase from "~/lib/supabase-client";
import { Report } from "~/types/db";

interface FetchFilters {
  lastSynced?: string;
}

export default async function fetchReports(filters?: FetchFilters) {
  const query = supabase
    .from<Report>("reports")
    .select("*, type:type_handle (expire_by) ");

  console.log(filters);

  if (filters?.lastSynced) query.gt("updated_at", filters.lastSynced);

  const reports = await query;
  if (reports.error) throw reports.error;
  if (!reports.data) throw "No data was returned from fetch";

  return reports.data;
}
