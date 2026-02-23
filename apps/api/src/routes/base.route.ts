import { AuthRoute } from "@/routes/auth.route";
import { HelloRoute } from "@/routes/hello.route";
import { Hono } from "hono";

const defaultRoutes: {
  path: string;
  route: Hono<Environment>;
}[] = [
  {
    path: "/api/auth",
    route: AuthRoute,
  },
  {
    path: "/api/hello",
    route: HelloRoute,
  },
];

export const DefaultRoute = defaultRoutes;
