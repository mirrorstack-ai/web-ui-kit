import { render, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ReauthDialog } from "./ReauthDialog";

function renderDialog(
  props: Partial<Parameters<typeof ReauthDialog>[0]> = {},
) {
  return render(
    <ReauthDialog
      open={true}
      onClose={() => {}}
      onSuccess={() => {}}
      {...props}
    />,
  );
}

function getDialog(container: HTMLElement) {
  return container.querySelector("[role='dialog']") as HTMLElement;
}

describe("ReauthDialog", () => {
  it("renders nothing when closed", () => {
    const { container } = renderDialog({ open: false });
    expect(getDialog(container)).not.toBeInTheDocument();
  });

  it("renders dialog when open", () => {
    const { container } = renderDialog();
    expect(getDialog(container)).toBeInTheDocument();
  });

  it("renders with aria-modal and role dialog", () => {
    const { container } = renderDialog();
    const dialog = getDialog(container);
    expect(dialog.getAttribute("role")).toBe("dialog");
    expect(dialog.getAttribute("aria-modal")).toBe("true");
  });

  it("renders title and description", () => {
    const { container } = renderDialog({
      title: "Custom Title",
      description: "Custom description text",
    });
    expect(container.textContent).toContain("Custom Title");
    expect(container.textContent).toContain("Custom description text");
  });

  it("uses default title and description", () => {
    const { container } = renderDialog();
    expect(container.textContent).toContain("Verify your identity");
    expect(container.textContent).toContain("For your security");
  });

  describe("passkey view", () => {
    it("shows passkey view by default", () => {
      const { container } = renderDialog({
        methods: ["passkey", "password"],
      });
      expect(container.textContent).toContain("Verify with passkey");
    });

    it("shows passkey icon", () => {
      const { container } = renderDialog({
        methods: ["passkey", "password"],
      });
      const icon = container.querySelector(
        ".material-symbols-rounded[aria-hidden='true']",
      );
      expect(icon?.textContent?.trim()).toBe("passkey");
    });

    it("shows 'Use password instead' link when both methods available", () => {
      const { container } = renderDialog({
        methods: ["passkey", "password"],
      });
      expect(container.textContent).toContain("Use password instead");
    });

    it("does not show password link when passkey-only", () => {
      const { container } = renderDialog({
        methods: ["passkey"],
      });
      expect(container.textContent).not.toContain("Use password instead");
    });

    it("calls onPasskeyVerify when button is clicked", () => {
      const handler = vi.fn().mockResolvedValue("token");
      const { container } = renderDialog({
        methods: ["passkey"],
        onPasskeyVerify: handler,
      });
      const buttons = container.querySelectorAll("button");
      const verifyBtn = Array.from(buttons).find((b) =>
        b.textContent?.includes("Verify with passkey"),
      );
      fireEvent.click(verifyBtn!);
      expect(handler).toHaveBeenCalledOnce();
    });

    it("calls onSuccess with token after passkey verify", async () => {
      const onSuccess = vi.fn();
      const { container } = renderDialog({
        methods: ["passkey"],
        onPasskeyVerify: vi.fn().mockResolvedValue("passkey-token"),
        onSuccess,
      });
      const buttons = container.querySelectorAll("button");
      const verifyBtn = Array.from(buttons).find((b) =>
        b.textContent?.includes("Verify with passkey"),
      );
      fireEvent.click(verifyBtn!);
      await waitFor(() => {
        expect(onSuccess).toHaveBeenCalledWith("passkey-token");
      });
    });
  });

  describe("password view", () => {
    it("shows password view when password-only", () => {
      const { container } = renderDialog({
        methods: ["password"],
      });
      const input = container.querySelector(
        "input[type='password']",
      );
      expect(input).toBeInTheDocument();
    });

    it("switches to password view when link is clicked", () => {
      const { container } = renderDialog({
        methods: ["passkey", "password"],
      });
      const link = Array.from(container.querySelectorAll("button")).find(
        (b) => b.textContent?.includes("Use password instead"),
      );
      fireEvent.click(link!);
      const input = container.querySelector(
        "input[type='password']",
      );
      expect(input).toBeInTheDocument();
    });

    it("shows error when submitting empty password", () => {
      const { container } = renderDialog({
        methods: ["password"],
      });
      const verifyBtn = Array.from(
        container.querySelectorAll("button"),
      ).find((b) => b.textContent === "Verify");
      fireEvent.click(verifyBtn!);
      expect(container.textContent).toContain("Password is required");
    });

    it("calls onPasswordVerify with entered password", async () => {
      const handler = vi.fn().mockResolvedValue("pwd-token");
      const { container } = renderDialog({
        methods: ["password"],
        onPasswordVerify: handler,
      });
      const input = container.querySelector(
        "input[type='password']",
      ) as HTMLInputElement;
      fireEvent.change(input, { target: { value: "mypassword" } });
      const verifyBtn = Array.from(
        container.querySelectorAll("button"),
      ).find((b) => b.textContent === "Verify");
      fireEvent.click(verifyBtn!);
      expect(handler).toHaveBeenCalledWith("mypassword");
    });

    it("calls onSuccess after successful password verify", async () => {
      const onSuccess = vi.fn();
      const { container } = renderDialog({
        methods: ["password"],
        onPasswordVerify: vi.fn().mockResolvedValue("pwd-token"),
        onSuccess,
      });
      const input = container.querySelector(
        "input[type='password']",
      ) as HTMLInputElement;
      fireEvent.change(input, { target: { value: "pass" } });
      const verifyBtn = Array.from(
        container.querySelectorAll("button"),
      ).find((b) => b.textContent === "Verify");
      fireEvent.click(verifyBtn!);
      await waitFor(() => {
        expect(onSuccess).toHaveBeenCalledWith("pwd-token");
      });
    });

    it("shows error on password verify failure", async () => {
      const { container } = renderDialog({
        methods: ["password"],
        onPasswordVerify: vi
          .fn()
          .mockRejectedValue(new Error("Wrong password")),
      });
      const input = container.querySelector(
        "input[type='password']",
      ) as HTMLInputElement;
      fireEvent.change(input, { target: { value: "bad" } });
      const verifyBtn = Array.from(
        container.querySelectorAll("button"),
      ).find((b) => b.textContent === "Verify");
      fireEvent.click(verifyBtn!);
      await waitFor(() => {
        expect(container.textContent).toContain("Wrong password");
      });
    });

    it("submits on Enter key", () => {
      const handler = vi.fn().mockResolvedValue("token");
      const { container } = renderDialog({
        methods: ["password"],
        onPasswordVerify: handler,
      });
      const input = container.querySelector(
        "input[type='password']",
      ) as HTMLInputElement;
      fireEvent.change(input, { target: { value: "pass" } });
      fireEvent.keyDown(input, { key: "Enter" });
      expect(handler).toHaveBeenCalledWith("pass");
    });

    it("shows 'Use passkey instead' link when both methods", () => {
      const { container } = renderDialog({
        methods: ["passkey", "password"],
      });
      // Switch to password view first
      const pwdLink = Array.from(
        container.querySelectorAll("button"),
      ).find((b) => b.textContent?.includes("Use password instead"));
      fireEvent.click(pwdLink!);
      expect(container.textContent).toContain("Use passkey instead");
    });
  });

  describe("close", () => {
    it("calls onClose when cancel is clicked", () => {
      const onClose = vi.fn();
      const { container } = renderDialog({
        methods: ["password"],
        onClose,
      });
      const cancelBtn = Array.from(
        container.querySelectorAll("button"),
      ).find((b) => b.textContent === "Cancel");
      fireEvent.click(cancelBtn!);
      expect(onClose).toHaveBeenCalledOnce();
    });

    it("calls onClose when backdrop is clicked", () => {
      const onClose = vi.fn();
      const { container } = renderDialog({ onClose });
      const backdrop = container.querySelector(
        "[aria-hidden='true']",
      ) as HTMLElement;
      fireEvent.click(backdrop);
      expect(onClose).toHaveBeenCalledOnce();
    });
  });

  describe("error dismissal", () => {
    it("dismisses error when close button is clicked", async () => {
      const { container } = renderDialog({
        methods: ["password"],
      });
      // Trigger error
      const verifyBtn = Array.from(
        container.querySelectorAll("button"),
      ).find((b) => b.textContent === "Verify");
      fireEvent.click(verifyBtn!);

      await waitFor(() => {
        expect(container.textContent).toContain("Password is required");
      });

      const dismissBtn = container.querySelector(
        "button[aria-label='Dismiss error']",
      ) as HTMLButtonElement;
      fireEvent.click(dismissBtn);

      await waitFor(() => {
        expect(container.textContent).not.toContain(
          "Password is required",
        );
      });
    });
  });

  describe("className", () => {
    it("applies custom className to dialog panel", () => {
      const { container } = renderDialog({ className: "custom-class" });
      const panel = getDialog(container).querySelector(".relative");
      expect(panel?.getAttribute("class")).toContain("custom-class");
    });
  });
});
