# Changelog

Notable API additions and breaking changes. For the full commit log, see
[GitHub Releases](https://github.com/mirrorstack-ai/web-ui-kit/releases).

## 0.4.2

Additive component variant — adopted to replace chrome the consumer apps were
hand-rolling (surfaced by the className-duplication audit). **No breaking
changes**; all defaults unchanged.

- `SegmentedButton`: new `variant="boxed"` — a bordered connected track with an
  inset selected pill, alongside the default gapped `"pills"`. Exports
  `SegmentedButtonVariant`. (#257)

## 0.4.1

Internal cleanup from the structure-review follow-up. **No consumer-facing API
change** (no export names, props, or behavior changed).

- Re-sectioned the public barrel (`index.ts`) by category (export surface
  verified identical).
- `ButtonColor` is now derived from `Tone` (`Exclude<Tone, "success">`) — same
  five members.
- graph-side cards compose `Surface` instead of a duplicated class constant.
- CONTRIBUTING: corrected the component-category list and added the
  vocabulary + hook-placement conventions.

## 0.4.0

Minor bump (not patch) because this release contains a breaking **behavior**
change and a public-export removal, layered on the internal simplify + structure
passes (a 45-finding audit + a structure review). All component public export
**names** are otherwise unchanged.

### ⚠️ Breaking

- **NotchGrid** `primitives` now defaults to `{}` (previously the built-in
  eight). Opt in explicitly:
  `<NotchGrid items={…} primitives={defaultPrimitives} />`. This removes the
  static surface→visualization import edge so grid-only consumers no longer
  bundle all eight block components.
- Removed demo-only `mockAgentHistory` / `mockAgentMessages` from the public API.

### Fixed

- **FloatingLabelInput** now forwards native HTML attributes (`autoFocus`,
  `name`, `required`, `onKeyDown`, `autoComplete`, …) — fixes focus in
  `EditableField` and `TypeToConfirmDialog`.
- **Accessibility** — focus-visible rings on Button/IconButton/nav controls,
  `aria-current` on active nav items, AppSwitcher disclosure semantics,
  accessible names for StarRating/StatusIndicator/status dots, ReauthDialog
  title, OptionList empty-row role, disabled Combobox chevron, MultiQuestion.
- Shared `status → CSS var` helper (`dataStatusVarColor`); deduped Gauge/
  DataList/Timeline. Doc/comment rot (`info` variant; `Graph` `nodeSize`).

### Added

- **Icon** `fill` prop (Material Symbols FILL axis); StarRating uses it.
- Exported `ButtonVariant`/`ButtonColor`/`ButtonSize`, `ComboboxSize`,
  `FloatingLabelInputSize`.

### Changed (structure — internal moves, public export names unchanged)

- New `blocks/` category for the 8 NotchGrid tile primitives; `chart/` dissolved;
  `data/`→`display/`, `files/drop-zone`→`inputs/`, `state/`→`dev/`;
  `LogoMirrorStack`→`Logo` (export name unchanged).
- Removed the `AgentSidebar`/`GraphSide` re-export barrels; extracted
  `PrimitiveRegistry`/`ItemKey` and `GraphSideNode` into local `types.ts`.
- Navigation `variant="danger"` deprecated for `"error"` (soft alias, still works).

## 0.3.10

Keeps the 0.3.9 drop-`info` change (`Alert` and `Badge` have no `info`
variant; `Alert` gained `primary`/`secondary`). This release layers the
unreleased component work on top of that baseline.

### Components

- **DataList** — labeled key/value list surface for compact record
  displays.
- **DataTable** — column-driven data table with typed `DataTableColumn`
  definitions.
- **StarRating** — interactive/read-only star rating control.
- **Timeline** — vertical event timeline (`TimelineEntry[]`).
- **StatusIndicator** — status dot/label with `StatusLevel` severities.
- **Gauge** — radial value gauge.
- **notch-grid primitives** — `defaultPrimitives` registry wiring the
  above (plus `MetricBlock`/`Sparkline`) into `NotchGrid` by default.

### Enhancements

- **Sparkline**, **Graph**, **GraphSideSetting**, **Breadcrumb**,
  **FloatingLabelInput**, **Icon**, **SegmentedButton**, **NotchGrid** —
  assorted refinements pulled from the unreleased snapshot.

## 0.3.5

### Components

- **NotchGrid** — now publicly exported (the v2 component landed in the
  tarball at 0.3.4 but was not re-exported, so it was not importable). A
  desire-driven notched layout for the dynamic-ui wire format: items
  declare position/shape priorities, the solver packs them, and each
  placement renders as a themed `BlockShape`. Supports the gain-1-col /
  `1fr` auto-sizing rule (`cols="auto"` + `blockMin`), outer drag-to-place,
  and sub-item drag + promote-to-top-level. Exports `NotchGrid` plus its
  public types (`NotchGridProps`, `NotchGridItem`, `NotchSubItem`,
  `NotchGridUI`, `PrimitiveRegistry`) and the desire/theme model types
  (`Desire`, `Pos`, `Mask`, `Priority`, `NotchTheme`). Design doc:
  [`mirrorstack-docs/architecture/notch-grid-v2/`](https://github.com/mirrorstack-ai/mirrorstack-docs/tree/main/architecture/notch-grid-v2).

## 0.3.4

### Components

- **Dialog** — compensate for scrollbar-gutter when locking body scroll,
  so opening a dialog no longer shifts the page content under it.

## 0.3.3

### Components

- **PageHeader** — new top-of-page header. `h1` title with optional
  description and three optional slots:
  - `path` — back link / breadcrumb above the title
  - `leading` — avatar or icon marker left of the title block
  - `tail` — picker / button / status pill right of the title block
  Mid-page sibling is `SectionHeader` (h2). Replaces the duplicated
  `text-2xl font-bold + on-surface-variant <p>` shape across the
  settings, profile, and module pages.

- **Breadcrumb** — navigable path trail, rendered as
  `← <root> / <…> / <next-level-up>`. The canonical content for
  `PageHeader.path` when a page has more than one level of "where you
  came from". Each segment is an anchor; the back arrow is implicit
  (a trail IS where you came from). Lives under `navigation/`.

## 0.3.2

### Components

- **SectionHeader** — new bare-style section header (title + optional
  description + optional right-aligned action). Sibling of
  `SectionLabel` (uppercase chip) and `SettingRow` (bordered card row).
  Use above a content area when you want the Claude-style "bold title,
  muted description, no card chrome" treatment — sections separate by
  parent gap only.

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
