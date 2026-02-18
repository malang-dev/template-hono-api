import { auth } from "@/utils/auth";
import { OpenAPIHono } from "@hono/zod-openapi";

const route = new OpenAPIHono<Environment>();

route.on(["POST", "GET"], "/**", (c) => auth.handler(c.req.raw));

export const AuthRoute = route;
