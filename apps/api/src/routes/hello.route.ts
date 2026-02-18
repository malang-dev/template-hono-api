import { HelloController } from "@/controllers/hello.controller";
import { ResponseSchema } from "@/utils/response";
import { StatusCodes } from "@/utils/status";
import { HelloValidation } from "@/validations/hello.validation";
import { createRoute, OpenAPIHono } from "@hono/zod-openapi";

const route = new OpenAPIHono<Environment>();

// Add the route
route.openapi(
  createRoute({
    summary: "Get hello",
    description: "Description about hello endopoint",
    tags: ["Hello"],
    method: "get",
    path: "/{parameter}",
    request: {
      params: HelloValidation.getHello,
    },
    responses: {
      [StatusCodes.OK]: ResponseSchema({
        name: "GetHelloResponse",
        description: "Success get hello",
      }),
    },
  }),
  HelloController.getHello,
);

export const HelloRoute = route;
