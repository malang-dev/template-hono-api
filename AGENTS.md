# Agent Guidelines for template-nodejs

## Build/Lint/Test Commands (Root)

- `yarn build` - Build all packages/apps
- `yarn dev` - Start development mode for all apps
- `yarn lint` - Lint all packages/apps
- `yarn test` - Run all tests
- `yarn format` - Format all code with Prettier

## App-specific Guidelines

- **API App** (`apps/api/`) - See [apps/api/AGENTS.md](apps/api/AGENTS.md)
- **Web App** (`apps/web/`) - See [apps/web/AGENTS.md](apps/web/AGENTS.md)

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
- Use `zod` for runtime validation and OpenAPI schema generation (API only)

**Naming Conventions:**

- PascalCase for: classes, interfaces, types, enums, controllers, routes
- camelCase for: variables, functions, methods, properties
- UPPER_SNAKE_CASE for: constants, error codes
- Files: kebab-case for filenames (e.g., `hello.controller.ts`, `base.exception.ts`)
- Suffix pattern (API): `*.controller.ts`, `*.route.ts`, `*.middleware.ts`, `*.validation.ts`, `*.exception.ts`, `*.service.ts`

## Monorepo

- Yarn workspaces with Turbo
- Shared packages in `packages/`: eslint-config, typescript-config
- Apps in `apps/`: api (Hono API), web (Vue.js)
- Workspace references: `@malang-dev/*`

## Pre-commit Hooks

- Husky runs lint-staged
- ESLint --fix and Prettier --write on staged files
