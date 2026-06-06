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

/** Outer-grid drag over rich notched footprints:
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
    onSubItemPromote: (parentKey, subIndex, pos) => {
      // eslint-disable-next-line no-console
      console.log("[NotchGrid story] sub drop:", parentKey, subIndex, pos);
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
