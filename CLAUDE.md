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

## Publishing a release

🔴 **A merged PR does NOT publish.** `.github/workflows/release.yml` only runs when the PR
carries the **`release` label**:

```yaml
if: github.event.pull_request.merged == true && contains(github.event.pull_request.labels.*.name, 'release')
```

Without the label the job reports **skipped**, which is not a failure and shows up green — so
the version silently stays where it was while everything looks fine. Bumping `package.json` is
not enough on its own.

Two things that make this hard to notice:

- The workflow triggers on `pull_request: closed`, so its runs are tagged with the **head
  branch**, not `main`. `gh run list --branch main` shows nothing and looks like it never ran.
- Adding the label *after* merging and re-running does **not** work: the re-run replays the
  original event payload, so the label is still absent and it skips again. Land a new PR that
  has the label from the start.

Verify a release by the published version, never by a green run:

```bash
npm view @mirrorstack-ai/web-ui-kit version
```

## Core manifest pointer automation

After a PR merges to protected `main`, a successful terminal `CI` run triggers
`.github/workflows/notify-core-pointer.yml`. The workflow sends the exact
`web-ui-kit` main SHA to `mirrorstack-ai/mirrorstack-core-v2`, where
`mirrorstack-core-bot` opens or updates the commit-bound pointer PR.

Claude must not manually edit or push the core gitlink during the normal flow.
The automation only opens/updates a reviewable PR; it never reviews, merges,
promotes, or deploys. If the PR is missing, inspect the terminal CI/CD run and
`Notify core pointer` run first; core's scheduled scan remains the fallback.

## Conventions

- Import alias: `@/` maps to `src/`
- Every component must export `meta: ComponentMeta` with `name` and `description`
- No `"use client"` in component files
- Use `cn()` from `@/utils/cn` for class merging
- Use `isDev` / `isProd` from `@/utils/env` for environment checks — never use raw strings
- Add dev-only warnings: `if (isDev) { console.warn("[ComponentName] message"); }` for accessibility, invalid props, wrong usage
- See CONTRIBUTING.md for full details
