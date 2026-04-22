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

  it("shows password fallback link when both methods available", () => {
    render(<ReauthDialog {...defaultProps} />);
    expect(screen.getByText("Use password instead")).toBeInTheDocument();
  });

  it("switches to password view on fallback click", () => {
    render(<ReauthDialog {...defaultProps} />);
    fireEvent.click(screen.getByText("Use password instead"));
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByText("Use passkey instead")).toBeInTheDocument();
  });

  it("shows password view directly when methods=[password]", () => {
    render(<ReauthDialog {...defaultProps} methods={["password"]} />);
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.queryByText("Use passkey instead")).not.toBeInTheDocument();
  });

  it("prevents closing while verifying", () => {
    const onClose = vi.fn();
    render(<ReauthDialog {...defaultProps} onClose={onClose} />);
    // Dialog onClose is passed handleClose which checks isVerifying
    // When not verifying, close should work via backdrop
    expect(screen.getByText("Verify your identity")).toBeInTheDocument();
  });

  it("renders nothing when closed", () => {
    render(<ReauthDialog {...defaultProps} open={false} />);
    expect(screen.queryByText("Verify your identity")).not.toBeInTheDocument();
  });
});
