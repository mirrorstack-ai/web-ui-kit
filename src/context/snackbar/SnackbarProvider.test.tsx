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

  it("keeps a snackbar shown between a double dismiss and its exit timer", () => {
    // Regression: two dismisses back-to-back (the module-mount unsaved bridge
    // emits set(null) twice on a save) used to orphan the first exit timer —
    // it would fire through a success toast shown in between and wipe it.
    function Trigger() {
      const { showSnackbar, dismissSnackbar } = useSnackbar();
      return (
        <>
          <button
            onClick={() => {
              dismissSnackbar();
              dismissSnackbar();
              setTimeout(() => showSnackbar({ message: "Saved" }), 50);
            }}
          >
            save
          </button>
          <button onClick={() => showSnackbar({ message: "Unsaved changes" })}>
            show
          </button>
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
    act(() => {
      fireEvent.click(screen.getByText("save"));
    });
    act(() => {
      vi.advanceTimersByTime(SNACKBAR_EXIT_MS + 100);
    });
    expect(screen.getByText("Saved")).toBeInTheDocument();
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

  /**
   * A harness whose save is asynchronous and controllable — the shape every
   * real caller has (a request, a step-up dialog) and the one the old
   * fire-and-forget contract could not represent.
   */
  function AsyncHarness({
    save,
    savedMessage,
  }: {
    save: () => Promise<unknown>;
    savedMessage?: string | null;
  }) {
    const [value, setValue] = useState("a");
    useUnsavedSnackbar({
      snapshot: value,
      savedMessage,
      onSave: () => save().then(() => setValue("a")),
      onReset: () => setValue("a"),
    });
    return <button onClick={() => setValue("b")}>change</button>;
  }

  function clickSave(container: HTMLElement) {
    const btn = Array.from(container.querySelectorAll("button")).find(
      (b) => b.textContent === "Save",
    ) as HTMLButtonElement;
    act(() => {
      fireEvent.click(btn);
    });
  }

  /**
   * 🔴 THE BUG THIS PINS. The hook used to mark the form clean, call onSave
   * without awaiting, and toast "Saved" 50ms later — so a save gated behind a
   * step-up reauth dialog announced success before the user had even
   * authenticated, let alone before the write landed.
   */
  it("waits for an async save before confirming", async () => {
    let release: (v?: unknown) => void = () => {};
    const save = vi.fn(() => new Promise((res) => { release = res; }));
    const { container } = render(
      <SnackbarProvider>
        <AsyncHarness save={save} />
      </SnackbarProvider>,
    );
    act(() => { vi.advanceTimersByTime(0); });
    act(() => { fireEvent.click(screen.getByText("change")); });
    clickSave(container);

    // The save is still in flight — nothing may claim it succeeded.
    act(() => { vi.advanceTimersByTime(SNACKBAR_EXIT_MS + 100); });
    expect(screen.queryByText("Saved")).not.toBeInTheDocument();

    await act(async () => { release(); });
    act(() => { vi.advanceTimersByTime(SNACKBAR_EXIT_MS + 100); });
    expect(screen.getByText("Saved")).toBeInTheDocument();
  });

  // A cancelled step-up or a 403 must leave the edits on screen AND reachable.
  // Dismissing the bar while keeping the draft strands work with no way to
  // submit it.
  it("brings the bar back when the save fails", async () => {
    const save = vi.fn(() => Promise.reject(new Error("403")));
    const { container } = render(
      <SnackbarProvider>
        <AsyncHarness save={save} />
      </SnackbarProvider>,
    );
    act(() => { vi.advanceTimersByTime(0); });
    act(() => { fireEvent.click(screen.getByText("change")); });
    clickSave(container);

    await act(async () => { await Promise.resolve(); });
    act(() => { vi.advanceTimersByTime(SNACKBAR_EXIT_MS + 100); });

    expect(screen.queryByText("Saved")).not.toBeInTheDocument();
    expect(screen.getByText("Unsaved changes")).toBeInTheDocument();
  });

  // Callers that announce their own localized outcome must not get two toasts.
  it("suppresses its own confirmation when savedMessage is null", async () => {
    const save = vi.fn(() => Promise.resolve());
    const { container } = render(
      <SnackbarProvider>
        <AsyncHarness save={save} savedMessage={null} />
      </SnackbarProvider>,
    );
    act(() => { vi.advanceTimersByTime(0); });
    act(() => { fireEvent.click(screen.getByText("change")); });
    clickSave(container);

    await act(async () => { await Promise.resolve(); });
    act(() => { vi.advanceTimersByTime(SNACKBAR_EXIT_MS + 100); });
    expect(screen.queryByText("Saved")).not.toBeInTheDocument();
  });

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

  /**
   * 🔴 THE REJECTION IS THE LAST THING THAT HAPPENS, AND IT STILL HAS TO SHOW
   * THE BAR. The sibling test above rejects immediately and only then advances
   * the snackbar's exit timer — that timer changes the provider's context, which
   * re-renders the consumer and re-derives `isDirty` for free. It therefore
   * passed even while `restore()` did nothing but mutate a ref.
   *
   * The real caller does not get that gift. A step-up reauth dialog is
   * cancelled seconds after the Save click, long after every snackbar timer has
   * settled, and the page's own `setState` for closing the dialog flushes
   * BEFORE the rejection microtask. So the write inside `restore()` is the last
   * thing to happen, and nothing renders after it unless the write itself does.
   */
  it("brings the bar back when the save rejects after the snackbar has settled", async () => {
    let rejectSave: (reason: unknown) => void = () => {};
    const save = vi.fn(
      () =>
        new Promise((_res, rej) => {
          rejectSave = rej;
        }),
    );
    const { container } = render(
      <SnackbarProvider>
        <AsyncHarness save={save} />
      </SnackbarProvider>,
    );
    act(() => { vi.advanceTimersByTime(0); });
    act(() => { fireEvent.click(screen.getByText("change")); });
    expect(screen.getByText("Unsaved changes")).toBeInTheDocument();

    clickSave(container);

    // Everything the snackbar could do on its own is done: dismissed, exit
    // animation over, `current` cleared. No further render is pending.
    act(() => { vi.advanceTimersByTime(SNACKBAR_EXIT_MS + 100); });
    expect(screen.queryByText("Unsaved changes")).not.toBeInTheDocument();

    // Only now is the step-up cancelled.
    await act(async () => {
      rejectSave(new Error("step-up cancelled"));
      await Promise.resolve();
    });

    expect(screen.getByText("Unsaved changes")).toBeInTheDocument();
    expect(screen.queryByText("Saved")).not.toBeInTheDocument();
  });

  /**
   * The same invariant stated as the API contract callers actually use.
   * Pages rebase `savedRef.current` from promise handlers and effects to say
   * "this is the clean state now" — settings/general, settings/deployment and
   * settings/roles in web-applications all do. A write that cannot re-derive
   * `isDirty` silently does nothing on every one of those paths.
   */
  it("re-derives dirtiness when a caller writes savedRef outside a render", () => {
    let savedRef: { current: string } | null = null;
    function ExposeHarness({ snapshot }: { snapshot: string }) {
      const unsaved = useUnsavedSnackbar({
        snapshot,
        onSave: () => {},
        onReset: () => {},
      });
      savedRef = unsaved.savedRef;
      return <span data-testid="dirty">{String(unsaved.isDirty)}</span>;
    }

    const { rerender } = render(
      <SnackbarProvider>
        <ExposeHarness snapshot="a" />
      </SnackbarProvider>,
    );
    act(() => { vi.advanceTimersByTime(0); });
    expect(screen.getByTestId("dirty")).toHaveTextContent("false");

    rerender(
      <SnackbarProvider>
        <ExposeHarness snapshot="b" />
      </SnackbarProvider>,
    );
    expect(screen.getByTestId("dirty")).toHaveTextContent("true");
    expect(screen.getByText("Unsaved changes")).toBeInTheDocument();

    // No prop change, no timer: the baseline write is the only event.
    act(() => {
      savedRef!.current = "b";
    });
    expect(screen.getByTestId("dirty")).toHaveTextContent("false");

    act(() => { vi.advanceTimersByTime(SNACKBAR_EXIT_MS + 100); });
    expect(screen.queryByText("Unsaved changes")).not.toBeInTheDocument();
  });
});
