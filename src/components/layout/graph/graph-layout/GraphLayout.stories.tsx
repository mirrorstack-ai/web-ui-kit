import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { GraphLayout } from "./GraphLayout";
import { GraphAction } from "@/components/ui/graph/action/GraphAction";
import {
  GraphSide,
  type GraphSideNode,
} from "@/components/ui/graph/side/GraphSide";

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

/**
 * Click the settings (last) icon button to toggle the side panel open.
 */
export const SettingsTogglesSide: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <GraphLayout
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
