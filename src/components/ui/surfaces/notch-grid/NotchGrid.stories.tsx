import type { Meta, StoryObj } from "@storybook/react";
import { Icon } from "@/components/ui/media/icon/Icon";
import { NotchGrid } from "./NotchGrid";
import { NotchGridItem } from "./NotchGridItem";

const meta: Meta<typeof NotchGrid> = {
  title: "UI/Notch/NotchGrid",
  component: NotchGrid,
  parameters: { layout: "fullscreen" },
  args: { block: 96 },
  argTypes: {
    cols: { control: { type: "number", min: 1, max: 12 } },
    block: { control: { type: "range", min: 56, max: 140, step: 4 } },
  },
};

export default meta;
type Story = StoryObj<typeof NotchGrid>;

function Tile({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex h-full flex-col justify-between">
      <Icon name={icon} size={18} className="text-primary" />
      <div>
        <p className="text-xs text-on-surface-variant">{label}</p>
        <p className="text-lg font-medium text-on-surface">{value}</p>
      </div>
    </div>
  );
}

function PrimaryTile({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex h-full flex-col justify-between">
      <Icon name={icon} size={16} className="text-on-primary-container" />
      <div>
        <p className="text-xs text-on-primary-container/70">{label}</p>
        <p className="text-base font-medium text-on-primary-container">{value}</p>
      </div>
    </div>
  );
}

/**
 * An overview page laid out by hand (explicit `col`/`row`) so the notched
 * pieces interlock cleanly: 1×1 tiles drop into the L-hero's notch and into all
 * four of the plus's corners and the chart's notch; the `subItems={[[1,1],[2,2]]}`
 * panel is an L of its own. `nest` (default) keeps notches fillable — nothing
 * reserves empty corners — and `draggable` lets you re-arrange it.
 */
export const OverviewPage: Story = {
  render: () => (
    <div className="bg-background p-6">
      <NotchGrid cols={7} draggable>
        {/* L-shaped ("knife") hero: 3×3 with the bottom-right block notched out. */}
        <NotchGridItem
          col={0}
          row={0}
          shape={[
            [1, 1, 1],
            [1, 1, 1],
            [1, 1, 0],
          ]}
          fill="var(--color-primary-container)"
          stroke="none"
        >
          <div className="flex h-full flex-col justify-between">
            <Icon name="extension" size={22} className="text-on-primary-container" />
            <div>
              <p className="text-xs text-on-primary-container/70">Module</p>
              <p className="text-xl font-medium text-on-primary-container">identity-federated</p>
              <p className="text-xs text-on-primary-container/70">@me/identity-federated · v0.3.1</p>
            </div>
          </div>
        </NotchGridItem>
        {/* drops into the hero's bottom-right notch */}
        <NotchGridItem col={2} row={2} shape={[[1]]}>
          <Tile icon="apps" label="Installs" value="1,240" />
        </NotchGridItem>

        {/* Plus — its four notch corners get filled by 1×1 tiles. */}
        <NotchGridItem
          col={3}
          row={0}
          shape={[
            [0, 1, 0],
            [1, 1, 1],
            [0, 1, 0],
          ]}
        >
          <div className="flex h-full flex-col items-center justify-center text-center">
            <Icon name="bolt" size={18} className="text-primary" />
            <p className="mt-1 text-sm font-medium text-on-surface">Status</p>
            <p className="text-xs text-on-surface-variant">live · healthy</p>
          </div>
        </NotchGridItem>
        <NotchGridItem col={3} row={0} shape={[[1]]} fill="var(--color-primary-container)" stroke="none">
          <PrimaryTile icon="payments" label="Earned" value="$84" />
        </NotchGridItem>
        <NotchGridItem col={5} row={0} shape={[[1]]}><Tile icon="new_releases" label="Version" value="v0.3.1" /></NotchGridItem>
        <NotchGridItem col={3} row={2} shape={[[1]]}><Tile icon="groups" label="Tenants" value="37" /></NotchGridItem>
        <NotchGridItem col={5} row={2} shape={[[1]]}><Tile icon="schedule" label="Pending" value="1" /></NotchGridItem>

        {/* Tall recent-activity list. */}
        <NotchGridItem col={6} row={0} shape={[[1], [1], [1]]}>
          <div className="flex h-full flex-col gap-2">
            <p className="text-sm font-medium text-on-surface">Recent</p>
            {["v0.3.1 published", "installed by @anna", "deps reviewed", "tunnel up 4h"].map((t) => (
              <p key={t} className="text-xs text-on-surface-variant">{t}</p>
            ))}
          </div>
        </NotchGridItem>

        {/* 4×2 chart with a notch in its top-right corner. */}
        <NotchGridItem
          col={0}
          row={3}
          shape={[
            [1, 1, 1, 0],
            [1, 1, 1, 1],
          ]}
        >
          <div className="flex h-full flex-col">
            <p className="text-sm font-medium text-on-surface">Usage — last 30 days</p>
            <div className="mt-2 flex flex-1 items-end gap-1">
              {[40, 65, 50, 80, 55, 70, 90, 60, 75, 95, 85, 100].map((h, i) => (
                <div key={i} className="flex-1 rounded-t bg-primary/60" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        </NotchGridItem>
        {/* drops into the chart's notch */}
        <NotchGridItem col={3} row={3} shape={[[1]]}><Tile icon="build" label="Builds" value="312" /></NotchGridItem>

        {/* A component made of a 1×1 + a 2×2 sub-item — `subItems={[[1,1],[2,2]]}`;
            the two pack into the panel's own L footprint. Theme set once on the panel. */}
        <NotchGridItem
          col={4}
          row={3}
          fill="var(--color-primary-container)"
          subItems={[
            { cost: [1, 1], content: <PrimaryTile icon="schedule" label="Cron" value="6×" /> },
            { cost: [2, 2], content: <PrimaryTile icon="insights" label="Calls / day" value="128k" /> },
          ]}
        />
      </NotchGrid>
    </div>
  ),
};

/** A component built from sub-items, each with a `[cols, rows]` block cost —
 *  the panel's notched footprint is the union of where the grid packs them.
 *  e.g. `subItems={[[1,1],[2,2]]}` → a 1×1 widget beside a 2×2 one. */
export const SubItemPanels: Story = {
  args: { cols: 7 },
  render: (args) => (
    <div className="bg-background p-6">
      <NotchGrid {...args}>
        {/* [[2,2],[1,1]] → a 2×2 chart with a 1×1 stat tucked under it (L-shape).
            Theme set once on the panel; both sub-items inherit it. */}
        <NotchGridItem
          fill="var(--color-primary-container)"
          stroke="none"
          subItems={[
            {
              cost: [2, 2],
              content: (
                <div className="flex h-full flex-col">
                  <p className="text-sm font-medium text-on-primary-container">Usage</p>
                  <div className="mt-2 flex flex-1 items-end gap-1">
                    {[40, 70, 55, 85, 60, 95, 75].map((h, i) => (
                      <div key={i} className="flex-1 rounded-t bg-on-primary-container/35" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                </div>
              ),
            },
            { cost: [1, 1], content: <PrimaryTile icon="payments" label="Earned" value="$84" /> },
          ]}
        />
        {/* [[1,1],[1,1],[2,1]] → two stat tiles over a wide 2×1 footer. */}
        <NotchGridItem
          subItems={[
            { cost: [1, 1], content: <Tile icon="apps" label="Installs" value="1,240" /> },
            { cost: [1, 1], content: <Tile icon="new_releases" label="Version" value="v0.3.1" /> },
            {
              cost: [2, 1],
              content: (
                <div className="flex h-full items-center gap-2">
                  <Icon name="bolt" size={16} className="text-primary" />
                  <span className="text-xs text-on-surface-variant">tunnel up · 2.1k req/min · p99 142ms</span>
                </div>
              ),
            },
          ]}
        />
        {/* [[1,2],[1,1],[1,1]] → a tall list beside two stacked tiles. */}
        <NotchGridItem
          subItems={[
            {
              cost: [1, 2],
              content: (
                <div className="flex h-full flex-col gap-1.5">
                  <p className="text-sm font-medium text-on-surface">Recent</p>
                  {["v0.3.1 published", "installed by @anna", "deps reviewed", "tunnel up 4h"].map((t) => (
                    <p key={t} className="text-xs text-on-surface-variant">{t}</p>
                  ))}
                </div>
              ),
            },
            { cost: [1, 1], content: <Tile icon="groups" label="Tenants" value="37" /> },
            { cost: [1, 1], content: <Tile icon="schedule" label="Pending" value="1" /> },
          ]}
          subCols={2}
        />
      </NotchGrid>
    </div>
  ),
};

/** `draggable` — grab any tile and drop it onto a different block cell; it
 *  becomes pinned there and the rest re-flow around it (and into its notches). */
export const Draggable: Story = {
  args: { cols: 6, draggable: true },
  render: (args) => (
    <div className="bg-background p-6">
      <NotchGrid {...args}>
        <NotchGridItem
          shape={[
            [1, 1, 1],
            [1, 1, 0],
          ]}
          fill="var(--color-primary-container)"
          stroke="none"
        >
          <Tile icon="drag_indicator" label="Drag me" value="hero" />
        </NotchGridItem>
        <NotchGridItem shape={[[1]]}><Tile icon="apps" label="Installs" value="1,240" /></NotchGridItem>
        <NotchGridItem shape={[[1]]}><Tile icon="payments" label="Earned" value="$84" /></NotchGridItem>
        <NotchGridItem shape={[[1, 1]]}>
          <div className="flex h-full items-center gap-2">
            <Icon name="bolt" size={16} className="text-primary" />
            <span className="text-xs text-on-surface-variant">live · 2.1k req/min</span>
          </div>
        </NotchGridItem>
        <NotchGridItem shape={[[1], [1]]}>
          <div className="flex h-full flex-col gap-1">
            <p className="text-sm font-medium text-on-surface">Recent</p>
            <p className="text-xs text-on-surface-variant">v0.3.1 published</p>
            <p className="text-xs text-on-surface-variant">installed by @anna</p>
          </div>
        </NotchGridItem>
        <NotchGridItem shape={[[1]]}><Tile icon="calendar_today" label="Created" value="May" /></NotchGridItem>
      </NotchGrid>
    </div>
  ),
};

/** Items declare candidate `[cols, rows]` block costs — `{ sizes: [...] }` —
 *  and the grid auto-picks the largest that fits as you drag the width. */
export const BlockCostSizes: Story = {
  render: () => (
    <div className="bg-background p-6">
      <div
        className="resize-x overflow-auto rounded-2xl border border-dashed border-outline-variant p-2"
        style={{ width: 720, minWidth: 220, maxWidth: "100%" }}
      >
        <NotchGrid>
          <NotchGridItem
            shape={{ sizes: [[1, 1], [2, 2], [3, 2]] }}
            fill="var(--color-primary-container)"
            stroke="none"
          >
            <Tile icon="dashboard" label="Hero" value="1·1 → 2·2 → 3·2" />
          </NotchGridItem>
          <NotchGridItem shape={{ sizes: [[1, 1], [2, 1]] }}>
            <Tile icon="apps" label="Installs" value="1·1 → 2·1" />
          </NotchGridItem>
          <NotchGridItem shape={{ sizes: [[1, 1]] }}>
            <Tile icon="payments" label="Earned" value="1·1" />
          </NotchGridItem>
          <NotchGridItem shape={{ sizes: [[1, 1], [1, 2]] }}>
            <Tile icon="new_releases" label="Version" value="1·1 → 1·2" />
          </NotchGridItem>
          <NotchGridItem shape={{ sizes: [[1, 1], [2, 1]] }}>
            <Tile icon="history" label="Activity" value="1·1 → 2·1" />
          </NotchGridItem>
        </NotchGrid>
      </div>
    </div>
  ),
};

