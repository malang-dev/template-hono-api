import z from "zod";

const helloWorld = z.object({
  parameter: z.string().min(1, "World is required"),
});

export const HelloValidation = {
  helloWorld,
};
