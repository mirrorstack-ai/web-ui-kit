import { render, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Alert } from "./Alert";

function renderAlert(props: Partial<Parameters<typeof Alert>[0]> = {}) {
  return render(
    <Alert variant="info" {...props}>
      {props.children ?? "Test body"}
    </Alert>,
  );
}

function getAlert(container: HTMLElement) {
  return container.querySelector("[role='alert']") as HTMLElement;
}

describe("Alert", () => {
  it("renders with role alert", () => {
    const { container } = renderAlert();
    expect(getAlert(container)).toBeInTheDocument();
  });

  it("renders children as body content", () => {
    const { container } = renderAlert({ children: "Alert body text" });
    expect(container.textContent).toContain("Alert body text");
  });

  it("renders title when provided", () => {
    const { container } = renderAlert({ title: "Alert Title" });
    const heading = container.querySelector("h3");
    expect(heading).toBeInTheDocument();
    expect(heading?.textContent).toBe("Alert Title");
  });

  it("does not render title when not provided", () => {
    const { container } = renderAlert();
    const heading = container.querySelector("h3");
    expect(heading).not.toBeInTheDocument();
  });

  describe("variants", () => {
    it("applies error styles", () => {
      const { container } = renderAlert({ variant: "error" });
      expect(getAlert(container).getAttribute("class")).toContain("bg-error/10");
    });

    it("applies success styles", () => {
      const { container } = renderAlert({ variant: "success" });
      expect(getAlert(container).getAttribute("class")).toContain(
        "bg-success/10",
      );
    });

    it("applies warning styles", () => {
      const { container } = renderAlert({ variant: "warning" });
      expect(getAlert(container).getAttribute("class")).toContain(
        "bg-warning/10",
      );
    });

    it("applies info styles", () => {
      const { container } = renderAlert({ variant: "info" });
      expect(getAlert(container).getAttribute("class")).toContain("bg-info/10");
    });

    it("renders correct icon for each variant", () => {
      const icons: Record<string, string> = {
        error: "error",
        success: "check_circle",
        warning: "warning",
        info: "info",
      };

      for (const [variant, icon] of Object.entries(icons)) {
        const { container } = renderAlert({
          variant: variant as "error" | "success" | "warning" | "info",
        });
        const iconEl = container.querySelector(".material-symbols-rounded");
        expect(iconEl?.textContent?.trim()).toBe(icon);
      }
    });
  });

  describe("dismiss", () => {
    it("shows dismiss button when onDismiss is provided", () => {
      const { container } = renderAlert({ onDismiss: () => {} });
      const dismissBtn = container.querySelector(
        "button[aria-label='Dismiss']",
      );
      expect(dismissBtn).toBeInTheDocument();
    });

    it("does not show dismiss button when onDismiss is not provided", () => {
      const { container } = renderAlert();
      const dismissBtn = container.querySelector(
        "button[aria-label='Dismiss']",
      );
      expect(dismissBtn).not.toBeInTheDocument();
    });

    it("calls onDismiss when dismiss button is clicked", () => {
      const handler = vi.fn();
      const { container } = renderAlert({ onDismiss: handler });
      const dismissBtn = container.querySelector(
        "button[aria-label='Dismiss']",
      ) as HTMLButtonElement;
      fireEvent.click(dismissBtn);
      expect(handler).toHaveBeenCalledOnce();
    });
  });

  describe("className", () => {
    it("applies custom className", () => {
      const { container } = renderAlert({ className: "custom-class" });
      expect(getAlert(container).getAttribute("class")).toContain(
        "custom-class",
      );
    });
  });
});
