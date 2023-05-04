import { installGlobals } from "@remix-run/node";
import { createRequestHandler } from "@remix-run/netlify";
import * as build from "@remix-run/dev/server-build";

import { createSupabaseClient } from "@safer-streets/db";

installGlobals();

function getSupabase() {
  return createSupabaseClient();
}

export const appLoadContext = {
  getSupabase,
} as const;

export const handler = createRequestHandler({
  build,
  getLoadContext: () => appLoadContext,
  mode: process.env.NODE_ENV,
});
