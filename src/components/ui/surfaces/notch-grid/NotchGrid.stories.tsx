import type { Meta, StoryObj } from "@storybook/react";
import {
  NotchGrid,
  type NotchGridItem,
  type PrimitiveRegistry,
} from "./NotchGrid";

const meta: Meta<typeof NotchGrid> = {
  title: "UI/Surfaces/NotchGrid",
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

/** Gallery of `type × variant` combinations applied to identical 1×1 tiles. */
export const ThemeGallery: Story = {
  args: {
    primitives,
    cols: 4,
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
        ui: { type: "Center", label: `${variant}` },
      })),
    ) as NotchGridItem[],
  },
};

/** Unknown `ui.type` fires `onItemError` and renders an in-tile placeholder
 *  so the layout doesn't collapse. The renderer can then drive the
 *  L3 agent-sidebar flow (see dynamic-ui TBD 04 L3). */
export const UnknownPrimitive: Story = {
  args: {
    primitives,
    onItemError: (key, error) => {
      // eslint-disable-next-line no-console
      console.warn("[NotchGrid story] onItemError:", key, error);
    },
    items: [
      {
        key: "known",
        desire: { shape: r(1, 1) },
        theme: { type: "filled", variant: "primary" },
        ui: { type: "Label", label: "OK" },
      },
      {
        key: "broken",
        desire: { shape: r(2, 2) },
        theme: { type: "outlined", variant: "error" },
        ui: { type: "DoesNotExist" },
      },
    ] satisfies NotchGridItem[],
  },
};

/** The architecture doc's overview-page example, adapted: an L-shaped hero,
 *  a sub-item panel with mixed sizes, and a few accessory tiles. */
export const OverviewPage: Story = {
  args: {
    primitives,
    items: [
      {
        key: "hero",
        desire: {
          position: [0, 0],
          shape: m([1, 1, 1], [1, 1, 1], [1, 1, 0]),
        },
        theme: { type: "filled", variant: "primary" },
        ui: { type: "Label", label: "Module", value: "MirrorStack" },
      },
      {
        key: "installs",
        desire: { position: [2, 2], shape: r(1, 1) },
        theme: { type: "outlined", variant: "primary" },
        ui: { type: "Label", label: "Installs", value: "12" },
      },
      {
        key: "panel",
        desire: { position: [3, 0], shape: r(2, 3) },
        theme: { type: "filled", variant: "tertiary" },
        subItems: [
          {
            desire: { position: [0, 0], shape: r(1, 1) },
            ui: { type: "Label", label: "Cron", value: "8/d" },
          },
          {
            desire: { position: [0, 1], shape: r(2, 2) },
            ui: { type: "Label", label: "Calls × markup", value: "$420" },
          },
        ],
      },
      {
        key: "tenants",
        desire: { position: [0, 3], shape: r(1, 1) },
        theme: { type: "elevated", variant: "neutral" },
        ui: { type: "Label", label: "Tenants", value: "47" },
      },
    ] satisfies NotchGridItem[],
  },
};
