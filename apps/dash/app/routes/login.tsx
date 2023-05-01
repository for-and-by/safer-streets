import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useNavigation } from "@remix-run/react";

import { SupabaseClient } from "@safer-streets/db";

import { formatMetadata } from "~/utils/seo";
import { commitSession, getSession } from "~/lib/session.server";

import Logo from "~/components/elements/logo";

export const meta = () => {
  return formatMetadata({
    title: "Login",
  });
};

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const accessToken = session.get("accessToken");
  const { data } = await SupabaseClient.auth.getUser(accessToken);

  if (data.user) {
    return redirect("/panel/reports");
  }

  return null;
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const email = form.get("email");
  const password = form.get("password");

  if (
    !email ||
    !password ||
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    return json({
      error: "Email or password did not get passed, or data type was incorrect",
    });
  }

  const { data, error } = await SupabaseClient.auth.signInWithPassword({
    email,
    password,
  });

  if (error)
    return json({
      error: error.message,
    });
  if (!data.session)
    return json({
      error: "Session was unable to be created or fetched",
    });

  const session = await getSession(request.headers.get("Cookie"));
  session.set("accessToken", data.session.access_token);

  return redirect("/panel/reports", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};

export default function Page() {
  const { state } = useNavigation();
  const data = useActionData<typeof action>();

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <div className="flex max-w-xl flex-col divide-y divide-gray-100 rounded bg-white">
        <div className="flex justify-between p-8">
          <h1 className="text-lg font-medium">Sign in</h1>
          <Logo />
        </div>
        <Form
          className="flex flex-col items-start gap-8 p-8"
          action="/login"
          method="post"
        >
          <div className="flex w-full flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="email"
              required
              className="rounded bg-gray-100 p-4"
              placeholder="email@example.com"
              autoComplete="username"
            />
          </div>
          <div className="flex w-full flex-col gap-2">
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="rounded bg-gray-100 p-4"
              placeholder=""
            />
          </div>
          {data?.error ? (
            <div className="flex w-full items-center justify-between gap-2 rounded bg-danger-100 p-4 text-danger-700">
              <p>{data.error}</p>
              <i className="icon icon-close" />
            </div>
          ) : null}
          {state === "submitting" ? (
            <div className="flex w-full items-center justify-between gap-2 rounded bg-gray-100 p-4 text-gray-700">
              <p>Logging you in</p>
              <i className="icon icon-spinner icon-is-spinning" />
            </div>
          ) : null}
          <button type="submit" className="btn btn-primary">
            Log In
          </button>
        </Form>
        <div className="p-8">
          <p className="text-sm text-gray-500">
            Don't have an account? Don't remember your password?{" "}
            <Link
              to="mailto://info@jtaccinelli.com.au"
              className="border-b border-black text-sm text-black"
            >
              Send an email
            </Link>{" "}
            with your email address for support.
          </p>
        </div>
      </div>
    </div>
  );
}
