import type {LoaderFunction} from '@remix-run/node';
import {redirect} from '@remix-run/node';

import {getCookieSession} from '~/lib/session.server';
import {getIsoNow} from '@safer-streets/utils';

/*
 *  This endpoint updates the last_updated date on a report to keep it fresh
 * */

export const loader: LoaderFunction = async ({ params, request, context }) => {
  const session = await getCookieSession(request);
  const supabase = await context.getSupabase(session);

  const report = await supabase
    .from("reports")
    .select("content_id")
    .eq("id", params.id)
    .limit(1)
    .single();

  if (report.error) throw report.error.message;
  if (!report.data) throw `No report with id ${params.id} found`;

  const update = await supabase
    .from("reports_content")
    .update({ verified_at: getIsoNow() })
    .eq("id", report.data.content_id);

  if (update.error) throw update.error.message;

  return redirect(`/panel/reports/${params.id}`);
};
