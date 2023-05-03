import { createCookie, createCookieSessionStorage } from "@remix-run/node";

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: createCookie("__session", {
      secrets: ["r3m1xr0ck5"],
      sameSite: "lax",
    }),
  });

export { getSession, commitSession, destroySession };

export type CookieSession = Awaited<ReturnType<typeof getSession>>;

export async function getCookieSession(request: Request) {
  return await getSession(request.headers.get("cookie"));
}

export async function getCookieHeaders(session: CookieSession) {
  const response = new Response();
  response.headers.set("set-cookie", await commitSession(session));
  return response.headers;
}

export function createCookieWebStorage(session: CookieSession): Storage {
  let length = 0;
  const keys = new Set<string>();

  return {
    getItem(key) {
      const value = session.get(key);
      return value ?? null;
    },
    removeItem(key) {
      session.unset(key);
      keys.delete(key);
      length -= 1;
    },
    setItem(key, value) {
      session.set(key, value);
      keys.add(key);
      length += 1;
    },
    async clear() {
      await destroySession(session);
    },
    key(index) {
      return Array.from(keys)[index];
    },
    length,
  };
}

export async function createCookieResponse(
  session: CookieSession,
  init?: ResponseInit
) {
  const response = new Response(null, init);
  response.headers.set("set-cookie", await commitSession(session));
  return response;
}
