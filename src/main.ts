import { demo } from "@/middlewares/demo.middleware";
import { errorHandler, notFoundHandler } from "@/middlewares/error.middleware";
import { loggerMiddleware } from "@/middlewares/logger.middleware";
import { DefaultRoute } from "@/routes/base.route";
import { swaggerUI } from "@hono/swagger-ui";
import { existsSync, readFileSync } from "fs";
import { Hono } from "hono";
import { contextStorage } from "hono/context-storage";
import { cors } from "hono/cors";
import { prettyJSON } from "hono/pretty-json";
import { serveStatic } from "hono/serve-static";

const app = new Hono<Environment>();
const isDemo = process.env.NODE_ENV == "demo";

// middleware
app.use("*", cors());
app.use("*", prettyJSON());
app.use("*", contextStorage(), loggerMiddleware());

// is demo ?
app.use("/api/*", demo({ enable: isDemo }));

// serve static files and swagger ui
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
