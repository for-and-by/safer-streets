import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { deleteReport } from "@safer-streets/db";

export const action: ActionFunction = async ({ params }) => {
  if (!params.id) return null;
  await deleteReport(parseInt(params.id));
  return redirect("/");
};
