import React from "react";

import type { ActionFunction, MetaFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import type { FormCreateValues } from "@safer-streets/db";
import { uploadFile, uploadReport } from "@safer-streets/db";

import CreateTemplate from "~/components/templates/create";
import CreateProvider from "~/components/templates/create/context";
import { formatMetadata } from "~/utils/seo";

export const meta: MetaFunction = () => {
  return formatMetadata({
    title: "Create New Report",
  });
};

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
