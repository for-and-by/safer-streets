import React from "react";
import { CreateTemplate } from "~/components/templates/create";
import CreateProvider from "~/components/templates/create/context";
import type { ActionFunction } from "@remix-run/router";
import { uploadFile, uploadReport } from "~/lib/supabase";
import type { FormValues } from "~/types/form";
import { redirect } from "@remix-run/cloudflare";

interface CreateResponse {
  success: boolean;
}

export function generateCreateResponse(success?: boolean): CreateResponse {
  return {
    success: success ?? false,
  };
}

export const action: ActionFunction = async ({ request }) => {
  const data = await request.formData();
  const create = data.get("create");

  if (typeof create !== "string") return generateCreateResponse();

  const values = JSON.parse(create) as FormValues;

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
