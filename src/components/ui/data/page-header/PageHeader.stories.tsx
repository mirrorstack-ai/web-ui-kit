import type { Meta, StoryObj } from "@storybook/react";
import { PageHeader } from "./PageHeader";
import { Button } from "@/components/ui/actions/button/Button";

const meta: Meta<typeof PageHeader> = {
  title: "UI/Data/PageHeader",
  component: PageHeader,
  args: {
    title: "Billing",
    description: "Charges, plan, usage, and payment for this account.",
  },
};

export default meta;
type Story = StoryObj<typeof PageHeader>;

export const Playground: Story = {};

export const WithTail: Story = {
  args: {
    tail: (
      <Button variant="outline" size="sm" onClick={() => {}}>
        Period: May 19 – Jun 19, 2026
      </Button>
    ),
  },
};

export const NoDescription: Story = {
  args: { description: undefined },
};

export const TitleOnly: Story = {
  args: { title: "Profile", description: undefined },
};
