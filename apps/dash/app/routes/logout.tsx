import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { getCookieHeaders, getCookieSession } from "~/lib/session.server";

export const loader: LoaderFunction = async ({ request, context }) => {
  const session = await getCookieSession(request);
  const supabase = await context.getSupabase(session);

  await supabase.auth.signOut();

  return redirect("/login", {
    headers: await getCookieHeaders(session),
  });
};
