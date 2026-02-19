# Agent Guidelines for template-hono-api

## Build/Lint/Test Commands

**Root level (runs across all workspaces via Turbo):**

- `yarn build` - Build all packages/apps
- `yarn dev` - Start development mode for all apps
- `yarn lint` - Lint all packages/apps
- `yarn test` - Run all tests
- `yarn format` - Format all code with Prettier

**API app specific (in `apps/api/`):**

- `yarn build` - Build using tsup
- `yarn dev` - Run with nodemon (auto-rebuild on changes)
- `yarn start` - Start production server
- `yarn lint` - ESLint with auto-fix on src/\*_/_.ts
- `yarn format` - Prettier formatting
- `yarn test` - Run Jest tests
- `yarn test:cov` - Run tests with coverage
- `yarn test:watch` - Run tests in watch mode

**Run single test file:**

```bash
cd apps/api && yarn test -- path/to/file.test.ts
```

**Web app specific (in `apps/web/`):**

- `yarn dev` - Start Vite dev server (default port: 5173)
- `yarn build` - Type-check and build for production
- `yarn preview` - Preview production build
- `yarn lint` - ESLint with auto-fix on src/\*_/_.{ts,vue}
- `yarn format` - Prettier formatting
- `yarn test` - Run Vitest tests
- `yarn test:cov` - Run tests with coverage
- `yarn test:watch` - Run tests in watch mode

**Run single test file:**

```bash
cd apps/web && yarn test -- path/to/file.test.ts
```

## Code Style Guidelines

**Imports:**

- Use path aliases: `@/` for src directory imports (e.g., `@/utils/logger`)
- Organize imports: external packages first, then internal aliases
- Prettier plugin organizes imports automatically on format

**Formatting:**

- Double quotes for strings
- Trailing commas required
- 100 character print width
- 2 spaces indentation (no tabs)
- LF line endings

**Types:**

- Strict TypeScript enabled (but `strictNullChecks: false`, `strictFunctionTypes: false`)
- Explicit types optional (inferred types acceptable)
- `any` allowed but avoid when possible
- Use `zod` for runtime validation and OpenAPI schema generation
- Type definitions in `src/types/` directory

**Naming Conventions:**

- PascalCase for: classes, interfaces, types, enums, controllers, routes
- camelCase for: variables, functions, methods, properties
- UPPER_SNAKE_CASE for: constants, error codes
- Files: kebab-case for filenames (e.g., `hello.controller.ts`, `base.exception.ts`)
- Suffix pattern: `*.controller.ts`, `*.route.ts`, `*.middleware.ts`, `*.validation.ts`, `*.exception.ts`, `*.service.ts`

**Error Handling:**

- Extend `BaseException` (extends HTTPException) for custom errors
- Error codes in UPPER_SNAKE_CASE
- Use predefined exceptions: `BadRequestException`, `NotFoundException`, `InternalServerException`, `ServiceUnavailableException`
- Error responses follow `IExceptionMessage` format with code, message, stack

**API Patterns:**

- Use `OpenAPIHono` from `@hono/zod-openapi` for typed routes with OpenAPI
- Controllers export object with handler functions
- Routes use `createRoute()` with Zod schemas for validation
- Validation schemas in `src/validations/*.validation.ts`
- Use `ResponseFormat` class for consistent JSON responses
- Status codes from `StatusCodes` utility (mirrors HTTP status codes)

**Project Structure:**

```
apps/api/src/
  controllers/   # Request handlers (e.g., hello.controller.ts)
  routes/        # Route definitions with OpenAPI specs
  middlewares/   # Hono middleware functions
  validations/   # Zod validation schemas
  exceptions/    # Custom exception classes
  services/      # Business logic services
  utils/         # Utility functions and helpers
  types/         # TypeScript type definitions
  databases/     # Database layer with Drizzle ORM
    connection.ts    # Database connection and schema exports
    schemas/         # Table definitions and relations
    migrate.ts       # Migration runner
    seed.ts          # Seed data for initial population
    utils.ts         # Database utilities (pagination, helpers)
```

**Web app project structure:**

```
apps/web/src/
  assets/        # Static assets (CSS, images)
  components/    # Reusable Vue components
  views/         # Page-level components (routed views)
  router/        # Vue Router configuration
  stores/        # Pinia stores for state management
  App.vue        # Root component
  main.ts        # Application entry point
  env.d.ts       # Environment type declarations
```

**Environment Variables:**

- `NODE_ENV` - Environment (development, production, demo)
- `PORT` - Server port (default: 3000)

**Database:**

- Uses Drizzle ORM with LibSQL (SQLite) as sample configuration
- Drizzle supports all major SQL databases: PostgreSQL, MySQL, SQLite, MSSQL, CockroachDB, SingleStore, and cloud providers (Neon, Supabase, Turso, PlanetScale, Cloudflare D1, AWS Data API, etc.)
- Schemas defined in `src/databases/schemas/*.schema.ts` using appropriate table builder (e.g., `sqliteTable`, `pgTable`, `mysqlTable`)
- Relations defined with `relations()` function and exported as `*Relation`
- Type inference: `typeof table.$inferSelect` and `typeof table.$inferInsert`
- Connection in `src/databases/connection.ts` exports `db` instance and `dbSchema`
- Migrations run from `drizzle/` folder via `src/databases/migrate.ts`
- Seed data in `src/databases/seed.ts` with `runSeed()` function
- Utilities in `src/databases/utils.ts`: `takeFirstOrNull`, `takeFirstOrThrow`, `withPagination`, `buildConflictUpdateColumns`, `getTableColumnsExcept`, `jsonBuildObject`, `jsonAgg`
- Use `db.transaction()` for multi-table operations with rollback support

**Testing:**

- Jest with ts-jest for TypeScript
- Test files: `*.test.ts` pattern
- Test environment: node
- Coverage collected from all .ts/.js files

**Monorepo:**

- Yarn workspaces with Turbo
- Shared packages in `packages/`: eslint-config, typescript-config
- Apps in `apps/`: api (Hono API), web (Vue.js)
- Workspace references: `@malang-dev/*`

**Pre-commit Hooks:**

- Husky runs lint-staged
- ESLint --fix and Prettier --write on staged files
