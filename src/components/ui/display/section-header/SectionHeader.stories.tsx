import type { Meta, StoryObj } from "@storybook/react";
import { SectionHeader } from "./SectionHeader";
import { Button } from "@/components/ui/actions/button/Button";

const meta: Meta<typeof SectionHeader> = {
  title: "UI/Data/SectionHeader",
  component: SectionHeader,
  args: {
    title: "Payment method",
    description: "Cards used to settle invoices for this account.",
  },
};

export default meta;
type Story = StoryObj<typeof SectionHeader>;

export const Playground: Story = {};

export const WithAction: Story = {
  args: {
    action: (
      <Button variant="outline" size="sm" onClick={() => {}}>
        Add card
      </Button>
    ),
  },
};

export const NoDescription: Story = {
  args: { description: undefined },
};
