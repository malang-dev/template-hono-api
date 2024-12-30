// deno-lint-ignore-file
declare module "hono" {
  interface ContextVariableMap {
    requestId: string;
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
