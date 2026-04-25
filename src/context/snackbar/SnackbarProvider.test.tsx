import { useState } from "react";
import { cleanup, render, screen, fireEvent, act } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import {
  SnackbarOutlet,
  SnackbarProvider,
  useSnackbar,
  useUnsavedSnackbar,
} from "./SnackbarProvider";
import { SNACKBAR_EXIT_MS } from "@/components/ui/feedback/snackbar/Snackbar";

afterEach(cleanup);

describe("SnackbarProvider", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("throws when useSnackbar is used outside provider", () => {
    function Consumer() {
      useSnackbar();
      return null;
    }
    expect(() => render(<Consumer />)).toThrow(
      "useSnackbar must be used within a SnackbarProvider",
    );
  });

  it("shows a snackbar message via showSnackbar", () => {
    function Trigger() {
      const { showSnackbar } = useSnackbar();
      return (
        <button onClick={() => showSnackbar({ message: "Saved" })}>
          show
        </button>
      );
    }
    render(
      <SnackbarProvider>
        <Trigger />
      </SnackbarProvider>,
    );
    act(() => {
      fireEvent.click(screen.getByText("show"));
    });
    expect(screen.getByText("Saved")).toBeInTheDocument();
  });

  it("dismisses the snackbar after exit timer", () => {
    function Trigger() {
      const { showSnackbar, dismissSnackbar } = useSnackbar();
      return (
        <>
          <button onClick={() => showSnackbar({ message: "Saved" })}>show</button>
          <button onClick={() => dismissSnackbar()}>dismiss</button>
        </>
      );
    }
    render(
      <SnackbarProvider>
        <Trigger />
      </SnackbarProvider>,
    );
    act(() => {
      fireEvent.click(screen.getByText("show"));
    });
    expect(screen.getByText("Saved")).toBeInTheDocument();

    act(() => {
      fireEvent.click(screen.getByText("dismiss"));
    });
    act(() => {
      vi.advanceTimersByTime(SNACKBAR_EXIT_MS + 50);
    });
    expect(screen.queryByText("Saved")).not.toBeInTheDocument();
  });

  it("patches in-flight options via updateSnackbar", () => {
    function Trigger() {
      const { showSnackbar, updateSnackbar } = useSnackbar();
      return (
        <>
          <button
            onClick={() =>
              showSnackbar({
                message: "Saving",
                loading: true,
                action: { label: "Save", onClick: () => {} },
              })
            }
          >
            show
          </button>
          <button onClick={() => updateSnackbar({ loading: false })}>
            patch
          </button>
        </>
      );
    }
    const { container } = render(
      <SnackbarProvider>
        <Trigger />
      </SnackbarProvider>,
    );
    act(() => {
      fireEvent.click(screen.getByText("show"));
    });
    expect(container.querySelector("[role='status']")).toHaveAttribute(
      "aria-busy",
      "true",
    );
    act(() => {
      fireEvent.click(screen.getByText("patch"));
    });
    expect(container.querySelector("[role='status']")).toHaveAttribute(
      "aria-busy",
      "false",
    );
  });

  it("suppresses the provider's fallback render when an outlet is mounted", () => {
    function Trigger() {
      const { showSnackbar } = useSnackbar();
      return (
        <button onClick={() => showSnackbar({ message: "Saved" })}>show</button>
      );
    }
    const { container } = render(
      <SnackbarProvider>
        <Trigger />
        <SnackbarOutlet />
      </SnackbarProvider>,
    );
    act(() => {
      fireEvent.click(screen.getByText("show"));
    });
    const matches = container.querySelectorAll("[role='status']");
    expect(matches.length).toBe(1);
    expect(matches[0].getAttribute("class")).toContain("absolute");
  });
});

describe("useUnsavedSnackbar", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  function UnsavedHarness({
    onSave,
    onReset,
  }: {
    onSave: () => void;
    onReset: () => void;
  }) {
    const [value, setValue] = useState("a");
    useUnsavedSnackbar({
      snapshot: value,
      onSave: () => {
        onSave();
        setValue("a");
      },
      onReset: () => {
        onReset();
        setValue("a");
      },
    });
    return (
      <button onClick={() => setValue("b")}>change</button>
    );
  }

  it("shows when snapshot differs and dismisses on save", () => {
    const onSave = vi.fn();
    const onReset = vi.fn();
    const { container } = render(
      <SnackbarProvider>
        <UnsavedHarness onSave={onSave} onReset={onReset} />
      </SnackbarProvider>,
    );
    act(() => {
      vi.advanceTimersByTime(0);
    });

    act(() => {
      fireEvent.click(screen.getByText("change"));
    });
    expect(screen.getByText("Unsaved changes")).toBeInTheDocument();

    const saveBtn = Array.from(
      container.querySelectorAll("button"),
    ).find((b) => b.textContent === "Save") as HTMLButtonElement;
    expect(saveBtn).toBeInTheDocument();
    act(() => {
      fireEvent.click(saveBtn);
    });
    expect(onSave).toHaveBeenCalledOnce();

    act(() => {
      vi.advanceTimersByTime(SNACKBAR_EXIT_MS + 100);
    });
    expect(screen.getByText("Saved")).toBeInTheDocument();
  });
});
