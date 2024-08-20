import { demo } from "@/middlewares/demo.middleware";
import { errorHandler, notFoundHandler } from "@/middlewares/error.middleware";
import { DefaultRoute } from "@/routes/base.route";
import { swaggerUI } from "@hono/swagger-ui";
import { existsSync, readFileSync } from "fs";
import { Context, Hono } from "hono";
import { logger } from "hono-pino";
import { cors } from "hono/cors";
import { prettyJSON } from "hono/pretty-json";
import { serveStatic } from "hono/serve-static";

const app = new Hono();
// middleware
app.use("*", cors());
app.use("*", prettyJSON());
app.use(
  "*",
  logger({
    http: {
      reqId: false,
      onReqBindings(ctx: Context) {
        const reqId = crypto.randomUUID();
        ctx.header("X-Request-ID", reqId);
        return {
          req: {
            url: ctx.req.path,
            method: ctx.req.method,
            headers: ctx.req.header(),
          },
          reqId,
        };
      },
    },
  }),
);
app.use("/api/*", demo({ enable: process.env.NODE_ENV == "demo" }));
app.use(
  "/static/*",
  serveStatic({
    root: "./",
    getContent: async (path) => {
      path = !existsSync(path) ? "static/index.html" : path;
      return readFileSync(path);
    },
  }),
);
app.get(
  "/",
  swaggerUI({
    url: "/static/openapi.yaml",
  }),
);

// errors handler
app.onError(errorHandler);
app.notFound(notFoundHandler);

DefaultRoute.forEach((route) => {
  app.route(`${route.path}`, route.route);
});

export default app;
