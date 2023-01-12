import supabase from "~/lib/supabase-client";

import { Report, ReportContent, SEVERITIES, TYPES } from "~/types/db";
import { FormValues } from "~/types/form";

import parseLngLat from "~/lib/parse-lng-lat";

export default async function uploadReport(
  data: FormValues,
  imageUrl?: string
) {
  const [lng, lat] = parseLngLat(data.location.coordinates);

  const report = await supabase.from<Report>("reports").insert({
    lng,
    lat,
    type_handle: data.type as TYPES,
  });

  if (report.error) throw report.error;
  if (!report.data) throw "No data was returned from reports upload.";

  const content = await supabase.from<ReportContent>("reports_content").insert({
    report_id: report.data[0].id,
    details: data.details,
    severity_handle: data.severity as SEVERITIES,
    data: data.custom ?? {},
    image_url: imageUrl,
  });

  if (content.error) throw content.error;
  if (!content.data) throw "No data was returned from reports content upload";

  console.log("content >>:", content.data);
  console.log("report >>:", report.data);

  const update = await supabase
    .from<Report>("reports")
    .update({
      content_id: content.data[0].id,
    })
    .eq("id", report.data[0].id)
    .select("*");

  const report_test = await supabase
    .from<Report>("reports")
    .select("*")
    .eq("id", report.data[0].id);

  console.log("update >>:", update);
  console.log("test >>:", report_test);

  if (update.error) throw update.error;

  return { content, report };
}
