import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { getCookieHeaders, getCookieSession } from "~/lib/session.server";

/*
 *  This endpoint permanently deletes a row from 'reports_content' by its id
 * */

export const loader: LoaderFunction = async ({ params, request, context }) => {
  const session = await getCookieSession(request);
  const supabase = await context.getSupabase(session);

  // Delete the row from report content
  const { data, error } = await supabase
    .from("reports_content")
    .delete()
    .eq("id", params.id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  // If no report_id was returned, return to panel
  if (!data.report_id) {
    return redirect(`/panel/reports`, {
      headers: await getCookieHeaders(session),
    });
  }

  // Else, return to report
  return redirect(`/panel/reports/${data.report_id}`, {
    headers: await getCookieHeaders(session),
  });
};
