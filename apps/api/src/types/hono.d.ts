// deno-lint-ignore-file
import { auth } from "@/utils/auth";

declare module "hono" {
  interface ContextVariableMap {
    requestId: string;
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
