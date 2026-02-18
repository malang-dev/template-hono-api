import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "turso",
  verbose: true,
  schema: "./src/databases/schemas",
  out: "./drizzle",
  dbCredentials: {
    url: "file:local.db",
  },
});
