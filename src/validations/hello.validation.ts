import { z } from "@hono/zod-openapi";

const getHello = z.object({
  parameter: z
    .string()
    .min(1, "World is required")
    .openapi({
      param: {
        name: "parameter",
        in: "path",
      },
      example: "World",
      description: "Default parameter for hello endpoint",
    }),
});

export const HelloValidation = {
  getHello,
};
