import { demo } from "@/middlewares/demo.middleware";
import { errorHandler, notFoundHandler } from "@/middlewares/error.middleware";
import { loggerMiddleware } from "@/middlewares/logger.middleware";
import { DefaultRoute } from "@/routes/base.route";
import { setupDocumentation } from "@/utils/docs";
import { OpenAPIHono } from "@hono/zod-openapi";
import { existsSync, readFileSync } from "fs";
import { contextStorage } from "hono/context-storage";
import { cors } from "hono/cors";
import { prettyJSON } from "hono/pretty-json";
import { serveStatic } from "hono/serve-static";

const app = new OpenAPIHono<Environment>();
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
setupDocumentation(app);

// errors handler
app.onError(errorHandler);
app.notFound(notFoundHandler);

DefaultRoute.forEach((route) => {
  app.route(`${route.path}`, route.route);
});

export default app;
