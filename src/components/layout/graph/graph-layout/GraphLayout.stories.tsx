import { useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { GraphLayout } from "./GraphLayout";
import { GraphAction } from "@/components/ui/graph/action/GraphAction";
import {
  GraphSide,
  type GraphSideNode,
} from "@/components/ui/graph/graph-side/GraphSide";
import {
  Graph,
  type GraphEdge,
  type GraphHandle,
  type GraphNode,
} from "@/components/ui/graph/graph/Graph";

const meta: Meta<typeof GraphLayout> = {
  title: "Layout/Graph",
  component: GraphLayout,
  decorators: [
    (Story) => (
      <div className="w-full max-w-4xl h-[500px] rounded-xl bg-surface-container border border-outline-variant">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof GraphLayout>;

const SETTINGS_NODE: GraphSideNode = {
  id: "settings",
  label: "Graph settings",
  tag: "configuration",
};

const GRAPH_NODES: GraphNode[] = [
  { id: "user", label: "Nothing Chang", pin: { x: 0.5, y: 0.5 }, tag: "user" },
  { id: "account", label: "Account", tag: "core" },
  { id: "apps", label: "Apps", tag: "core" },
  { id: "projectify", label: "Projectify", tag: "project" },
  { id: "crm", label: "CRM", tag: "crm" },
  { id: "daily", label: "Daily", tag: "daily" },
  { id: "balance", label: "Balance", tag: "balance" },
  { id: "stripe", label: "Stripe", tag: "commerce" },
  { id: "ledger", label: "Ledger", tag: "balance" },
  { id: "notes", label: "Notes", tag: "daily" },
];

const GRAPH_EDGES: GraphEdge[] = [
  { source: "user", target: "account" },
  { source: "user", target: "apps" },
  { source: "user", target: "projectify" },
  { source: "user", target: "crm" },
  { source: "user", target: "daily" },
  { source: "user", target: "balance" },
  { source: "balance", target: "stripe" },
  { source: "balance", target: "ledger" },
  { source: "daily", target: "notes" },
];

const NODE_DETAILS: Record<string, { summary: string; lastSeen?: string }> = {
  user: { summary: "The root identity. Pinned at the center of the graph." },
  account: { summary: "Workspace settings, identity, security." },
  apps: { summary: "Installed modules in this workspace." },
  projectify: { summary: "Project tracking module." },
  crm: { summary: "Customer relationships and outreach." },
  daily: { summary: "Daily journal — notes, mood, reflections." },
  balance: { summary: "Finances, ledger, statements." },
  stripe: { summary: "Connected Stripe account.", lastSeen: "2026-05-12" },
  ledger: { summary: "Double-entry ledger powering Balance." },
  notes: { summary: "Free-form journal entries.", lastSeen: "2026-05-14" },
};

/**
 * Full integration: Graph canvas wired through the toolbar's replay/fit and
 * a side panel that opens on node click.
 */
export const WithGraph: Story = {
  render: () => {
    const graphRef = useRef<GraphHandle>(null);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const selected = selectedId
      ? GRAPH_NODES.find((n) => n.id === selectedId) ?? null
      : null;

    return (
      <GraphLayout
        sideOpen={Boolean(selected)}
        canvas={
          <Graph
            ref={graphRef}
            nodes={GRAPH_NODES}
            edges={GRAPH_EDGES}
            selectedId={selectedId ?? undefined}
            onNodeClick={(id) => setSelectedId(id)}
            className="border-0 bg-transparent rounded-none"
          />
        }
        action={
          <GraphAction
            onReplay={() => graphRef.current?.replay()}
            onFit={() => graphRef.current?.fit()}
          />
        }
        side={
          <GraphSide
            node={selected}
            onClose={() => setSelectedId(null)}
            renderDetails={(n) => {
              const d = NODE_DETAILS[n.id];
              return d ? (
                <div className="flex flex-col gap-3">
                  <p className="text-sm text-on-surface">{d.summary}</p>
                  {d.lastSeen && (
                    <div className="text-xs text-on-surface-variant">
                      Last activity: {d.lastSeen}
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-sm text-on-surface-variant">
                  No details for this node.
                </p>
              );
            }}
          />
        }
      />
    );
  },
};

/**
 * Graph canvas with the settings (last) toolbar button toggling a side
 * panel for graph-level configuration — independent of node selection.
 */
export const WithGraphAndSettings: Story = {
  render: () => {
    const graphRef = useRef<GraphHandle>(null);
    const [settingsOpen, setSettingsOpen] = useState(false);
    return (
      <GraphLayout
        sideOpen={settingsOpen}
        canvas={
          <Graph
            ref={graphRef}
            nodes={GRAPH_NODES}
            edges={GRAPH_EDGES}
            className="border-0 bg-transparent rounded-none"
          />
        }
        action={
          <GraphAction
            onReplay={() => graphRef.current?.replay()}
            onFit={() => graphRef.current?.fit()}
            onSettings={() => setSettingsOpen((v) => !v)}
          />
        }
        side={
          <GraphSide
            node={settingsOpen ? SETTINGS_NODE : null}
            onClose={() => setSettingsOpen(false)}
            renderDetails={() => (
              <div className="flex flex-col gap-3 text-sm text-on-surface">
                <p>Graph-level settings live here.</p>
                <p className="text-on-surface-variant text-xs">
                  Toggled via the settings toolbar button — independent of
                  the node-click selection in the WithGraph story.
                </p>
              </div>
            )}
          />
        }
      />
    );
  },
};

/**
 * Click the settings (last) icon button to toggle the side panel open.
 */
export const SettingsTogglesSide: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <GraphLayout
        sideOpen={open}
        action={
          <GraphAction
            onReplay={() => {}}
            onFit={() => {}}
            onSettings={() => setOpen((v) => !v)}
          />
        }
        side={
          <GraphSide
            node={open ? SETTINGS_NODE : null}
            onClose={() => setOpen(false)}
            renderDetails={() => (
              <div className="flex flex-col gap-3 text-sm text-on-surface">
                <p>This panel is opened by the settings toolbar button.</p>
                <p className="text-on-surface-variant text-xs">
                  Real consumers will plug their graph settings form in here.
                </p>
              </div>
            )}
          />
        }
      />
    );
  },
};
