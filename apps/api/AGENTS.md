# Agent Guidelines for API App

## Build/Lint/Test Commands

- `yarn build` - Build using tsup
- `yarn dev` - Run with nodemon (auto-rebuild on changes)
- `yarn start` - Start production server
- `yarn lint` - ESLint with auto-fix on src/\*_/_.ts
- `yarn format` - Prettier formatting
- `yarn test` - Run Jest tests
- `yarn test:cov` - Run tests with coverage
- `yarn test:watch` - Run tests in watch mode
- `yarn db:generate` - Generate Drizzle migrations
- `yarn db:migrate` - Run Drizzle migrations
- `yarn db:push` - Push schema changes to database
- `yarn db:studio` - Open Drizzle Studio

**Run single test file:**

```bash
yarn test -- path/to/file.test.ts
```

## Project Structure

```
src/
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

## Libraries

- **Hono** - Fast, lightweight web framework
- **@hono/node-server** - Node.js adapter for Hono
- **@hono/zod-openapi** - OpenAPI integration with Zod validation
- **@hono/swagger-ui** - Swagger UI for API documentation
- **Zod** - TypeScript-first schema validation
- **Drizzle ORM** - TypeScript ORM for SQL databases
- **Winston** - Logging library
- **Jest** - Testing framework
- **tsup** - TypeScript bundler

## API Patterns

- Use `OpenAPIHono` from `@hono/zod-openapi` for typed routes with OpenAPI
- Controllers export object with handler functions
- Routes use `createRoute()` with Zod schemas for validation
- Validation schemas in `src/validations/*.validation.ts`
- Use `ResponseFormat` class for consistent JSON responses
- Status codes from `StatusCodes` utility (mirrors HTTP status codes)

## Error Handling

- Extend `BaseException` (extends HTTPException) for custom errors
- Error codes in UPPER_SNAKE_CASE
- Use predefined exceptions: `BadRequestException`, `NotFoundException`, `InternalServerException`, `ServiceUnavailableException`
- Error responses follow `IExceptionMessage` format with code, message, stack

## Database

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

## Environment Variables

- `NODE_ENV` - Environment (development, production, demo)
- `PORT` - Server port (default: 3000)

## Testing

- Jest with ts-jest for TypeScript
- Test files: `*.test.ts` pattern
- Test environment: node
- Coverage collected from all .ts/.js files
