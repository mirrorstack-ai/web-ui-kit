import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { VerificationCodeInput } from "./VerificationCodeInput";

const meta: Meta<typeof VerificationCodeInput> = {
  title: "UI/Inputs/VerificationCodeInput",
  component: VerificationCodeInput,
  argTypes: {
    disabled: { control: "boolean" },
    error: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof VerificationCodeInput>;

export const Playground: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <div className="flex flex-col items-center gap-4">
        <VerificationCodeInput
          {...args}
          value={value}
          onChange={setValue}
          onComplete={(code) => console.log("Complete:", code)}
        />
        <span className="text-sm text-on-surface-variant">
          Value: {value || "(empty)"}
        </span>
      </div>
    );
  },
};

export const WithError: Story = {
  render: () => {
    const [value, setValue] = useState("12345");
    return (
      <div className="flex flex-col items-center gap-2">
        <VerificationCodeInput value={value} onChange={setValue} error />
        <span className="text-sm text-error">Invalid code</span>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <VerificationCodeInput value="123456" onChange={() => {}} disabled />
  ),
};

export const Prefilled: Story = {
  render: () => {
    const [value, setValue] = useState("123456");
    return <VerificationCodeInput value={value} onChange={setValue} />;
  },
};
