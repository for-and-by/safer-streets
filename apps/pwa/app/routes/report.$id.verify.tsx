import type { ActionFunction } from "@remix-run/cloudflare";
import { redirect } from "@remix-run/cloudflare";
import { getIsoNow } from "@safer-streets/utils";

/*
 *   This loader updates the `updated_at` column on a report to ammend it expiring
 * */

export const action: ActionFunction = async ({ params, context }) => {
  const supabase = await context.getSupabase();

  const report = await supabase
    .from("reports")
    .select("content_id")
    .eq("id", params.id)
    .limit(1)
    .single();

  if (report.error) throw report.error.message;
  if (!report.data) throw `No report with id ${params.id} found`;

  const update = await supabase
    .from("reports_content")
    .update({ verified_at: getIsoNow() })
    .eq("id", report.data.content_id);

  if (update.error) throw update.error.message;

  return redirect(`/`);
};
