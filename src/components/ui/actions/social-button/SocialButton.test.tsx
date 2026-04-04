import { render, cleanup } from "@testing-library/react";
import { describe, test, expect, afterEach } from "vitest";
import { SocialButton, SocialIcon } from "./SocialButton";

afterEach(cleanup);

describe("SocialButton", () => {
  test("renders with default label for each provider", () => {
    const providers = [
      ["google", "Sign in with Google"],
      ["discord", "Sign in with Discord"],
      ["openid", "Sign in with OpenID"],
      ["line", "Sign in with LINE"],
    ] as const;

    for (const [provider, label] of providers) {
      const { getByText, unmount } = render(
        <SocialButton provider={provider} />,
      );
      expect(getByText(label)).toBeInTheDocument();
      unmount();
    }
  });

  test("sets aria-label when no children", () => {
    const { container } = render(<SocialButton provider="google" />);
    const button = container.querySelector("button")!;
    expect(button).toHaveAttribute("aria-label", "Sign in with Google");
  });

  test("does not set aria-label when children are provided", () => {
    const { container } = render(
      <SocialButton provider="google">Custom text</SocialButton>,
    );
    const button = container.querySelector("button")!;
    expect(button).not.toHaveAttribute("aria-label");
  });

  test("renders custom children instead of default label", () => {
    const { getByText, queryByText } = render(
      <SocialButton provider="google">Continue with Google</SocialButton>,
    );
    expect(getByText("Continue with Google")).toBeInTheDocument();
    expect(queryByText("Sign in with Google")).not.toBeInTheDocument();
  });

  test("renders provider icon as SVG with aria-hidden", () => {
    const { container } = render(<SocialButton provider="google" />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("aria-hidden", "true");
  });

  test("applies custom className", () => {
    const { container } = render(
      <SocialButton provider="google" className="w-full" />,
    );
    expect(container.querySelector("button")).toHaveClass("w-full");
  });

  test("forwards native button attributes", () => {
    const { getByTestId } = render(
      <SocialButton provider="google" disabled data-testid="social" />,
    );
    expect(getByTestId("social")).toBeDisabled();
  });

  test("renders as button element with type button", () => {
    const { container } = render(<SocialButton provider="google" />);
    expect(container.querySelector("button")).toHaveAttribute("type", "button");
  });

  test("uses custom aria-label when provided", () => {
    const { container } = render(
      <SocialButton
        provider="google"
        aria-label="Login via Google account"
      />,
    );
    expect(container.querySelector("button")).toHaveAttribute(
      "aria-label",
      "Login via Google account",
    );
  });
});

describe("SocialIcon", () => {
  test("renders SVG for each provider", () => {
    const providers = ["google", "discord", "openid", "line"] as const;
    for (const provider of providers) {
      const { container, unmount } = render(
        <SocialIcon provider={provider} />,
      );
      expect(container.querySelector("svg")).toBeInTheDocument();
      unmount();
    }
  });

  test("applies custom size", () => {
    const { container } = render(
      <SocialIcon provider="google" size={32} />,
    );
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("width", "32");
    expect(svg).toHaveAttribute("height", "32");
  });

  test("applies custom className", () => {
    const { container } = render(
      <SocialIcon provider="discord" className="my-icon" />,
    );
    expect(container.querySelector("svg")).toHaveClass("my-icon");
  });
});
