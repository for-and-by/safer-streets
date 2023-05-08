import type {LoaderFunction} from '@remix-run/node';
import {redirect} from '@remix-run/node';

import {getIsoNow} from '@safer-streets/utils';

import {getCookieHeaders, getCookieSession} from '~/lib/session.server';

/*
 *  This endpoint duplicates a row on 'reports_content' by ID,
 *  and then makes it the active content for its respective report
 * */

export const loader: LoaderFunction = async ({ params, request, context }) => {
  const session = await getCookieSession(request);
  const supabase = await context.getSupabase(session);

  // 1. Get row from 'report_content'
  const content = await supabase
    .from("reports_content")
    .select("*")
    .eq("id", params.id)
    .limit(1)
    .single();

  if (content.error) throw content.error;
  if (!content.data) throw `No content with id ${params.id} found.`;

  // 2. Create a clone of the data in 'report_content'
  const { id: _, created_at: __, ...clonedData } = content.data;

  const clone = await supabase
    .from("reports_content")
    .insert(clonedData)
    .select()
    .limit(1)
    .single();

  if (clone.error) throw clone.error;
  if (!clone.data) throw "No data was returned from content creation";

  // 3. Update the 'content_id' for the parent report
  const update = await supabase
    .from("reports")
    .update({
      content_id: clone.data.id,
      updated_at: getIsoNow(),
    })
    .eq("id", content.data.report_id);

  if (update.error) throw update.error;

  return redirect(`/panel/reports/${content.data.report_id}`, {
    headers: await getCookieHeaders(session),
  });
};
