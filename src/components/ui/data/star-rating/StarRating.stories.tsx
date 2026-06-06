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
  <div className="border-outline-variant text-on-surface rounded-xl border p-2">
    {children}
  </div>
);

export const HighRating: Story = {
  render: () => (
    <Wrapper>
      <div style={{ width: 150, height: 150 }}>
        <StarRating value={4.5} count={128} label="Rating" />
      </div>
    </Wrapper>
  ),
};

export const MidRating: Story = {
  render: () => (
    <Wrapper>
      <div style={{ width: 150, height: 150 }}>
        <StarRating value={3.0} count={42} />
      </div>
    </Wrapper>
  ),
};

export const LowRating: Story = {
  render: () => (
    <Wrapper>
      <div style={{ width: 150, height: 150 }}>
        <StarRating value={1.5} count={7} label="Rating" />
      </div>
    </Wrapper>
  ),
};

export const Perfect: Story = {
  render: () => (
    <Wrapper>
      <div style={{ width: 150, height: 150 }}>
        <StarRating value={5.0} count={1024} label="Rating" />
      </div>
    </Wrapper>
  ),
};

export const NoReviews: Story = {
  render: () => (
    <Wrapper>
      <div style={{ width: 150, height: 150 }}>
        <StarRating value={0} count={0} label="Rating" />
      </div>
    </Wrapper>
  ),
};
