import { getLogger } from "@/utils/logger";
import { type Context, MiddlewareHandler } from "hono";
import { v7 } from "uuid";

export function loggerMiddleware(): MiddlewareHandler {
  const onRequestData = (ctx: Context): any => ({ url: ctx.req.path, method: ctx.req.method });
  const onResponsData = (ctx: Context): any => ({
    status: ctx.res.status,
    headers: ctx.res.headers,
  });
  return async function createMiddleware(ctx, next) {
    const reqId = v7();
    ctx.set("requestId", reqId);
    ctx.header("x-request-id", reqId);

    const log = getLogger("http");
    const req = onRequestData(ctx);
    log.info(`Request starting: ${req.method} ${req.url}`);

    await next();

    const res = onResponsData(ctx);
    log.info(`Request complete: ${req.method} ${req.url} ${res.status}`);
  };
}
