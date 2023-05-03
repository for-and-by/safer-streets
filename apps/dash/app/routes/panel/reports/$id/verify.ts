import type {LoaderFunction} from '@remix-run/node';
import {redirect} from '@remix-run/node';

import {getCookieSession} from '~/lib/session.server';
import {getIsoNow} from '~/utils/date';

/*
 *  This endpoint updates the last_updated date on a report to keep it fresh
 * */

export const loader: LoaderFunction = async ({ params, request, context }) => {
  const session = await getCookieSession(request);
  const supabase = await context.getSupabase(session);

  const update = await supabase
    .from("reports")
    .update({ updated_at: getIsoNow() })
    .eq("id", params.id);

  if (update.error) throw update.error.message;

  return redirect(`/panel/reports/${params.id}`);
};
