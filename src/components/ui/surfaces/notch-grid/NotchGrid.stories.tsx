import type { Meta, StoryObj } from "@storybook/react";
import {
  NotchGrid,
  type NotchGridItem,
  type PrimitiveRegistry,
} from "./NotchGrid";

const meta: Meta<typeof NotchGrid> = {
  title: "UI/Notch/NotchGrid",
  component: NotchGrid,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof NotchGrid>;

// --- Demo primitives -------------------------------------------------------

type LabelProps = { label?: string; value?: string | number };
const Label = ({ label, value }: LabelProps) => (
  <div className="flex h-full w-full flex-col justify-between p-1">
    <div className="text-xs opacity-75">{label}</div>
    <div className="text-xl font-semibold">{value}</div>
  </div>
);

type CenterProps = { children?: React.ReactNode; label?: string };
const Center = ({ label, children }: CenterProps) => (
  <div className="flex h-full w-full items-center justify-center text-sm font-medium">
    {children ?? label}
  </div>
);

const primitives: PrimitiveRegistry = {
  Label: Label as unknown as PrimitiveRegistry[string],
  Center: Center as unknown as PrimitiveRegistry[string],
};

// --- Shape helpers (1/0 → boolean mask) -----------------------------------

const m = (...rows: ReadonlyArray<ReadonlyArray<0 | 1>>) =>
  rows.map((r) => r.map((v) => v === 1));
const r = (cols: number, rows: number) =>
  Array.from({ length: rows }, () => Array<boolean>(cols).fill(true));

// --- Stories ---------------------------------------------------------------

export const Basic: Story = {
  args: {
    primitives,
    items: [
      {
        key: "hero",
        desire: { shape: r(2, 2) },
        theme: { type: "filled", variant: "primary" },
        ui: { type: "Label", label: "Hero", value: "42" },
      },
      {
        key: "users",
        desire: { shape: r(1, 1) },
        theme: { type: "filled", variant: "secondary" },
        ui: { type: "Label", label: "Users", value: "1,204" },
      },
      {
        key: "events",
        desire: { shape: r(1, 1) },
        theme: { type: "filled", variant: "tertiary" },
        ui: { type: "Label", label: "Events", value: "8.3k" },
      },
      {
        key: "uptime",
        desire: { shape: r(2, 1) },
        theme: { type: "outlined", variant: "neutral" },
        ui: { type: "Label", label: "Uptime", value: "99.94%" },
      },
    ] satisfies NotchGridItem[],
  },
};

/** Demonstrates the >96px gain-1-col / 1fr rule: items naturally fill the
 *  container regardless of width. Resize the Storybook canvas to see the
 *  column count jump (96px granularity) and the block size stretch between
 *  jumps. */
export const AutoSize: Story = {
  args: {
    primitives,
    items: Array.from({ length: 12 }, (_, i) => ({
      key: `t${i}`,
      desire: { shape: r(1, 1) },
      theme: {
        type: "filled" as const,
        variant: (
          ["primary", "secondary", "tertiary", "neutral"] as const
        )[i % 4],
      },
      ui: { type: "Label", label: `#${i + 1}`, value: i + 1 },
    })),
  },
};

/** Sub-items inside a single themed panel. The panel's footprint is the
 *  union of the sub-items' masks (so notches appear where no sub-cell sits). */
export const SubItems: Story = {
  args: {
    primitives,
    items: [
      {
        key: "panel",
        desire: { shape: r(3, 3) },
        theme: { type: "filled", variant: "primary" },
        subItems: [
          {
            desire: { position: [0, 0], shape: r(2, 2) },
            ui: { type: "Label", label: "Big", value: "★" },
          },
          {
            desire: { position: [2, 0], shape: r(1, 1) },
            ui: { type: "Label", label: "A" },
          },
          {
            desire: { position: [0, 2], shape: r(2, 1) },
            ui: { type: "Label", label: "Wide" },
          },
          {
            desire: { position: [2, 2], shape: r(1, 1) },
            ui: { type: "Label", label: "B" },
          },
        ],
      },
    ] satisfies NotchGridItem[],
  },
};

/** Priority-mapped position: each tile prefers (0,0), but only the first to
 *  claim it lands there. Others fall back to their secondary positions. */
export const PriorityFallback: Story = {
  args: {
    primitives,
    items: [
      {
        key: "first",
        desire: { position: [0, 0], shape: r(2, 2) },
        theme: { type: "filled", variant: "primary" },
        ui: { type: "Label", label: "First", value: "wins (0,0)" },
      },
      {
        key: "second",
        desire: {
          position: { "0": [0, 0], "1": [2, 0] },
          shape: r(2, 2),
        },
        theme: { type: "filled", variant: "secondary" },
        ui: { type: "Label", label: "Second", value: "falls to (2,0)" },
      },
    ] satisfies NotchGridItem[],
  },
};

/** Gallery of `type × variant` combinations. `cols: 6` keeps each chrome
 *  `type` on its own row (6 variants across) so the rows read as
 *  filled / outlined / elevated / ghost top-to-bottom. Elevated tiles
 *  carry the variant accent on their text so they don't all look alike. */
export const ThemeGallery: Story = {
  args: {
    primitives,
    cols: 6,
    blockMin: 120,
    items: (
      ["filled", "outlined", "elevated", "ghost"] as const
    ).flatMap((type) =>
      (
        ["primary", "secondary", "tertiary", "neutral", "warn", "error"] as const
      ).map((variant) => ({
        key: `${type}-${variant}`,
        desire: { shape: r(1, 1) },
        theme: { type, variant },
        ui: { type: "Center", label: `${type} ${variant}` },
      })),
    ) as NotchGridItem[],
  },
};

/** Custom notched shapes — exercises the outline tracer (PR #188) under
 *  non-rectangular footprints. Demonstrates the four canonical patterns the
 *  closed v1 stack used: L (corner notch), plus, T, and a 4×2 chart with a
 *  notched top-right corner. Small accessory tiles drop into the notches. */
export const CustomShapes: Story = {
  args: {
    primitives,
    cols: 8,
    blockMin: 96,
    items: [
      // L-hero (3×3 with bottom-right corner notched out)
      {
        key: "L",
        desire: {
          position: [0, 0],
          shape: m([1, 1, 1], [1, 1, 1], [1, 1, 0]),
        },
        theme: { type: "filled", variant: "primary" },
        ui: { type: "Label", label: "L-hero", value: "3×3 − ⌐" },
      },
      // 1×1 dropping into L's bottom-right notch (col 2, row 2)
      {
        key: "L-notch-fill",
        desire: { position: [2, 2], shape: r(1, 1) },
        theme: { type: "outlined", variant: "primary" },
        ui: { type: "Label", label: "Nestled" },
      },

      // Plus shape (4 corner notches)
      {
        key: "plus",
        desire: {
          position: [3, 0],
          shape: m([0, 1, 0], [1, 1, 1], [0, 1, 0]),
        },
        theme: { type: "filled", variant: "tertiary" },
        ui: { type: "Center", label: "✚" },
      },
      // 1×1s dropping into the plus's four corner notches
      {
        key: "p-tl",
        desire: { position: [3, 0], shape: r(1, 1) },
        theme: { type: "filled", variant: "secondary" },
        ui: { type: "Label", label: "↖" },
      },
      {
        key: "p-tr",
        desire: { position: [5, 0], shape: r(1, 1) },
        theme: { type: "filled", variant: "secondary" },
        ui: { type: "Label", label: "↗" },
      },
      {
        key: "p-bl",
        desire: { position: [3, 2], shape: r(1, 1) },
        theme: { type: "filled", variant: "secondary" },
        ui: { type: "Label", label: "↙" },
      },
      {
        key: "p-br",
        desire: { position: [5, 2], shape: r(1, 1) },
        theme: { type: "filled", variant: "secondary" },
        ui: { type: "Label", label: "↘" },
      },

      // T shape (3×2 with the bottom corners notched out)
      {
        key: "T",
        desire: {
          position: [0, 3],
          shape: m([1, 1, 1], [0, 1, 0]),
        },
        theme: { type: "outlined", variant: "neutral" },
        ui: { type: "Center", label: "T" },
      },

      // 4×2 chart with notched top-right corner (the closed PR's chart shape)
      {
        key: "chart",
        desire: {
          position: [4, 3],
          shape: m([1, 1, 1, 0], [1, 1, 1, 1]),
        },
        theme: { type: "filled", variant: "tertiary" },
        ui: { type: "Label", label: "Usage", value: "30d" },
      },
      // 1×1 dropping into the chart's top-right notch
      {
        key: "chart-notch",
        desire: { position: [7, 3], shape: r(1, 1) },
        theme: { type: "filled", variant: "primary" },
        ui: { type: "Label", label: "Now" },
      },

      // Diagonal junction — a 2×2 block and a 1×1 block meet only at a
      // corner. Exercises the outline tracer's diagonal-junction handling
      // (the two regions read as one shape with two concave arcs facing
      // each other, per PR #188).
      //   o o x
      //   o o x
      //   x x o
      {
        key: "diagonal",
        desire: {
          position: [0, 5],
          shape: m([1, 1, 0], [1, 1, 0], [0, 0, 1]),
        },
        theme: { type: "filled", variant: "secondary" },
        ui: { type: "Label", label: "Diagonal", value: "junction" },
      },
    ] satisfies NotchGridItem[],
  },
};

/** Outer-grid drag over the same rich notched footprints as `CustomShapes`:
 *  grab any top-level tile (L-hero, plus, chart, diagonal, panel) and drop it
 *  on another cell — it pins and everything else re-flows. `onItemMove`
 *  reports the new `[col, row]`.
 *
 *  Sub-items in the panel are draggable too: drag a sub-cell within the panel
 *  to reposition it, or drag it *out* past the panel to promote it to a
 *  standalone top-level tile (`onSubItemMove` / `onSubItemPromote`). Dragging
 *  the whole panel chrome by its gaps + adjacency auto-link land in PR 6. */
export const Draggable: Story = {
  args: {
    primitives,
    cols: 8,
    blockMin: 96,
    draggable: true,
    onItemMove: (key, pos) => {
      // eslint-disable-next-line no-console
      console.log("[NotchGrid story] drop:", key, pos);
    },
    onSubItemMove: (parentKey, subIndex, pos) => {
      // eslint-disable-next-line no-console
      console.log("[NotchGrid story] sub reposition:", parentKey, subIndex, pos);
    },
    onSubItemPromote: (parentKey, subIndex, pos) => {
      // eslint-disable-next-line no-console
      console.log("[NotchGrid story] sub promote:", parentKey, subIndex, pos);
    },
    items: [
      {
        key: "L",
        desire: { position: [0, 0], shape: m([1, 1, 1], [1, 1, 1], [1, 1, 0]) },
        theme: { type: "filled", variant: "primary" },
        ui: { type: "Label", label: "L-hero", value: "drag me" },
      },
      {
        key: "plus",
        desire: { position: [3, 0], shape: m([0, 1, 0], [1, 1, 1], [0, 1, 0]) },
        theme: { type: "filled", variant: "tertiary" },
        ui: { type: "Center", label: "✚" },
      },
      {
        key: "chart",
        desire: { position: [6, 0], shape: m([1, 1, 0], [1, 1, 1]) },
        theme: { type: "elevated", variant: "secondary" },
        ui: { type: "Label", label: "Usage", value: "30d" },
      },
      {
        key: "diagonal",
        desire: { position: [0, 3], shape: m([1, 1, 0], [1, 1, 0], [0, 0, 1]) },
        theme: { type: "filled", variant: "secondary" },
        ui: { type: "Label", label: "Diagonal", value: "junction" },
      },
      {
        // 3×2 panel — drag its sub-cells around, or out to promote them.
        key: "panel",
        desire: { position: [3, 3], shape: r(3, 2) },
        theme: { type: "filled", variant: "primary" },
        subItems: [
          {
            desire: { position: [0, 0], shape: r(1, 1) },
            ui: { type: "Label", label: "Cron", value: "8/d" },
          },
          {
            desire: { position: [1, 0], shape: r(1, 1) },
            ui: { type: "Label", label: "Calls", value: "1.2k" },
          },
          {
            desire: { position: [2, 1], shape: r(1, 1) },
            ui: { type: "Label", label: "Errs", value: "3" },
          },
        ],
      },
    ] satisfies NotchGridItem[],
  },
};
