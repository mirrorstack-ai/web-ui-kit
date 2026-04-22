import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { FloatingLabelInput } from "./FloatingLabelInput";

describe("FloatingLabelInput", () => {
  it("renders with label", () => {
    render(<FloatingLabelInput label="Email" id="email" />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("renders as input by default", () => {
    render(<FloatingLabelInput label="Name" id="name" />);
    expect(screen.getByLabelText("Name").tagName).toBe("INPUT");
  });

  it("renders as textarea when multiline", () => {
    render(<FloatingLabelInput label="Bio" id="bio" multiline />);
    expect(screen.getByLabelText("Bio").tagName).toBe("TEXTAREA");
  });

  it("shows helper text", () => {
    render(
      <FloatingLabelInput label="Email" id="email" helperText="Required" />,
    );
    expect(screen.getByText("Required")).toBeInTheDocument();
  });

  it("shows error styling with helper text", () => {
    render(
      <FloatingLabelInput
        label="Email"
        id="email"
        error
        helperText="Invalid email"
      />,
    );
    expect(screen.getByText("Invalid email")).toHaveClass("text-error");
  });

  it("toggles password visibility", async () => {
    const user = userEvent.setup();
    render(
      <FloatingLabelInput
        label="Password"
        id="pw"
        type="password"
        showPasswordToggle
        value="secret"
        onChange={() => {}}
      />,
    );

    const input = screen.getByLabelText("Password");
    expect(input).toHaveAttribute("type", "password");

    await user.click(screen.getByLabelText("Show password"));
    expect(input).toHaveAttribute("type", "text");

    await user.click(screen.getByLabelText("Hide password"));
    expect(input).toHaveAttribute("type", "password");
  });

  it("shows character counter for multiline", () => {
    render(
      <FloatingLabelInput
        label="Bio"
        id="bio"
        multiline
        maxLength={160}
        value="Hello"
        onChange={() => {}}
      />,
    );
    expect(screen.getByText("5/160")).toBeInTheDocument();
  });

  it("disables input when disabled", () => {
    const { container } = render(
      <FloatingLabelInput
        label="Name"
        id="name"
        disabled
        value=""
        onChange={() => {}}
      />,
    );
    const input = container.querySelector("input");
    expect(input).toHaveAttribute("disabled");
  });

  it("calls onChange on user input", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    const { container } = render(
      <FloatingLabelInput
        label="Name"
        id="name"
        onChange={onChange}
      />,
    );
    const input = container.querySelector("input")!;
    await user.type(input, "a");
    expect(onChange).toHaveBeenCalled();
  });
});
