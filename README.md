# @mirrorstack-ai/web-ui-kit

[![CI](https://github.com/mirrorstack-ai/web-ui-kit/actions/workflows/ci.yml/badge.svg)](https://github.com/mirrorstack-ai/web-ui-kit/actions/workflows/ci.yml)
[![Storybook](https://github.com/mirrorstack-ai/web-ui-kit/actions/workflows/storybook.yml/badge.svg)](https://github.com/mirrorstack-ai/web-ui-kit/actions/workflows/storybook.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Good First Issues](https://img.shields.io/github/issues/mirrorstack-ai/web-ui-kit/good%20first%20issue?color=7057ff&label=good%20first%20issues)](https://github.com/mirrorstack-ai/web-ui-kit/issues?q=is%3Aopen+label%3A%22good+first+issue%22)

Shared React UI component library for [MirrorStack](https://mirrorstack.com).

Built with React 19, TypeScript, Tailwind CSS v4, and Material Design 3.

**[Storybook Demo](https://mirrorstack-ai.github.io/web-ui-kit/)** | **[Contributing](CONTRIBUTING.md)** | **[Good First Issues](https://github.com/mirrorstack-ai/web-ui-kit/issues?q=is%3Aopen+label%3A%22good+first+issue%22)** | **[Slack](https://mirrorstackai.slack.com)**

## Getting started

### Install

```bash
pnpm add @mirrorstack-ai/web-ui-kit
```

### Setup theme

Import the theme tokens in your app's `globals.css`:

```css
@import "tailwindcss";
@source "@mirrorstack-ai/web-ui-kit/src/components";
@import "@mirrorstack-ai/web-ui-kit/src/theme.css";
```

Add the Material Symbols font in your HTML `<head>`:

```html
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
/>
```

### Usage

```tsx
import { Button } from "@mirrorstack-ai/web-ui-kit";

function App() {
  return (
    <Button variant="filled" color="primary" leftIcon="add">
      Create
    </Button>
  );
}
```

## UI Components & Layouts

| Category | Components |
|----------|-----------|
| Actions | Button |
| Feedback | Progress (linear, circular, wave) |

More components are being ported from the `reference/v2-restored` branch. Run `pnpm components list` for the latest, or see [CONTRIBUTING.md](CONTRIBUTING.md) for how to add them.

## Dark mode

Wrap your app with `ThemeProvider` to enable light, dark, and auto (system) themes:

```tsx
import { ThemeProvider } from "@mirrorstack-ai/web-ui-kit";

export default function App({ children }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
```

`ThemeProvider` manages the `.dark` class on `<html>`, persists the user's choice, and syncs across apps via the API.

To prevent a flash of light theme before hydration, add this blocking script to your `<head>`:

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

## Storybook

Run the component explorer locally:

```bash
pnpm storybook
```

Opens at [http://localhost:6006](http://localhost:6006). Use the toolbar to toggle between light and dark mode.

## Project structure

```
src/
  components/
    ui/                        Standalone, reusable components
      <category>/<component>/
        Component.tsx
        Component.stories.tsx
        Component.test.tsx

    layout/                    Page-level compositions
      <category>/<layout>/
        Layout.tsx
        Layout.stories.tsx

  context/       Providers
    <context>/
      Context.tsx
      Context.test.tsx
  hooks/         Reusable hooks
  utils/         Helpers (cn, formatBytes, formatDate)
  assets/        SVGs and icons
  theme.css      MD3 design tokens (light + dark)
```

## Tech stack

- **React 19** with TypeScript
- **Tailwind CSS v4** with `@tailwindcss/vite`
- **Material Design 3** color system and design tokens
- **Material Symbols Rounded** for icons
- **Storybook 8** for component development
- **Vitest** for testing

## Contributing

We welcome contributions! Check out our [Contributing Guide](CONTRIBUTING.md) to get started.

Look for issues labeled [`good first issue`](https://github.com/mirrorstack-ai/web-ui-kit/issues?q=is%3Aopen+label%3A%22good+first+issue%22) for beginner-friendly tasks.

## License

MIT
