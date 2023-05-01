import { createCookie, createCookieSessionStorage } from "@remix-run/node";

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: createCookie("__session", {
      secrets: ["r3m1xr0ck5"],
      sameSite: "lax",
    }),
  });

export { getSession, commitSession, destroySession };
