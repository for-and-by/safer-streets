import supabase from "~/lib/supabase-client";
import { Report, ReportContent } from "~/types/db";

export default async function deleteReport(id: number) {
  const report = await supabase
    .from<Report>("reports")
    .select("content_id")
    .eq("id", id)
    .limit(1)
    .single();

  if (report.error) throw report.error;
  if (!report.data) throw `No report with id ${id} found.`;

  const content = await supabase
    .from<ReportContent>("reports_content")
    .select("*")
    .eq("id", report.data.content_id)
    .limit(1)
    .single();

  if (content.error) throw content.error;
  if (!content.data)
    throw `No content with id ${report.data.content_id} found.`;

  const { id: _, ...clonedData } = content.data;

  const clone = await supabase
    .from<ReportContent>("reports_content")
    .insert({ ...clonedData, is_deleted: true });

  if (clone.error) throw clone.error;
  if (!clone.data) throw "No data was returned from content creation";

  const update = await supabase
    .from<Report>("reports")
    .update({
      content_id: clone.data[0].id,
      updated_at: new Date(Date.now()).toISOString(),
    })
    .eq("id", id);

  if (update.error) throw update.error;

  return { report, content, clone, update };
}
