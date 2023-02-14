import type { LoaderFunction } from "@remix-run/router";
import { json } from "@remix-run/cloudflare";

import { fetchReportSummary } from "~/lib/supabase";

export const loader: LoaderFunction = async ({ params }) => {
  if (!params.id) return null;
  const summary = await fetchReportSummary(params.id);
  return json({ summary });
};
