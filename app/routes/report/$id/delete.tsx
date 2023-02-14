import type { ActionFunction } from "@remix-run/router";
import { deleteReport } from "~/lib/supabase";
import { redirect } from "@remix-run/cloudflare";

export const action: ActionFunction = async ({ params }) => {
  if (!params.id) return null;
  await deleteReport(parseInt(params.id));
  return redirect("/");
};
