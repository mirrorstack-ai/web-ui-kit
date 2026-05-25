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

export const Small: Story = {
  render: () => {
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    return (
      <div className="space-y-2 max-w-md">
        <FloatingLabelInput
          label="Title"
          id="link-title"
          size="sm"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <FloatingLabelInput
          label="URL"
          id="link-url"
          size="sm"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
    );
  },
};

export const SmallHiddenLabel: Story = {
  render: () => {
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    return (
      <div className="flex gap-2 max-w-md">
        <FloatingLabelInput
          label="Title"
          id="link-title-hl"
          size="sm"
          hideLabel
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-1/3"
        />
        <FloatingLabelInput
          label="URL"
          id="link-url-hl"
          size="sm"
          hideLabel
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1"
        />
      </div>
    );
  },
};

export const LeadingIcon: Story = {
  render: () => {
    const [query, setQuery] = useState("");
    return (
      <FloatingLabelInput
        label="Search users"
        id="search-users"
        leadingIcon="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="max-w-sm"
      />
    );
  },
};

export const LeadingIconWithValue: Story = {
  render: () => {
    const [email, setEmail] = useState("ada@mirrorstack.ai");
    return (
      <FloatingLabelInput
        label="Email"
        id="leading-email-filled"
        leadingIcon="mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="max-w-sm"
      />
    );
  },
};

export const LeadingIconAllSizes: Story = {
  render: () => {
    const [xs, setXs] = useState("");
    const [sm, setSm] = useState("");
    const [md, setMd] = useState("");
    return (
      <div className="space-y-3 max-w-sm">
        <FloatingLabelInput
          label="Compact"
          id="leading-xs"
          size="xs"
          leadingIcon="search"
          value={xs}
          onChange={(e) => setXs(e.target.value)}
        />
        <FloatingLabelInput
          label="Inline"
          id="leading-sm"
          size="sm"
          leadingIcon="search"
          value={sm}
          onChange={(e) => setSm(e.target.value)}
        />
        <FloatingLabelInput
          label="Default"
          id="leading-md"
          leadingIcon="search"
          value={md}
          onChange={(e) => setMd(e.target.value)}
        />
      </div>
    );
  },
};

export const LeadingIconHiddenLabel: Story = {
  render: () => {
    const [query, setQuery] = useState("");
    return (
      <FloatingLabelInput
        label="Search"
        id="leading-search-hl"
        size="sm"
        hideLabel
        leadingIcon="search"
        placeholder="Search users…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="max-w-sm"
      />
    );
  },
};

export const LeadingIconError: Story = {
  args: {
    label: "Email",
    id: "leading-email-error",
    leadingIcon: "mail",
    error: true,
    helperText: "Please enter a valid email address",
    value: "invalid",
  },
};
