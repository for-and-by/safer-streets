import type {
  Report,
  ReportContent,
  ReportFull,
  ReportSummary,
  SEVERITIES,
  Severity,
  Type,
  TYPES,
} from "~/types/db";

import { createClient } from "@supabase/supabase-js";
import { config } from "~/config";

import { decode } from "base64-arraybuffer";
import type { FormCreateValues, FormUpdateValues } from "~/types/form";
import { parseLngLat } from "~/lib/maplibre";

export const supabase = createClient(config.supabase.url, config.supabase.key);

export async function deleteReport(id: number) {
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

export async function updateReport(
  values: FormUpdateValues,
  imageUrl?: string
) {
  const report = await supabase
    .from<Report>("reports")
    .select("content_id")
    .eq("id", values.id)
    .limit(1)
    .single();

  if (report.error) throw report.error;
  if (!report.data) throw `No report with id ${values.id} found.`;

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

  const mappedContentValues: Partial<ReportContent> = {
    image_url: imageUrl,
    severity_handle: values.severity as SEVERITIES,
    details: values.details,
  };

  const newContentData = Object.keys(mappedContentValues).reduce(
    (data, key) => {
      const value =
        mappedContentValues[key as keyof typeof mappedContentValues];
      if (!value) return data;
      return { ...data, [key]: value };
    },
    {}
  );

  const clone = await supabase
    .from<ReportContent>("reports_content")
    .insert({ ...clonedData, ...newContentData });

  if (clone.error) throw clone.error;
  if (!clone.data) throw "No data was returned from content creation";

  const update = await supabase
    .from<Report>("reports")
    .update({
      content_id: clone.data[0].id,
      updated_at: new Date(Date.now()).toISOString(),
      ...(values.type ? { type_handle: values.type as TYPES } : {}),
    })
    .eq("id", values.id);

  if (update.error) throw update.error;

  return { report, content, clone, update };
}

export async function uploadFile(image?: string) {
  if (!image) return;

  const timestamp = Date.now();
  const filename = `report-img-${timestamp}.jpeg`;
  const base64 = image.split(",")[1];

  const upload = await supabase.storage
    .from("users")
    .upload(`reports/${filename}`, decode(base64), {
      contentType: "image/jpeg",
    });

  if (upload.error) throw upload.error;
  if (!upload.data) throw "No data returned";

  const url = supabase.storage.from("users").getPublicUrl(upload.data.Key);
  if (url.error) throw url.error;
  if (!url.data) throw "No url generated";

  return url.data.publicURL;
}

export async function uploadReport(data: FormCreateValues, imageUrl?: string) {
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

  const update = await supabase
    .from<Report>("reports")
    .update({
      content_id: content.data[0].id,
    })
    .eq("id", report.data[0].id)
    .select("*");

  if (update.error) throw update.error;

  return { content, report };
}

export async function fetchTypes(handle?: string) {
  const query = supabase.from<Type>("types").select("*");

  if (handle) query.match({ handle });

  const types = await query;
  if (types.error) throw types.error;
  if (!types.data) throw "No data was returned from fetch";

  return types.data;
}

export async function fetchSeverities(handle?: string) {
  const query = supabase.from<Severity>("severities").select("*");

  if (handle) query.match({ handle });

  const severities = await query;
  if (severities.error) throw severities.error;
  if (!severities.data) throw "No data was returned from fetch";

  return severities.data;
}

interface FetchFilters {
  lastSynced?: string;
}

export async function fetchReports(filters?: FetchFilters) {
  const query = supabase
    .from<Report>("reports")
    .select(
      "*, type:type_handle (expire_by), content:content_id (is_deleted) "
    );

  if (filters?.lastSynced) query.gt("updated_at", filters.lastSynced);

  const reports = await query;
  if (reports.error) throw reports.error;
  if (!reports.data) throw "No data was returned from fetch";

  return reports.data;
}

export async function fetchReportSummary(id: string | number) {
  const query = supabase
    .from<Report>("reports")
    .select(
      "id, lng, lat, type:type_handle (title), content:content_id(image_url, severity:severity_handle(title) )"
    )
    .eq("id", id)
    .limit(1)
    .single();

  const reports = await query;
  if (reports.error) throw reports.error;
  if (!reports.data) throw "No data was returned from fetch";

  return reports.data as unknown as ReportSummary;
}

export async function fetchReportContent(id: string | number) {
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
