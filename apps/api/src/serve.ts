import { default as app } from "@/main";
import { serve } from "@hono/node-server";

const cwd = process.cwd();

serve(
  {
    fetch: app.fetch,
    port: parseInt(process.env.PORT) || 3000,
  },
  (info) => {
    console.log(`Running on ${info.address}:${info.port} in directory ${cwd}`);
  },
);
