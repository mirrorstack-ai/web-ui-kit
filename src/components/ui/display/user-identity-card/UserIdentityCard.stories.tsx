import type { Meta, StoryObj } from "@storybook/react";

import { UserIdentityCard } from "./UserIdentityCard";

const meta: Meta<typeof UserIdentityCard> = {
  title: "UI/Display/UserIdentityCard",
  component: UserIdentityCard,
  args: {
    name: "Ada Lovelace",
    email: "ada.lovelace@example.com",
    avatarUrl: "https://i.pravatar.cc/150?img=47",
    missingNameLabel: "Deleted user",
    missingEmailLabel: "Email unavailable",
    href: "#ada-profile",
  },
  decorators: [
    (Story) => (
      <div className="flex min-h-[280px] items-center justify-center p-8">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof UserIdentityCard>;

export const Playground: Story = {};

export const InitialsFallback: Story = {
  args: {
    avatarUrl: null,
  },
};

export const DeletedUser: Story = {
  args: {
    name: null,
    email: null,
    avatarUrl: null,
    href: "#audit-entry",
    children: "2d7f52a1-830e-4b55-a224-6553bcb8f8dd",
  },
};

export const LongIdentity: Story = {
  args: {
    name: "Alexandria-Cassandra Montgomery-Smythe the Third",
    email: "alexandria-cassandra.montgomery-smythe@international.example",
  },
};
