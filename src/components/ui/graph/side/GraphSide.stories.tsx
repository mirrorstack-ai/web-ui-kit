import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { GraphSide, type GraphSideNode } from "./GraphSide";
import { Button } from "@/components/ui/actions/button/Button";
import { GraphLayout } from "@/components/layout/graph/graph-layout/GraphLayout";

const DETAILS: Record<string, { summary: string; lastSeen?: string }> = {
  account: { summary: "Workspace settings, identity, security." },
  apps: { summary: "Installed modules in this workspace." },
  daily: { summary: "Daily journal — notes, mood, reflections.", lastSeen: "2026-05-14" },
  balance: { summary: "Finances, ledger, statements." },
};

const renderDetails = (n: GraphSideNode) => {
  const d = DETAILS[n.id];
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
    <p className="text-sm text-on-surface-variant">No details.</p>
  );
};

const meta: Meta<typeof GraphSide> = {
  title: "UI/Graph/GraphSide",
  component: GraphSide,
};

export default meta;
type Story = StoryObj<typeof GraphSide>;

const SAMPLE: GraphSideNode = {
  id: "account",
  label: "Account",
  tag: "core",
};

export const Standalone: Story = {
  args: {
    node: SAMPLE,
    onClose: () => {},
    renderDetails,
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-md h-[400px] relative bg-surface-container border border-outline-variant rounded-xl">
        <Story />
      </div>
    ),
  ],
};

const PICKABLE: GraphSideNode[] = [
  { id: "account", label: "Account", tag: "core" },
  { id: "apps", label: "Apps", tag: "core" },
  { id: "daily", label: "Daily", tag: "daily" },
  { id: "balance", label: "Balance", tag: "balance" },
];

export const InGraphLayout: Story = {
  render: () => {
    const [selected, setSelected] = useState<GraphSideNode | null>(null);
    return (
      <div className="w-full max-w-4xl h-[500px] rounded-xl bg-surface-container border border-outline-variant">
        <GraphLayout
          canvas={
            <div className="absolute inset-0 flex flex-wrap items-center justify-center gap-2 p-6">
              {PICKABLE.map((n) => (
                <Button
                  key={n.id}
                  variant="outline"
                  onClick={() => setSelected((cur) => (cur?.id === n.id ? null : n))}
                >
                  {n.label}
                </Button>
              ))}
            </div>
          }
          side={
            <GraphSide
              node={selected}
              onClose={() => setSelected(null)}
              renderDetails={renderDetails}
            />
          }
        />
      </div>
    );
  },
};
