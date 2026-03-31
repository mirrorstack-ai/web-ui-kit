# @mirrorstack-ai/web-ui-kit

React UI component library with Storybook, Tailwind CSS v4, and Material Design 3.

## Commands

```bash
pnpm storybook                    # Run Storybook dev server
pnpm build-storybook              # Build static Storybook
pnpm test                         # Run tests
pnpm typecheck                    # Type check
pnpm components list              # List all components with descriptions
pnpm components get <path|name>   # Show component props, story, and usage
pnpm components validate          # Validate all components have metadata
pnpm start-issue <number>         # Create branch from issue and checkout
```

## Before using a component

Run `pnpm components list` to see what's available. Run `pnpm components get <name>` to see props, default args, and import path.

## Structure

```
src/components/ui/<category>/<component>/    UI components
src/components/layout/<category>/<layout>/   Page layouts
src/context/<context>/                       Providers
src/hooks/                                   Hooks
src/utils/                                   Helpers
```

## Conventions

- Import alias: `@/` maps to `src/`
- Every component must export `meta: ComponentMeta` with `name` and `description`
- No `"use client"` in component files
- Use `cn()` from `@/utils/cn` for class merging
- Use `isDev` / `isProd` from `@/utils/env` for environment checks — never use raw strings
- Add dev-only warnings: `if (isDev) { console.warn("[ComponentName] message"); }` for accessibility, invalid props, wrong usage
- See CONTRIBUTING.md for full details
