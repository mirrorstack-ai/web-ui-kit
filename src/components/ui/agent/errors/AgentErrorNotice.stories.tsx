import type { Meta, StoryObj } from "@storybook/react";
import { AgentErrorNotice } from "./AgentErrorNotice";

const meta: Meta<typeof AgentErrorNotice> = {
  title: "UI/Agent/ErrorNotice",
  component: AgentErrorNotice,
  decorators: [
    (Story) => (
      <div className="w-full max-w-[400px] bg-background px-4 py-6">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof AgentErrorNotice>;

/** The 61st turn: refused with agent_turn_limit and a wait time. */
export const TurnLimitEnglish: Story = {
  args: { locale: "en", errorInfo: { code: "agent_turn_limit", status: 429, retryAfterSeconds: 90 } },
};

export const TurnLimitZhTW: Story = {
  args: {
    locale: "zh-TW",
    errorInfo: { code: "agent_turn_limit", status: 429, retryAfterSeconds: 90 },
  },
};

export const DailyCeiling: Story = {
  args: { locale: "en", errorInfo: { code: "daily_ai_ceiling", status: 429 } },
};

/** An unknown code never shows server text — the generic line renders. */
export const UnknownCode: Story = {
  args: { locale: "zh-TW", errorInfo: { code: "brand_new_code" } },
};
