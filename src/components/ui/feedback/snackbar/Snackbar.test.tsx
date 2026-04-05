import { render, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { Snackbar, SNACKBAR_EXIT_MS } from "./Snackbar";

describe("Snackbar", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders message text", () => {
    const { getByText } = render(<Snackbar message="Hello world" />);
    expect(getByText("Hello world")).toBeInTheDocument();
  });

  it("has role status", () => {
    const { container } = render(<Snackbar message="Test" />);
    expect(container.querySelector("[role='status']")).toBeInTheDocument();
  });

  it("returns null when open is false and not visible", () => {
    const { container } = render(<Snackbar message="Test" open={false} />);
    expect(container.querySelector("[role='status']")).not.toBeInTheDocument();
  });

  it("exports SNACKBAR_EXIT_MS constant", () => {
    expect(SNACKBAR_EXIT_MS).toBe(300);
  });

  describe("variant", () => {
    it("shows success icon", () => {
      const { container } = render(
        <Snackbar message="Done" variant="success" />,
      );
      const icon = container.querySelector(".material-symbols-rounded");
      expect(icon).toBeInTheDocument();
      expect(icon?.textContent).toBe("check_circle");
    });

    it("shows error icon", () => {
      const { container } = render(
        <Snackbar message="Fail" variant="error" />,
      );
      const icon = container.querySelector(".material-symbols-rounded");
      expect(icon?.textContent).toBe("error");
    });

    it("shows warning icon", () => {
      const { container } = render(
        <Snackbar message="Warn" variant="warning" />,
      );
      const icon = container.querySelector(".material-symbols-rounded");
      expect(icon?.textContent).toBe("warning");
    });

    it("shows no icon for default variant", () => {
      const { container } = render(<Snackbar message="Test" />);
      expect(
        container.querySelector(".material-symbols-rounded"),
      ).not.toBeInTheDocument();
    });

    it("shows pulse dot for unsave variant", () => {
      const { container } = render(
        <Snackbar message="Unsaved" variant="unsave" />,
      );
      expect(container.querySelector(".animate-pulse")).toBeInTheDocument();
    });
  });

  describe("positioning", () => {
    it("uses fixed positioning by default", () => {
      const { container } = render(<Snackbar message="Test" />);
      const el = container.querySelector("[role='status']");
      expect(el?.getAttribute("class")).toContain("fixed");
    });

    it("uses absolute positioning when inline", () => {
      const { container } = render(<Snackbar message="Test" inline />);
      const el = container.querySelector("[role='status']");
      expect(el?.getAttribute("class")).toContain("absolute");
    });
  });

  describe("dismiss", () => {
    it("renders close button when onDismiss is provided and no actions", () => {
      const onDismiss = vi.fn();
      const { container } = render(
        <Snackbar message="Test" onDismiss={onDismiss} />,
      );
      const closeBtn = container.querySelector(
        "button[aria-label='Dismiss']",
      );
      expect(closeBtn).toBeInTheDocument();
    });

    it("fires onDismiss when close button is clicked", () => {
      const onDismiss = vi.fn();
      const { container } = render(
        <Snackbar message="Test" onDismiss={onDismiss} />,
      );
      const closeBtn = container.querySelector(
        "button[aria-label='Dismiss']",
      ) as HTMLButtonElement;
      fireEvent.click(closeBtn);
      expect(onDismiss).toHaveBeenCalledOnce();
    });

    it("does not render close button when actions are provided", () => {
      const { container } = render(
        <Snackbar
          message="Test"
          onDismiss={() => {}}
          action={{ label: "Undo", onClick: () => {} }}
        />,
      );
      expect(
        container.querySelector("button[aria-label='Dismiss']"),
      ).not.toBeInTheDocument();
    });
  });

  describe("actions", () => {
    it("renders primary action button", () => {
      const onClick = vi.fn();
      const { container } = render(
        <Snackbar message="Deleted" action={{ label: "Undo", onClick }} />,
      );
      const buttons = container.querySelectorAll("button");
      const actionBtn = Array.from(buttons).find(
        (b) => b.textContent === "Undo",
      ) as HTMLButtonElement;
      expect(actionBtn).toBeInTheDocument();
      fireEvent.click(actionBtn);
      expect(onClick).toHaveBeenCalledOnce();
    });

    it("renders secondary action button", () => {
      const onClick = vi.fn();
      const { container } = render(
        <Snackbar
          message="Discard?"
          secondaryAction={{ label: "Keep", onClick }}
        />,
      );
      const buttons = container.querySelectorAll("button");
      const actionBtn = Array.from(buttons).find(
        (b) => b.textContent === "Keep",
      ) as HTMLButtonElement;
      expect(actionBtn).toBeInTheDocument();
      fireEvent.click(actionBtn);
      expect(onClick).toHaveBeenCalledOnce();
    });

    it("disables secondary action when loading", () => {
      const { container } = render(
        <Snackbar
          message="Working..."
          loading
          secondaryAction={{ label: "Cancel", onClick: () => {} }}
        />,
      );
      const buttons = container.querySelectorAll("button");
      const actionBtn = Array.from(buttons).find(
        (b) => b.textContent === "Cancel",
      ) as HTMLButtonElement;
      expect(actionBtn).toBeDisabled();
    });
  });

  describe("auto-dismiss", () => {
    it("calls onDismiss after default duration (4000ms)", () => {
      const onDismiss = vi.fn();
      render(<Snackbar message="Test" onDismiss={onDismiss} />);
      act(() => vi.advanceTimersByTime(3999));
      expect(onDismiss).not.toHaveBeenCalled();
      act(() => vi.advanceTimersByTime(1));
      expect(onDismiss).toHaveBeenCalledOnce();
    });

    it("does not auto-dismiss when duration is 0", () => {
      const onDismiss = vi.fn();
      render(<Snackbar message="Test" onDismiss={onDismiss} duration={0} />);
      act(() => vi.advanceTimersByTime(10000));
      expect(onDismiss).not.toHaveBeenCalled();
    });

    it("does not auto-dismiss unsave variant by default", () => {
      const onDismiss = vi.fn();
      render(
        <Snackbar message="Unsaved" variant="unsave" onDismiss={onDismiss} />,
      );
      act(() => vi.advanceTimersByTime(10000));
      expect(onDismiss).not.toHaveBeenCalled();
    });

    it("uses custom duration", () => {
      const onDismiss = vi.fn();
      render(
        <Snackbar message="Test" onDismiss={onDismiss} duration={2000} />,
      );
      act(() => vi.advanceTimersByTime(2000));
      expect(onDismiss).toHaveBeenCalledOnce();
    });
  });

  describe("loading", () => {
    it("sets aria-busy when loading", () => {
      const { container } = render(<Snackbar message="Test" loading />);
      expect(container.querySelector("[role='status']")).toHaveAttribute(
        "aria-busy",
        "true",
      );
    });
  });
});
