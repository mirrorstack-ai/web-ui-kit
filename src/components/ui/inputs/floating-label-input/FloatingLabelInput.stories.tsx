import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { FloatingLabelInput } from "./FloatingLabelInput";

const meta: Meta<typeof FloatingLabelInput> = {
  title: "UI/Inputs/FloatingLabelInput",
  component: FloatingLabelInput,
  args: {
    label: "Email",
    id: "email",
    size: "md",
    hideLabel: false,
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

export const Small: Story = {
  render: () => {
    const [title, setTitle] = useState("");
    return (
      <FloatingLabelInput
        label="Title"
        id="link-title"
        size="sm"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    );
  },
};

export const LeadingIcon: Story = {
  render: () => {
    const [search, setSearch] = useState("");
    const [searchSm, setSearchSm] = useState("");
    const [email, setEmail] = useState("ada@mirrorstack.ai");
    return (
      <div className="space-y-3 max-w-sm">
        <FloatingLabelInput
          label="Search users"
          id="leading-search-md"
          leadingIcon="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FloatingLabelInput
          label="Search"
          id="leading-search-sm-hl"
          size="sm"
          hideLabel
          leadingIcon="search"
          value={searchSm}
          onChange={(e) => setSearchSm(e.target.value)}
        />
        <FloatingLabelInput
          label="Email"
          id="leading-email"
          leadingIcon="mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
    );
  },
};
