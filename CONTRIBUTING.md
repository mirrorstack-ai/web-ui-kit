# Contributing to @mirrorstack-ai/web-ui-kit

## Getting started

```bash
git clone git@github.com:mirrorstack-ai/web-ui-kit.git
cd web-ui-kit
pnpm install
pnpm storybook
```

Storybook opens at [http://localhost:6006](http://localhost:6006).

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

## PR workflow

1. Create a branch from `main`
2. Make changes, ensure Storybook renders correctly
3. Push and open a PR — a Storybook preview link is auto-posted
4. PR requires maintainer review before merge
5. Squash merge to `main`

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

```tsx
import { cn } from "@/utils/cn";

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
- **No `"use client"`** — the consuming app decides the boundary
- **Use `@/` path alias** for imports (e.g. `@/utils/cn`)
- **Use `cn()`** for class merging (clsx + tailwind-merge)
- **Use Material Symbols Rounded** for icons (`<span className="material-symbols-rounded">icon_name</span>`)
- **Export the props interface** alongside the component

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

## Porting components from reference

The `reference/v2-restored` branch contains all 55 components from the previous codebase. To port a component:

1. Check the reference: `git diff main..reference/v2-restored -- src/components/ComponentName.tsx`
2. Create the folder in the new structure
3. Copy and adapt — fix imports to use `@/` alias
4. Add a story and test
5. Export from `index.ts`

