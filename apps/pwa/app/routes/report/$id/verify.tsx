import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import getIsoNow from "~/utils/date";

/*
 *   This loader updates the `updated_at` column on a report to ammend it expiring
 * */

export const action: ActionFunction = async ({ params, context }) => {
  const supabase = await context.getSupabase();

  const update = await supabase
    .from("reports")
    .update({ updated_at: getIsoNow() })
    .eq("id", params.id);

  if (update.error) throw update.error.message;

  return redirect(`/`);
};
