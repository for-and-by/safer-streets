import type { AppLoadContext, SessionStorage } from "@remix-run/cloudflare";

export function session(context: AppLoadContext) {
  return context.sessionStorage as SessionStorage;
}
