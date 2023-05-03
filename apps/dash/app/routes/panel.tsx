import type { LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

import { formatMetadata } from "~/utils/seo";

import Navigation from "~/components/globals/navigation";
import { getCookieHeaders, getCookieSession } from "~/lib/session.server";

export const meta = () => {
  return formatMetadata({
    title: "Admin Panel",
  });
};

export const loader: LoaderFunction = async ({ request, context }) => {
  const session = await getCookieSession(request);
  const supabase = await context.getSupabase(session);

  const { data, error } = await supabase.auth.getSession();

  if (error) {
    throw new Error(error.message);
  }

  if (!data.session) {
    return redirect("/login", {
      headers: await getCookieHeaders(session),
    });
  }

  return json({});
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
