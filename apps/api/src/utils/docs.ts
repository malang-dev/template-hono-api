import { OpenAPIHono } from "@hono/zod-openapi";
import { Scalar } from "@scalar/hono-api-reference";

export function setupDocumentation(app: OpenAPIHono<Environment>) {
  app.doc("/openapi.json", {
    openapi: "3.0.0",
    info: {
      title: "Template Hono API",
      version: "1.0.0",
      description: "API Reference for Template Hono Instance",
      contact: {
        name: "API Support",
        url: "https://github.com/malang-dev/template-hono-api",
      },
      license: {
        name: "MIT",
        url: "https://github.com/malang-dev/template-hono-api/blob/main/LICENSE",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: [
      {
        name: "Hello",
        description: "Description about hello tags",
      },
    ],
    "x-repository": "https://github.com/malang-dev/template-hono-api",
    "x-issues": "https://github.com/malang-dev/template-hono-api/issues",
  });

  app.openAPIRegistry.registerComponent("securitySchemes", "bearerAuth", {
    type: "http",
    scheme: "bearer",
    bearerFormat: "JWT",
    description: "JWT Authentication",
  });

  app.get(
    "/",
    Scalar({
      pageTitle: "API Documentation",
      sources: [
        { url: "/openapi.json", title: "Common API" },
        { url: "/api/auth/open-api/generate-schema", title: "Authentication" },
      ],
    }),
  );
}
