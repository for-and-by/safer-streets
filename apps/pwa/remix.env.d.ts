/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/node" />

import type { appLoadContext } from "./server";

export * from "@remix-run/server-runtime";

declare module "@remix-run/server-runtime" {
  type TypedContext = typeof appLoadContext;

  interface AppLoadContext extends TypedContext {}
}
