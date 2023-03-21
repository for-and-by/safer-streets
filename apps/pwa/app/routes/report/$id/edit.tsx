import React from "react";
import ReportEditTemplate from "~/components/templates/report/edit";
import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { updateReport, uploadFile } from "@safer-streets/db";

export const action: ActionFunction = async ({ request, params }) => {
  if (!params.id) return null;
  const form = await request.formData();
  const data = form.get("update");

  if (typeof data !== "string") return null;
  const values = JSON.parse(data);

  const imageUrl = values.image ? await uploadFile(values.image) : undefined;
  await updateReport({ ...values, id: params.id }, imageUrl);
  return redirect(`/report/${params.id}`);
};

export default function ReportEdit() {
  return <ReportEditTemplate />;
}
