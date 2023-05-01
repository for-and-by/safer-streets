import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { commitSession, getSession } from "~/lib/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  session.unset("accessToken");

  return redirect("/login", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};
