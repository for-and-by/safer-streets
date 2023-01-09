import { Report, ReportContent } from "~/types/db";
import supabase from "~/lib/supabase-client";

interface Data {
  lng: Report["lng"];
  lat: Report["lat"];
  type_handle: Report["type_handle"];
  is_deleted: Report["is_deleted"];
  details: ReportContent["details"];
  severity_handle: ReportContent["severity_handle"];
  image_url?: string;
  image?: File;
  data: ReportContent["data"];
}

export default async function uploadReport(data: Data) {
  const report = await supabase.from<Report>("reports").insert({
    lng: data.lng,
    lat: data.lat,
    type_handle: data.type_handle,
    is_deleted: data.is_deleted,
  });

  if (report.error) throw report.error;
  if (!report.data) throw "No data was returned from reports upload.";

  const content = await supabase.from<ReportContent>("reports_content").insert({
    report_id: report.data[0].id,
    details: data.details,
    severity_handle: data.severity_handle,
    data: data.data,
    image_url: data.image_url,
  });

  if (content.error) throw content.error;
  if (!content.data) throw "No data was returned from reports content upload";

  return { content, report };
}
