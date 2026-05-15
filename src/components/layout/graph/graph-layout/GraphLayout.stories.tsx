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
import { GraphSideContent } from "@/components/ui/graph/graph-side/GraphSideContent";
import { GraphSideSearch } from "@/components/ui/graph/graph-side/GraphSideSearch";
import {
  GraphSideGroup,
  type GraphSideGroupItem,
} from "@/components/ui/graph/graph-side/GraphSideGroup";
import {
  GraphSideSetting,
  type GraphSideSettingValue,
} from "@/components/ui/graph/graph-side/GraphSideSetting";

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
                <div className="flex flex-col gap-3 p-3">
                  <p className="text-sm text-on-surface">{d.summary}</p>
                  {d.lastSeen && (
                    <div className="text-xs text-on-surface-variant">
                      Last activity: {d.lastSeen}
                    </div>
                  )}
                </div>
              ) : (
                <p className="p-3 text-sm text-on-surface-variant">
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

type SideView =
  | { type: "node"; id: string }
  | { type: "settings" }
  | null;

/**
 * Graph canvas where both node clicks and the settings toolbar button
 * open the side panel. Node clicks show details; settings opens a
 * GraphSideContent panel composing GraphSideGroup + GraphSideSetting.
 * Latest interaction wins.
 */
export const WithGraphAndSettings: Story = {
  render: () => {
    const graphRef = useRef<GraphHandle>(null);
    const [view, setView] = useState<SideView>(null);
    const [groups, setGroups] = useState<GraphSideGroupItem[]>([
      { id: "core", name: "openclaude", color: "#f4a8a8" },
      { id: "memory", name: "memory system brain", color: "#a8d8a8" },
      { id: "wss", name: "wss tunnel", color: "#cbb6e5" },
      { id: "mcp", name: "mcp", color: "#f5c14a" },
      { id: "stripe", name: "stripe", color: "#8db8e8" },
    ]);
    const [setting, setSetting] = useState<GraphSideSettingValue>({
      nodeSize: 1,
      lineSize: 1,
      showLabels: true,
      repulsion: 1500,
      linkDistance: 70,
    });
    const [search, setSearch] = useState("");

    const sideNode: GraphSideNode | null =
      view?.type === "node"
        ? GRAPH_NODES.find((n) => n.id === view.id) ?? null
        : view?.type === "settings"
          ? SETTINGS_NODE
          : null;

    return (
      <GraphLayout
        sideOpen={Boolean(sideNode)}
        canvas={
          <Graph
            ref={graphRef}
            nodes={GRAPH_NODES}
            edges={GRAPH_EDGES}
            selectedId={view?.type === "node" ? view.id : undefined}
            onNodeClick={(id) => setView({ type: "node", id })}
            nodeSize={setting.nodeSize}
            lineSize={setting.lineSize}
            showLabels={setting.showLabels}
            repulsion={setting.repulsion}
            linkDistance={setting.linkDistance}
            className="border-0 bg-transparent rounded-none"
          />
        }
        action={
          <GraphAction
            onReplay={() => graphRef.current?.replay()}
            onFit={() => graphRef.current?.fit()}
            onSettings={() =>
              setView((v) => (v?.type === "settings" ? null : { type: "settings" }))
            }
          />
        }
        side={
          <GraphSide
            node={sideNode}
            onClose={() => setView(null)}
            renderDetails={(n) => {
              if (n.id === SETTINGS_NODE.id) {
                return (
                  <GraphSideContent
                    prepend={
                      <GraphSideSearch
                        value={search}
                        onChange={setSearch}
                      />
                    }
                    items={[
                      {
                        id: "groups",
                        title: "Groups",
                        body: (
                          <GraphSideGroup
                            groups={groups}
                            onChange={setGroups}
                          />
                        ),
                      },
                      {
                        id: "settings",
                        title: "Settings",
                        body: (
                          <GraphSideSetting
                            value={setting}
                            onChange={setSetting}
                          />
                        ),
                      },
                    ]}
                  />
                );
              }
              const d = NODE_DETAILS[n.id];
              return d ? (
                <div className="flex flex-col gap-3 p-3">
                  <p className="text-sm text-on-surface">{d.summary}</p>
                  {d.lastSeen && (
                    <div className="text-xs text-on-surface-variant">
                      Last activity: {d.lastSeen}
                    </div>
                  )}
                </div>
              ) : (
                <p className="p-3 text-sm text-on-surface-variant">
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
