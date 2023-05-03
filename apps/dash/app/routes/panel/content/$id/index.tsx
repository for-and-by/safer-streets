import React from "react";

import { Link, useLoaderData } from "@remix-run/react";

import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";

import { getCookieSession } from "~/lib/session.server";

import { formatMetadata } from "~/utils/seo";
import { parseDateAsString } from "~/utils/date";
import { parseImageUrl } from "~/utils/data";

export const meta: MetaFunction = ({ params }) => {
  return formatMetadata({
    title: `Report #${params.id}`,
  });
};

export const loader: LoaderFunction = async ({ request, params, context }) => {
  const session = await getCookieSession(request);
  const supabase = await context.getSupabase(session);

  const content = await supabase
    .from("reports_content")
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

  const isActiveContent = content.id === content.report.content_id;

  return (
    <div className="flex h-[100vh] flex-col divide-y divide-gray-100 overflow-y-scroll">
      <div className="flex flex-col gap-4 px-12 py-20">
        <Link
          to={`/panel/reports/${content.report_id}`}
          className="flex items-center gap-4"
        >
          <i className="icon icon-arrow-left" />
          <span>Go To Report</span>
        </Link>
        <div className="flex h-10 items-center gap-4">
          <h1 className="text-xl font-medium">Report Content #{content.id}</h1>
        </div>
        <div className="flex gap-4">
          {isActiveContent ? (
            <div className="flex h-8 items-center rounded bg-brand-700 px-2 text-white">
              <p className="text-sm font-medium">Active Content</p>
            </div>
          ) : (
            <>
              <Link
                to={`/panel/content/${content.id}/activate`}
                className="btn btn-light"
              >
                Make Active Content
              </Link>
              <Link
                to={`/panel/content/${content.id}/delete`}
                className="btn btn-light text-danger-700"
              >
                Delete Content
              </Link>
            </>
          )}
        </div>
        {isActiveContent ? (
          <div className="rounded bg-white p-8">
            <p className="font-medium">Note</p>
            <p className="max-w-2xl">
              Because this is active content, you cannot delete this. If you
              want to delete this piece of content, make another piece of
              content the active piece, or delete the whole report.
            </p>
          </div>
        ) : null}
      </div>
      <div className="flex flex-col gap-4 p-8">
        <p className="mb-2 ml-6 font-medium">Content</p>
        <div className="flex flex-col gap-4 bg-white p-8">
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
      </div>
      <div className="flex flex-col gap-4 p-8">
        <p className="mb-2 ml-6 font-medium">Metadata</p>
        <div className="flex flex-col gap-4 bg-white p-8">
          <div className="flex max-w-2xl gap-4">
            <p className="w-40 font-medium">Created On</p>
            <p>{parseDateAsString(content.created_at)}</p>
          </div>
          <div className="flex max-w-2xl gap-4">
            <p className="w-40 font-medium">Parent Report</p>
            <Link
              to={`/panel/reports/${content.report_id}`}
              className="border-b border-brand-700 text-brand-700"
            >
              #{content.report_id}
            </Link>
          </div>
          <div className="flex max-w-2xl gap-4">
            <p className="w-40 font-medium">Is Deleted</p>
            <p>{content.is_deleted ? "Yes" : "No"}</p>
          </div>
          <div className="flex max-w-2xl gap-4">
            <p className="w-40 font-medium">Is Expired</p>
            <p>{content.is_deleted ? "Yes" : "No"}</p>
          </div>
          <div className="flex max-w-2xl gap-4">
            <p className="w-40 font-medium">Is Active Content</p>
            <p>{isActiveContent ? "Yes" : "No"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
