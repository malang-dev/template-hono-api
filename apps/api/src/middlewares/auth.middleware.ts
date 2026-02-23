import { auth } from "@/utils/auth";
import { Context, MiddlewareHandler } from "hono";

export function authSessionMiddleware(): MiddlewareHandler {
  return async function createMiddleware(ctx: Context<Environment>, next) {
    const session = await auth.api.getSession({ headers: ctx.req.raw.headers });

    if (!session) {
      ctx.set("user", null);
      ctx.set("session", null);
      await next();
      return;
    }

    ctx.set("user", session.user);
    ctx.set("session", session.session);
    await next();
  };
}
