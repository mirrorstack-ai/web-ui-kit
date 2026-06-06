import { useMemo, useRef, useState } from "react";
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
import { GraphSideNodeSummary } from "@/components/ui/graph/graph-side/GraphSideNodeSummary";
import { GraphSideNodeDetail } from "@/components/ui/graph/graph-side/GraphSideNodeDetail";
import { GraphSideNodeReferences } from "@/components/ui/graph/graph-side/GraphSideNodeReferences";
import { IconButton } from "@/components/ui/actions/icon-button/IconButton";

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

const mockId = (seed: string) => {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return h.toString(16).padStart(12, "0").slice(0, 12);
};

const referencesFor = (id: string) => {
  const seen = new Set<string>();
  const out: { id: string; label: string }[] = [];
  for (const edge of GRAPH_EDGES) {
    const other = edge.source === id ? edge.target : edge.target === id ? edge.source : null;
    if (!other || seen.has(other)) continue;
    seen.add(other);
    const node = GRAPH_NODES.find((n) => n.id === other);
    out.push({ id: other, label: node?.label ?? other });
  }
  return out;
};

const NODE_DETAILS: Record<
  string,
  { summary: string; lastSeen?: string; content?: string }
> = {
  user: {
    summary: "The root identity. Pinned at the center of the graph.",
    content: `# User

The **user** is the root of every workspace. All modules attach as
children of the user node, and permissions cascade from this anchor.

## Pinning

The user node stays pinned at the center of the canvas so the graph
always orients around identity.`,
  },
  account: {
    summary: "Workspace settings, identity, security.",
    content: `# Account

Workspace-level identity and configuration. Holds:

- Display name & avatar
- Authentication providers
- Member roles
- Billing contact

Account is the only module that can mutate other modules' visibility.`,
  },
  apps: {
    summary: "Installed modules in this workspace.",
    content: `# Apps

The catalog of modules installed in this workspace. Each entry tracks:

- Module id (\`apps.<slug>\`)
- Installed version
- Permission scopes granted at install

Removing an app cascades to all of its data.`,
  },
  projectify: {
    summary: "Project tracking module.",
    content: `# Projectify

Project tracking — tasks, sprints, milestones. Stores entries under
\`projectify.task.<id>\` and references the **user** for assignment.`,
  },
  crm: {
    summary: "Customer relationships and outreach.",
    content: `# CRM

Customer relationships module. Manages contacts, deals, and outreach
threads, all keyed by external email address.`,
  },
  daily: {
    summary: "Daily journal — notes, mood, reflections.",
    content: `# Daily

A lightweight daily journal that aggregates notes, mood entries, and
reflections into a single timeline. Pairs with **Notes** for free-form
content.`,
  },
  balance: {
    summary: "Finances, ledger, statements.",
    content: `# Balance

Finance hub — wires together the ledger, statements, and any external
payment processors. Money never leaves Balance.

References **Ledger** for double-entry bookkeeping and **Stripe** for
processing.`,
  },
  stripe: {
    summary: "Connected Stripe account.",
    lastSeen: "2026-05-12",
    content: `# Stripe

Connected Stripe account used by **Balance** for processing customer
payments. Synced webhooks land in the ledger as immutable entries.`,
  },
  ledger: {
    summary: "Double-entry ledger powering Balance.",
    content: `# Ledger

Append-only double-entry ledger. Every monetary mutation in the workspace
ends up here as paired debit/credit entries with a deterministic id.`,
  },
  notes: {
    summary: "Free-form journal entries.",
    lastSeen: "2026-05-14",
    content: `# Notes

Free-form journal entries. Stored as markdown, attached to the **Daily**
timeline by date.`,
  },
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

const NODE_DETAILS_FALLBACK = { summary: "No description for this node." };

function NodeDetailsPanel({
  node,
  onSelect,
}: {
  node: GraphSideNode;
  onSelect: (id: string) => void;
}) {
  const d = NODE_DETAILS[node.id] ?? NODE_DETAILS_FALLBACK;
  const refs = referencesFor(node.id);
  return (
    <GraphSideContent
      prepend={
        <GraphSideNodeSummary
          description={d.summary}
          source={node.tag ?? "—"}
          id={mockId(node.id)}
        />
      }
      items={[
        {
          id: "content",
          title: "Content",
          trailing: (
            <IconButton
              icon="pip_exit"
              aria-label="Expand content"
              tooltip="Expand"
              size="sm"
              variant="outline"
              onClick={() => console.log(`Expand content for ${node.id}`)}
            />
          ),
          body: (
            <GraphSideNodeDetail>
              {d.content ? (
                <div className="whitespace-pre-wrap text-xs leading-snug">
                  {d.content}
                </div>
              ) : (
                <p className="text-on-surface-variant">
                  No content for this node yet.
                </p>
              )}
            </GraphSideNodeDetail>
          ),
        },
        {
          id: "references",
          title: "References",
          body: (
            <GraphSideNodeReferences
              items={refs}
              onSelect={onSelect}
              className="-mt-1"
            />
          ),
        },
      ]}
    />
  );
}

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
      { id: "user", name: "User", query: "user", color: "#f5c14a" },
      { id: "core", name: "Core", query: "core", color: "#a8d8a8" },
      { id: "project", name: "Project", query: "project", color: "#cbb6e5" },
      { id: "crm", name: "CRM", query: "crm", color: "#f4a8a8" },
      { id: "daily", name: "Daily", query: "daily", color: "#fbb6ce" },
      { id: "balance", name: "Balance", query: "balance", color: "#8db8e8" },
      { id: "commerce", name: "Commerce", query: "commerce", color: "#6ee7b7" },
    ]);
    const [setting, setSetting] = useState<GraphSideSettingValue>({
      nodeSize: 1,
      textSize: 1,
      lineSize: 1,
      showTags: false,
      repulsion: 1500,
      linkDistance: 70,
    });
    const [search, setSearch] = useState("");
    const [playing, setPlaying] = useState(false);
    // Platform sources exposed to GraphSideGroup. Lowercase by convention
    // so they match the input casing as the user types.
    const nodeSources = useMemo(
      () => ["apps", "account", "crm", "daily", "balance", "projectify"],
      [],
    );
    // Default group matching: substring-search the group's `query` (falling
    // back to `name` if empty) across each node's fields in priority order —
    // Title (label) > Tags > Description (summary) > Content (markdown). The
    // highest-priority field that any group matches wins, breaking ties by
    // group list order. Known operator prefixes (`source:`, `name:`,
    // `description:`, `content:`) are stripped before matching so picking a
    // value from the popover Just Works; the structured per-field parser
    // ships in a follow-up PR.
    const colors = useMemo(() => {
      const stripOperator = (q: string) =>
        q.replace(/^(?:source|name|description|content):\s*/i, "");
      const resolve = (n: GraphNode): string | undefined => {
        const d = NODE_DETAILS[n.id];
        const fieldsByPriority = [n.label, n.tag, d?.summary, d?.content];
        for (const field of fieldsByPriority) {
          if (!field) continue;
          const f = field.toLowerCase();
          for (const g of groups) {
            const raw = (g.query?.trim() || g.name);
            const q = stripOperator(raw).trim().toLowerCase();
            if (q && f.includes(q)) return g.color;
          }
        }
        return undefined;
      };
      const out: Record<string, string> = {};
      for (const n of GRAPH_NODES) {
        const c = resolve(n);
        if (c) out[n.id] = c;
      }
      return out;
    }, [groups]);

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
            showTags={setting.showTags}
            repulsion={setting.repulsion}
            linkDistance={setting.linkDistance}
            colors={colors}
            onPlaybackEnd={() => setPlaying(false)}
            className="border-0 bg-transparent rounded-none"
          />
        }
        action={
          <GraphAction
            playing={playing}
            onReplay={() => {
              graphRef.current?.replay();
              setPlaying(true);
            }}
            onStop={() => {
              graphRef.current?.stop();
              setPlaying(false);
            }}
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
                            sources={nodeSources}
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
              return (
                <NodeDetailsPanel
                  node={n}
                  onSelect={(id) => setView({ type: "node", id })}
                />
              );
            }}
          />
        }
      />
    );
  },
};
