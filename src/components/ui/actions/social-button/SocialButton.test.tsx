import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi, afterEach } from "vitest";
import { SocialButton, SocialIcon } from "./SocialButton";

afterEach(cleanup);

describe("SocialButton", () => {
  it("renders a button", () => {
    render(<SocialButton provider="google" />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("sets aria-label when no children", () => {
    render(<SocialButton provider="google" />);
    expect(screen.getByLabelText("Sign in with google")).toBeInTheDocument();
  });

  it("does not set aria-label when children provided", () => {
    render(<SocialButton provider="google">Sign in</SocialButton>);
    expect(screen.queryByLabelText("Sign in with google")).not.toBeInTheDocument();
    expect(screen.getByText("Sign in")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const onClick = vi.fn();
    render(<SocialButton provider="google" onClick={onClick} />);
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("is disabled when disabled prop set", () => {
    render(<SocialButton provider="google" disabled />);
    expect(screen.getByRole("button")).toBeDisabled();
  });
});

describe("SocialIcon", () => {
  it("renders an svg for known provider", () => {
    const { container } = render(<SocialIcon provider="google" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("returns null for unknown provider", () => {
    const { container } = render(<SocialIcon provider="unknown" />);
    expect(container.querySelector("svg")).not.toBeInTheDocument();
  });
});
