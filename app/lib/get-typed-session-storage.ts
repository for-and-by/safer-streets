import type { AppLoadContext, SessionStorage } from "@remix-run/cloudflare";

export function getTypedSessionStorage(context: AppLoadContext) {
  return context.sessionStorage as SessionStorage;
}
