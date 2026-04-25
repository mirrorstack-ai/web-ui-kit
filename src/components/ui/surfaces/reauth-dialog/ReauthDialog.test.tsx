import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi, afterEach } from "vitest";
import { ReauthDialog } from "./ReauthDialog";

afterEach(cleanup);

const defaultProps = {
  open: true,
  onClose: vi.fn(),
  onSuccess: vi.fn(),
};

describe("ReauthDialog", () => {
  it("renders with default title", () => {
    render(<ReauthDialog {...defaultProps} />);
    expect(screen.getByText("Verify your identity")).toBeInTheDocument();
  });

  it("shows passkey view by default", () => {
    render(<ReauthDialog {...defaultProps} />);
    expect(screen.getByText("Verify with passkey")).toBeInTheDocument();
  });

  it("shows email fallback link when both methods available", () => {
    render(<ReauthDialog {...defaultProps} />);
    expect(screen.getByText("Use email verification instead")).toBeInTheDocument();
  });

  it("switches to email view on fallback click", () => {
    render(<ReauthDialog {...defaultProps} />);
    fireEvent.click(screen.getByText("Use email verification instead"));
    expect(screen.getByText("Send verification code")).toBeInTheDocument();
    expect(screen.getByText("Use passkey instead")).toBeInTheDocument();
  });

  it("shows email view directly when methods=[email]", () => {
    render(<ReauthDialog {...defaultProps} methods={["email"]} />);
    expect(screen.getByText("Send verification code")).toBeInTheDocument();
    expect(screen.queryByText("Use passkey instead")).not.toBeInTheDocument();
  });

  it("renders nothing when closed", () => {
    render(<ReauthDialog {...defaultProps} open={false} />);
    expect(screen.queryByText("Verify your identity")).not.toBeInTheDocument();
  });

  it("shows code input after sending", async () => {
    const onEmailSendCode = vi.fn().mockResolvedValue("challenge-123");
    render(
      <ReauthDialog
        {...defaultProps}
        methods={["email"]}
        onEmailSendCode={onEmailSendCode}
      />,
    );
    fireEvent.click(screen.getByText("Send verification code"));
    await vi.waitFor(() => {
      expect(screen.getByLabelText("Digit 1")).toBeInTheDocument();
    });
  });

  it("shows passkey setup recommendation in email-only flow when callback provided", () => {
    const onPasskeySetup = vi.fn();
    render(
      <ReauthDialog
        {...defaultProps}
        methods={["email"]}
        onPasskeySetup={onPasskeySetup}
      />,
    );
    const link = screen.getByRole("button", { name: "Set up a passkey" });
    expect(link).toBeInTheDocument();
    expect(screen.getByText(/for faster verification next time/)).toBeInTheDocument();
    fireEvent.click(link);
    expect(onPasskeySetup).toHaveBeenCalledTimes(1);
  });

  it("only the 'Set up a passkey' phrase is interactive in the setup banner", () => {
    const onPasskeySetup = vi.fn();
    render(
      <ReauthDialog
        {...defaultProps}
        methods={["email"]}
        onPasskeySetup={onPasskeySetup}
      />,
    );
    const trailingText = screen.getByText(/for faster verification next time/);
    fireEvent.click(trailingText);
    expect(onPasskeySetup).not.toHaveBeenCalled();
    expect(trailingText.closest("button")).toBeNull();
  });

  it("does not show passkey setup recommendation when methods includes passkey", () => {
    render(
      <ReauthDialog
        {...defaultProps}
        methods={["passkey", "email"]}
        onPasskeySetup={vi.fn()}
      />,
    );
    fireEvent.click(screen.getByText("Use email verification instead"));
    expect(
      screen.queryByRole("button", { name: "Set up a passkey" }),
    ).not.toBeInTheDocument();
  });

  it("does not show passkey setup recommendation when callback omitted", () => {
    render(<ReauthDialog {...defaultProps} methods={["email"]} />);
    expect(
      screen.queryByRole("button", { name: "Set up a passkey" }),
    ).not.toBeInTheDocument();
  });
});
