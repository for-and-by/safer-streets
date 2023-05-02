import React from "react";

import { useLoaderData } from "@remix-run/react";

import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";

import { SupabaseClient } from "@safer-streets/db";

import { formatMetadata } from "~/utils/seo";
import { parseDateAsString } from "~/utils/date";
import { parseImageUrl } from "~/utils/data";

export const meta: MetaFunction = ({ params }) => {
  return formatMetadata({
    title: `Report #${params.id}`,
  });
};

export const loader: LoaderFunction = async ({ params }) => {
  const content = await SupabaseClient.from("reports_content")
    .select("*, report:report_id(content_id)")
    .eq("id", params.id)
    .single();

  if (!content.data) return redirect("/panel/content");

  return json({
    content: content.data,
  });
};

export default function Page() {
  const { content } = useLoaderData<typeof loader>();

  return (
    <div className="flex h-[100vh] flex-col divide-y divide-gray-100 overflow-y-scroll">
      <div className="flex justify-between gap-4 px-12 py-20">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-medium">Report Content #{content.id}</h1>
          {content.id === content.report.content_id ? (
            <div className="flex h-8 items-center rounded bg-brand-700 px-2 text-white">
              <p className="text-sm font-medium">Active Content</p>
            </div>
          ) : null}
        </div>
      </div>
      <div className="p-8">
        <div className="flex flex-col divide-y divide-gray-100 bg-white">
          <div className="flex flex-col gap-4 p-8">
            <p className="font-medium">Content</p>
            <div className="flex max-w-2xl gap-4">
              <p className="w-40 font-medium">Details</p>
              <p>{content.details}</p>
            </div>
            <div className="flex gap-4">
              <p className="w-40 font-medium">Image</p>
              {content.image_url ? (
                <img
                  src={parseImageUrl(content.image_url)}
                  alt="Content"
                  className="max-h-56"
                />
              ) : null}
            </div>
          </div>
          <div className="flex flex-col gap-4 p-8">
            <p className="font-medium">Metadata</p>
            <div className="flex max-w-2xl gap-4">
              <p className="w-40 font-medium">Created On</p>
              <p>{parseDateAsString(content.created_at)}</p>
            </div>
            <div className="flex max-w-2xl gap-4">
              <p className="w-40 font-medium">Is Deleted</p>
              <p>{content.is_deleted ? "Yes" : "No"}</p>
            </div>
            <div className="flex max-w-2xl gap-4">
              <p className="w-40 font-medium">Is Active Content</p>
              <p>{content.id === content.report.content_id ? "Yes" : "No"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
