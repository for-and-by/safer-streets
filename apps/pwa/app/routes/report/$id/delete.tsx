import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { getIsoNow } from "@safer-streets/utils";

/*
 *   This action takes the most recent content on a report,
 *   copies it and adds the `is_deleted` flag
 * */

export const action: ActionFunction = async ({ params, context }) => {
  if (!params.id) return null;
  const supabase = context.getSupabase();

  const report = await supabase
    .from("reports")
    .select("content_id")
    .eq("id", params.id)
    .limit(1)
    .single();

  if (report.error) throw report.error;
  if (!report.data) throw `No report with id ${params.id} found.`;

  const content = await supabase
    .from("reports_content")
    .select()
    .eq("id", report.data.content_id)
    .limit(1)
    .single();

  if (content.error) throw content.error;
  if (!content.data) throw `Content ${report.data.content_id} not found.`;

  const { id: _, created_at: __, ...clonedData } = content.data;

  const newData = {
    is_deleted: true,
  };

  const clone = await supabase
    .from("reports_content")
    .insert({ ...clonedData, ...newData })
    .select();

  if (clone.error) throw clone.error;
  if (!clone.data) throw "No data was returned from content creation";

  const updateData = {
    content_id: clone.data[0].id,
    updated_at: getIsoNow(),
  };

  const update = await supabase
    .from("reports")
    .update(updateData)
    .eq("id", params.id);

  if (update.error) throw update.error;

  return redirect("/");
};
