import { getAssetFromKV } from "@cloudflare/kv-asset-handler";

interface Env {}

export default {
  async fetch(request: Request, env: Env, ctx) {
    try {
      return await getAssetFromKV({
        request,
        waitUntil(promise) {
          return ctx.waitUntil(promise);
        },
      });
    } catch (error) {
      let pathname = new URL(request.url).pathname;
      return new Response(`"${pathname}" not found`, {
        status: 404,
        statusText: "not found",
      });
    }
  },
};
