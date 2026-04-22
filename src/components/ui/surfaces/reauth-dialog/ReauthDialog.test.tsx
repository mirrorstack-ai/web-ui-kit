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
      expect(screen.getByLabelText("Verification code")).toBeInTheDocument();
    });
  });
});
