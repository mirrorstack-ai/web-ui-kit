# Changelog

Notable API additions and breaking changes. For the full commit log, see
[GitHub Releases](https://github.com/mirrorstack-ai/web-ui-kit/releases).

## 0.3.1

### Internal

- **notch-grid v2** — first salvage slice. Pure-lift utilities from the
  closed v1 stack: `grid-outline.ts` (SVG outline tracer), `breakpoints.ts`
  (responsive resolution), `BlockShape.tsx` (rounded-mask React adapter).
  No public exports yet — these are wired up in a later slice when the
  `<NotchGrid>` component lands. Design doc:
  [`mirrorstack-docs/architecture/notch-grid-v2/`](https://github.com/mirrorstack-ai/mirrorstack-docs/tree/main/architecture/notch-grid-v2).

## 0.3.0

### Components

- **DropdownMenu** — new `notchWidth?` / `notchHeight?` props (default
  52 / 46) to tune the notch tab per instance; new `useNotch?` prop
  (default `true`) — set `false` to render a plain bordered popover
  below the trigger (for selects, period pickers, anywhere the kit's
  signature notch doesn't fit). Trigger wrapper `z-[51]` now conditional
  on `open` so adjacent closed triggers no longer poke through an open
  menu. Container padding tightened (`py-1.5 px-1` → `p-2`); item style
  refreshed to match `AgentGreeting`'s model picker
  (`items-baseline gap-2 rounded-lg px-2 py-1.5`).

- **Graph** — playback physics fix: non-revealed nodes are now skipped
  from force-sim during replay so the topology forms cleanly instead of
  contorting through hidden nodes. Zoom-aware label LOD: per-node
  opacity fades with degree, pinned/focused/hovered/tag nodes always
  visible.

- **AgentGreeting** — new `hideInput` prop for layouts that only need
  the heading + logo without the chat input.

- **NavItem** — vertical padding refresh `py-3` → `py-2.5`.

### Notes

All additions are backwards-compatible (new props are optional with
defaults preserving existing behavior).
