import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { FloatingLabelInput } from "./FloatingLabelInput";

const meta: Meta<typeof FloatingLabelInput> = {
  title: "UI/Inputs/FloatingLabelInput",
  component: FloatingLabelInput,
  args: {
    label: "Email",
    id: "email",
  },
};

export default meta;
type Story = StoryObj<typeof FloatingLabelInput>;

export const Playground: Story = {};

export const WithValue: Story = {
  render: () => {
    const [value, setValue] = useState("user@mirrorstack.ai");
    return (
      <FloatingLabelInput
        label="Email"
        id="email-filled"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
};

export const Password: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <FloatingLabelInput
        label="Password"
        id="password"
        type="password"
        showPasswordToggle
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
};

export const ErrorState: Story = {
  args: {
    label: "Email",
    id: "email-error",
    error: true,
    helperText: "Please enter a valid email address",
    value: "invalid",
  },
};

export const Multiline: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <FloatingLabelInput
        label="Bio"
        id="bio"
        multiline
        rows={4}
        maxLength={160}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
};

export const Disabled: Story = {
  args: {
    label: "Read only",
    id: "disabled",
    disabled: true,
    value: "Cannot edit this",
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Username",
    id: "username",
    helperText: "3-20 characters, letters and numbers only",
  },
};
