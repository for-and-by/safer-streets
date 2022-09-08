import supabase from "~/lib/supabase-client";
import { Severity } from "~/types/db";

export default async function fetchSeverities(handle?: string) {
  const query = supabase.from<Severity>("severities").select("*");

  if (handle) query.match({ handle });

  const severities = await query;
  if (severities.error) throw severities.error;
  if (!severities.data) throw "No data was returned from fetch";

  return severities.data;
}
