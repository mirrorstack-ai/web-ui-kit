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

  // i18n — every string below the title comes from `labels`, and a key the
  // caller omits keeps its English default. Both halves matter: the apps
  // translate the dialog by passing an object built from their own catalog,
  // and a NEW key added here must not blank out an existing call site.
  it("renders every label from `labels` when one is passed", () => {
    render(
      <ReauthDialog
        {...defaultProps}
        onPasskeySetup={vi.fn()}
        methods={["email"]}
        labels={{
          emailPrompt: "寄送驗證碼到你的電子郵件",
          emailSendCta: "傳送驗證碼",
          passkeySetupCta: "設定 Passkey",
          passkeySetupHint: "，下次驗證更快",
        }}
      />,
    );
    expect(screen.getByText("寄送驗證碼到你的電子郵件")).toBeInTheDocument();
    expect(screen.getByText("傳送驗證碼")).toBeInTheDocument();
    expect(screen.getByText("設定 Passkey")).toBeInTheDocument();
    expect(screen.getByText("，下次驗證更快")).toBeInTheDocument();
  });

  it("falls back to English for keys `labels` omits", () => {
    render(<ReauthDialog {...defaultProps} labels={{ passkeyCta: "以 Passkey 驗證" }} />);
    expect(screen.getByText("以 Passkey 驗證")).toBeInTheDocument();
    // Untranslated key — still English rather than blank.
    expect(screen.getByText("Use email verification instead")).toBeInTheDocument();
  });

  it("does not show passkey setup recommendation when callback omitted", () => {
    render(<ReauthDialog {...defaultProps} methods={["email"]} />);
    expect(
      screen.queryByRole("button", { name: "Set up a passkey" }),
    ).not.toBeInTheDocument();
  });
});
