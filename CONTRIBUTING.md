# Contributing to @mirrorstack-ai/web-ui-kit

## Getting started

```bash
git clone git@github.com:mirrorstack-ai/web-ui-kit.git
cd web-ui-kit
pnpm install
pnpm storybook
```

Storybook opens at [http://localhost:6006](http://localhost:6006).

Questions? Join us on [Slack](https://mirrorstackai.slack.com).

## Branch naming

```
feat/WUK-{number}_{slug}       New component or feature
refactor/WUK-{number}_{slug}   Restructuring existing code
fix/WUK-{number}_{slug}        Bug fix
chore/WUK-{number}_{slug}      Deps, config, CI
```

Append `/agent` when the work is done by an AI agent:

```
feat/WUK-{number}_{slug}/agent
fix/WUK-{number}_{slug}/agent
```

Examples: `feat/WUK-1_avatar-component`, `refactor/WUK-15_consolidate-inputs`, `fix/WUK-18_badge-dark-mode/agent`

## Labels

| Category | Labels |
|----------|--------|
| Work | `feature` `bug` `test` `docs` `refactor` `chore` |
| Priority | `p0:critical` `p1:high` `p2:medium` `p3:low` |
| Size | `size:xs` `size:s` `size:m` `size:l` |
| Status | `blocked` `needs triage` |
| Contributor | `good first issue` `help wanted` |

Look for issues labeled [`good first issue`](https://github.com/mirrorstack-ai/web-ui-kit/issues?q=is%3Aopen+label%3A%22good+first+issue%22) to get started.

## PR workflow

1. Start work from an issue:
   ```bash
   pnpm start-issue <number>
   ```
   This auto-creates and checks out a branch with the correct naming convention (e.g. `feat/WUK-1_progress-indicator`), linked to the issue.
2. Make changes, ensure Storybook renders correctly
3. Push and open a PR — a Storybook preview link is auto-posted
4. PR requires maintainer review before merge
5. Squash merge to `main`

See [PR #2](https://github.com/mirrorstack-ai/web-ui-kit/pull/2) for an example of a good component PR.

## Adding a UI component

### 1. Create the folder

```
src/components/ui/<category>/<component>/
  Component.tsx
  Component.stories.tsx
  Component.test.tsx
```

Categories: `actions`, `inputs`, `feedback`, `navigation`, `surfaces`, `media`, `data`, `files`, `state`

### 2. Write the component

Every component must export a `meta` object with `name` and `description`. This is validated in CI.

```tsx
import { cn } from "@/utils/cn";
import type { ComponentMeta } from "@/types/component-meta";

export const meta: ComponentMeta = {
  name: "Button",
  description: "Multi-variant button with icons and loading state",
};

export interface ButtonProps {
  // ...
}

export function Button({ className, ...props }: ButtonProps) {
  return (
    <button className={cn("...", className)} {...props} />
  );
}
```

Rules:
- **Export `meta`** — required, validated by `pnpm components validate`
- **No `"use client"`** — the consuming app decides the boundary
- **Use `@/` path alias** for imports (e.g. `@/utils/cn`)
- **Use `cn()`** for class merging (clsx + tailwind-merge)
- **Use Material Symbols Rounded** for icons (`<span className="material-symbols-rounded">icon_name</span>`)
- **Export the props interface** alongside the component
- **Use `ENV` for environment checks** — never use raw `"production"` / `"development"` strings:
  ```tsx
  import { ENV } from "@/utils/env";

  // dev-only warnings
  if (process.env.NODE_ENV === ENV.DEV) {
    console.warn("[ComponentName] helpful warning message");
  }

  // production guard
  if (process.env.NODE_ENV === ENV.PROD) return null;
  ```

### 3. Write the story

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "UI/<Category>/<Component>",
  component: Button,
  args: { /* default props */ },
  argTypes: { /* controls */ },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Playground: Story = {};
```

- Title format: `UI/<Category>/<Component>` (e.g. `UI/Actions/Button`)
- Always include a `Playground` story with args for interactive controls
- Add showcase stories (Variants, Sizes, etc.) that spread `{...args}` so controls still work

### 4. Write the test

Test components that have logic (state, handlers, conditional rendering). Skip simple wrappers.

```tsx
import { render, screen } from "@testing-library/react";
import { Button } from "./Button";

test("renders children", () => {
  render(<Button>Click me</Button>);
  expect(screen.getByText("Click me")).toBeInTheDocument();
});
```

### 5. Export from index.ts

```ts
export { Button, type ButtonProps } from "./components/ui/actions/button/Button";
```

## Adding a layout

```
src/components/layout/<category>/<layout>/
  Layout.tsx
  Layout.stories.tsx
```

Layouts compose UI components into page-level structures. They get stories (for visual review) but no unit tests — they're covered by app-level E2E tests.

Private subcomponents that only a layout uses live in the same folder:

```
layout/app-shell/app-shell/
  AppShell.tsx
  AppShell.stories.tsx
  AgentSidebarHeader.tsx    # internal, not exported
  AgentSidebarInput.tsx     # internal, not exported
```

## Testing guidelines

| Layer | Test? | Why |
|-------|-------|-----|
| UI components | Yes | Variants, disabled state, click handlers, keyboard |
| Context | Yes | State logic — theme switching, snackbar queue |
| Hooks | Yes | Pure logic — debounce timing, pagination math |
| Utils | Yes | Pure functions — easy to test, high value |
| Layouts | No | Composition only — covered by stories + app E2E |

Run tests:

```bash
pnpm test          # single run
pnpm test:watch    # watch mode
```

## Dark mode implementation

The library uses a `.dark` class on `<html>` toggled by `ThemeProvider`.

### Blocking script (prevents flash)

Consuming apps should add this in `<head>` before React hydrates:

```html
<script>
  (function () {
    try {
      var theme = localStorage.getItem("theme") || "auto";
      var isDark =
        theme === "auto"
          ? window.matchMedia("(prefers-color-scheme: dark)").matches
          : theme === "dark";
      if (isDark) document.documentElement.classList.add("dark");
    } catch (e) {}
  })();
</script>
```

### ThemeProvider

`ThemeProvider` manages theme state after hydration:
1. Reads localStorage immediately (matches blocking script)
2. Fetches `GET /v1/auth/me/preferences` in the background
3. If API theme differs from localStorage, updates both
4. Supports `auto` (system), `light`, and `dark`

This keeps theme synced across multiple apps sharing the same API.

## Component CLI

```bash
pnpm components list              # List all components with descriptions
pnpm components get <path|name>   # Show component props, story, and usage
pnpm components validate          # Check all components have valid metadata
```

Examples:

```bash
pnpm components get ui/actions/button
pnpm components get Button
```

`validate` runs in CI — PRs with missing or empty `meta` exports will fail.

## Porting components from reference

The `reference/v2-restored` branch contains all 55 components from the previous codebase. To port a component:

1. Check the reference: `git diff main..reference/v2-restored -- src/components/ComponentName.tsx`
2. Create the folder in the new structure
3. Copy and adapt — fix imports to use `@/` alias
4. Add `meta` export with name and description
5. Add a story and test
6. Export from `index.ts`
7. Run `pnpm components validate` to verify

