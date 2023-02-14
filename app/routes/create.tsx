import React from "react";

import type { ActionFunction, MetaFunction } from "@remix-run/cloudflare";
import { redirect } from "@remix-run/cloudflare";

import { config } from "~/config";

import { uploadFile, uploadReport } from "~/lib/supabase";
import type { FormCreateValues } from "~/types/form";

import CreateTemplate from "~/components/templates/create";
import CreateProvider from "~/components/templates/create/context";

export const meta: MetaFunction = () => ({
  title: "Create New Report | " + config.seo.default.title,
  description: config.seo.default.description,
});

export const action: ActionFunction = async ({ request }) => {
  const data = await request.formData();
  const create = data.get("create");

  if (typeof create !== "string") return null;

  const values = JSON.parse(create) as FormCreateValues;

  try {
    const imageUrl = await uploadFile(values.image);
    await uploadReport(values, imageUrl);
  } catch (error) {
    throw error;
  }

  return redirect("/");
};

export default function Home() {
  return (
    <CreateProvider>
      <CreateTemplate />
    </CreateProvider>
  );
}
