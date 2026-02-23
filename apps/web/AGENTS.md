# Agent Guidelines for Web App

## Build/Lint/Test Commands

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
yarn test -- path/to/file.test.ts
```

## Project Structure

```
src/
  assets/        # Static assets (CSS, images)
  components/    # Reusable Vue components
  views/         # Page-level components (routed views)
  router/        # Vue Router configuration
  stores/        # Pinia stores for state management
  lib/           # Utility functions
  App.vue        # Root component
  main.ts        # Application entry point
  env.d.ts       # Environment type declarations
```

## Libraries

- **Vue.js 3** - Main frontend framework with Composition API
- **Vue Router** - Official router for Vue.js
- **Pinia** - State management (replaces Vuex)
- **VueUse** - Collection of Vue composition utilities
- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix Vue** - Unstyled, accessible UI components
- **Lucide Vue Next** - Icon library
- **Vite** - Build tool and dev server
- **Vitest** - Unit testing framework
- **class-variance-authority** - Utility for creating variant-based component classes
- **clsx** / **tailwind-merge** - Utility for merging Tailwind classes

## Testing

- Vitest with happy-dom
- Test files: `*.test.ts` pattern
- Coverage collected from all .ts/.js/.vue files
