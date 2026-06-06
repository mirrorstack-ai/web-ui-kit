import type { Meta, StoryObj } from "@storybook/react";
import { StarRating } from "./StarRating";

const meta: Meta<typeof StarRating> = {
  title: "UI/Notch/Blocks/Rating",
  component: StarRating,
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof StarRating>;

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="border-outline-variant text-on-surface rounded-xl border px-2 py-4">
    {children}
  </div>
);

export const HighRating: Story = {
  render: () => (
    <Wrapper>
      <div style={{ width: 220, height: 110 }}>
        <StarRating value={4.5} count={128} label="Rating" />
      </div>
    </Wrapper>
  ),
};

export const NoReviews: Story = {
  render: () => (
    <Wrapper>
      <div style={{ width: 220, height: 110 }}>
        <StarRating value={0} count={0} label="Rating" />
      </div>
    </Wrapper>
  ),
};
