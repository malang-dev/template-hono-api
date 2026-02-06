import { HelloRoute } from "@/routes/hello.route";

const defaultRoutes = [
  {
    path: `/api/v1`,
    route: HelloRoute,
  },
];
export const DefaultRoute = defaultRoutes;
