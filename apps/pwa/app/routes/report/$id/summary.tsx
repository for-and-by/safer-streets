import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

import { fetchReportSummary } from "@safer-streets/db";

export const loader: LoaderFunction = async ({ params }) => {
  if (!params.id) return null;
  const summary = await fetchReportSummary(params.id);
  return json({ summary });
};
