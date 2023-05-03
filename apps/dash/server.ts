import { installGlobals } from "@remix-run/node";
import { createRequestHandler } from "@remix-run/netlify";
import * as build from "@remix-run/dev/server-build";

import { createSupabaseClient } from "@safer-streets/db";

import type { CookieSession } from "~/lib/session.server";
import { createCookieWebStorage } from "~/lib/session.server";

installGlobals();

async function getSupabase(session: CookieSession) {
  return createSupabaseClient({
    auth: {
      storage: createCookieWebStorage(session),
      persistSession: true,
      detectSessionInUrl: false,
    },
  });
}

export const appLoadContext = {
  getSupabase,
} as const;

export const handler = createRequestHandler({
  build,
  mode: process.env.NODE_ENV,
  getLoadContext: () => appLoadContext,
});
