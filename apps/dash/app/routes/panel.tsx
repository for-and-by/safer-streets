import type { LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

import { SupabaseClient } from "@safer-streets/db";

import { formatMetadata } from "~/utils/seo";
import { commitSession, getSession } from "~/lib/session.server";

import Navigation from "~/components/globals/navigation";

export const meta = () => {
  return formatMetadata({
    title: "Admin Panel",
  });
};

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const accessToken = session.get("accessToken");

  if (!accessToken) {
    return redirect("/login", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  const { data, error } = await SupabaseClient.auth.getUser(accessToken);

  if (error || !data?.user) {
    console.log("unsetting access token");
    session.unset("accessToken");
    return redirect("/login", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  return json({
    user: data.user,
  });
};

export default function Page() {
  return (
    <div className="grid h-full w-full grid-cols-12 bg-gray-50">
      <div className="col-span-3 w-full bg-white">
        <Navigation />
      </div>
      <div className="col-span-9">
        <Outlet />
      </div>
    </div>
  );
}
