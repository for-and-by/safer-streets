import type {LoaderFunction} from '@remix-run/node';
import {redirect} from '@remix-run/node';

import {getCookieHeaders, getCookieSession} from '~/lib/session.server';

/*
 *  This endpoint deletes a row from 'reports'
 *  and all related 'report_content'
 * */

export const loader: LoaderFunction = async ({ params, request, context }) => {
  const session = await getCookieSession(request);
  const supabase = await context.getSupabase(session);

  // 1. Clear the content_id from the target report row
  const update = await supabase
    .from("reports")
    .update({ content_id: null })
    .eq("id", params.id)
    .single();

  if (update.error) throw update.error.message;

  // 2. Delete all content rows related to the report
  const content = await supabase
    .from("reports_content")
    .delete()
    .match({ report_id: params.id });

  if (content.error) throw content.error.message;

  // 3. Delete the actual report
  const report = await supabase
    .from("reports")
    .delete()
    .match({ id: params.id });

  if (report.error) throw new Error(report.error.message);

  return redirect(`/panel/reports`, {
    headers: await getCookieHeaders(session),
  });
};
