import { createPagesFunctionHandler } from "@remix-run/cloudflare-pages";
import * as build from "@remix-run/dev/server-build";
import {
  createCookie,
  createWorkersKVSessionStorage,
} from "@remix-run/cloudflare";

const sessionCookie = createCookie("__session", {
  sameSite: "strict",
  secure: true,
  maxAge: 604_800,
});

const handleRequest = createPagesFunctionHandler({
  build,
  mode: process.env.NODE_ENV,
  getLoadContext: (context) => {
    const sessionStorage = createWorkersKVSessionStorage({
      cookie: sessionCookie,
      kv: context.env.SESSIONS,
    });

    return { env: context.env, sessionStorage };
  },
});

export function onRequest(context) {
  return handleRequest(context);
}
