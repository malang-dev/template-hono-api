import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";

export function setupDocumentation(app: OpenAPIHono<Environment>) {
  app.doc("/openapi.json", {
    openapi: "3.0.0",
    info: {
      title: "Template Hono API",
      version: "1.0.0",
      description: `
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard 
dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently 
with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.


Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, 
making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the 
more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, 
discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" 
(The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. 
The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.


There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, 
by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, 
you need to be sure there isn't anything embarrassing hidden in the middle of text.
      `,
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
    tags: [
      {
        name: "Hello",
        description: "Description about hello tags",
      },
    ],
    "x-repository": "https://github.com/malang-dev/template-hono-api",
    "x-issues": "https://github.com/malang-dev/template-hono-api/issues",
  });

  app.get("/", swaggerUI({ url: "/openapi.json" }));
}
