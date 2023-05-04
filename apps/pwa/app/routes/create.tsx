import React from "react";

import type { ActionFunction, MetaFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import type { FormCreateValues } from "@safer-streets/db";

import { formatMetadata } from "~/utils/seo";
import { prepareImageData } from "~/lib/image";
import { parseLngLat } from "~/lib/maplibre";

import CreateTemplate from "~/components/templates/create";
import CreateProvider from "~/components/templates/create/context";

export const meta: MetaFunction = () => {
  return formatMetadata({
    title: "Create New Report",
  });
};

export const action: ActionFunction = async ({ request, context }) => {
  const supabase = context.getSupabase();

  // Preparing form data
  const data = await request.formData();
  const create = data.get("create");
  if (typeof create !== "string") return null;
  const values = JSON.parse(create) as FormCreateValues;

  // If there's an image, upload it, return the ID
  let image: string | undefined = undefined;
  if (values.image) {
    const { file, location, options } = prepareImageData(values.image);

    const upload = await supabase.storage
      .from("users")
      .upload(location, file, options);

    if (upload.error) throw upload.error;
    if (!upload.data) throw "No data returned";

    const url = supabase.storage.from("users").getPublicUrl(upload.data.path);
    if (!url.data) throw "No url generated";

    image = url.data.publicUrl;
  }

  // Create initial report row
  const [lng, lat] = parseLngLat(values.location.coordinates);

  const reportData = {
    lng,
    lat,
    type_handle: values.type,
  };

  const report = await supabase
    .from("reports")
    .insert(reportData)
    .select()
    .single();

  if (report.error) throw report.error;
  if (!report.data) throw "No data was returned from reports upload.";

  // Create report content
  const contentData = {
    report_id: report.data.id,
    details: values.details,
    severity_handle: values.severity,
    data: values.custom ?? {},
    image_url: image,
  };

  const content = await supabase
    .from("reports_content")
    .insert(contentData)
    .select()
    .single();

  if (content.error) throw content.error;
  if (!content.data) throw "No data was returned from reports content upload";

  // Assign content ID to parent report
  const updateData = {
    content_id: content.data.id,
  };

  const update = await supabase
    .from("reports")
    .update(updateData)
    .eq("id", report.data.id)
    .select()
    .single();

  if (update.error) throw update.error;

  return redirect(`/report/${report.data.id}`);
};

export default function Home() {
  return (
    <CreateProvider>
      <CreateTemplate />
    </CreateProvider>
  );
}
