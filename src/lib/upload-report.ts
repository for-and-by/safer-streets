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

  return { content, report };
}
