import type { ActionFunction } from "@remix-run/router";
import { verifyReport } from "@safer-streets/db";
import { redirect } from "@remix-run/node";

export const action: ActionFunction = async ({ params }) => {
  if (!params.id) return null;
  await verifyReport(parseInt(params.id));
  return redirect("/");
};
