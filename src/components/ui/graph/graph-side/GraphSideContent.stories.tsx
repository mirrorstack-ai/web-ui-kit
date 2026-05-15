import type { Meta, StoryObj } from "@storybook/react";
import { GraphSideContent } from "./GraphSideContent";

const meta: Meta<typeof GraphSideContent> = {
  title: "UI/Graph/GraphSide/GraphSideContent",
  component: GraphSideContent,
  decorators: [
    (Story) => (
      <div style={{ width: 260 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof GraphSideContent>;

export const Default: Story = {
  args: {
    items: [
      {
        id: "summary",
        title: "Summary",
        body: (
          <p>
            The root identity. Owns workspace settings, identity, and
            security configuration for everything below.
          </p>
        ),
      },
      {
        id: "activity",
        title: "Recent activity",
        body: (
          <ul className="list-disc pl-4 flex flex-col gap-1">
            <li>Updated profile photo</li>
            <li>Connected Stripe account</li>
            <li>Joined Projectify</li>
          </ul>
        ),
      },
      {
        id: "metadata",
        title: "Metadata",
        body: (
          <dl className="flex flex-col gap-1">
            <div className="flex justify-between">
              <dt>Created</dt>
              <dd>2025-08-14</dd>
            </div>
            <div className="flex justify-between">
              <dt>Owner</dt>
              <dd>you</dd>
            </div>
          </dl>
        ),
      },
    ],
  },
};

export const SingleItemAlwaysOpen: Story = {
  args: {
    items: [
      {
        id: "only",
        title: "Summary",
        body: <p>Only one section — always open, no toggle.</p>,
      },
    ],
  },
};
