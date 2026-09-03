import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  Snackbar,
  SNACKBAR_EXIT_MS,
  type SnackbarAction,
  type SnackbarVariant,
} from "@/components/ui/feedback/snackbar/Snackbar";

export interface SnackbarOptions {
  message: string;
  variant?: SnackbarVariant;
  action?: SnackbarAction;
  secondaryAction?: SnackbarAction;
  loading?: boolean;
  duration?: number;
}

interface SnackbarContextType {
  showSnackbar: (options: SnackbarOptions) => void;
  updateSnackbar: (options: Partial<SnackbarOptions>) => void;
  dismissSnackbar: () => void;
  /** Internal — used by SnackbarOutlet */
  _internal: {
    current: SnackbarOptions | null;
    open: boolean;
    registerOutlet: () => () => void;
  };
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export interface SnackbarProviderProps {
  children: ReactNode;
}

export function SnackbarProvider({ children }: SnackbarProviderProps) {
  const [current, setCurrent] = useState<SnackbarOptions | null>(null);
  const [open, setOpen] = useState(false);
  const [outletCount, setOutletCount] = useState(0);
  const cleanupTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dismissSnackbar = useCallback(() => {
    setOpen(false);
    // A second dismiss before the first exit timer fires must supersede it —
    // overwriting the ref without clearing would orphan the first timer, and
    // its setCurrent(null) would later wipe whatever a showSnackbar in
    // between put up (the show only clears the timer the ref still points
    // at).
    if (cleanupTimerRef.current) {
      clearTimeout(cleanupTimerRef.current);
    }
    cleanupTimerRef.current = setTimeout(() => {
      setCurrent(null);
      cleanupTimerRef.current = null;
    }, SNACKBAR_EXIT_MS);
  }, []);

  const showSnackbar = useCallback((options: SnackbarOptions) => {
    if (cleanupTimerRef.current) {
      clearTimeout(cleanupTimerRef.current);
      cleanupTimerRef.current = null;
    }
    setCurrent(options);
    setOpen(true);
  }, []);

  const updateSnackbar = useCallback((partial: Partial<SnackbarOptions>) => {
    setCurrent((prev) => (prev ? { ...prev, ...partial } : prev));
  }, []);

  const registerOutlet = useCallback(() => {
    setOutletCount((c) => c + 1);
    return () => setOutletCount((c) => c - 1);
  }, []);

  useEffect(() => {
    return () => {
      if (cleanupTimerRef.current) {
        clearTimeout(cleanupTimerRef.current);
      }
    };
  }, []);

  const hasOutlet = outletCount > 0;

  const contextValue = useMemo(
    () => ({
      showSnackbar,
      updateSnackbar,
      dismissSnackbar,
      _internal: { current, open, registerOutlet },
    }),
    [showSnackbar, updateSnackbar, dismissSnackbar, current, open, registerOutlet],
  );

  return (
    <SnackbarContext.Provider value={contextValue}>
      {children}
      {!hasOutlet && current && (
        <Snackbar
          message={current.message}
          variant={current.variant}
          action={current.action}
          secondaryAction={current.secondaryAction}
          loading={current.loading}
          duration={current.duration}
          onDismiss={dismissSnackbar}
          open={open}
        />
      )}
    </SnackbarContext.Provider>
  );
}

export function useSnackbar() {
  const context = useContext(SnackbarContext);
  if (context === undefined) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return {
    showSnackbar: context.showSnackbar,
    updateSnackbar: context.updateSnackbar,
    dismissSnackbar: context.dismissSnackbar,
  };
}

/** Whether a snackbar is currently visible — true from show until dismiss
 *  starts the exit animation. Safe outside a SnackbarProvider (always false).
 *  AppShell uses it to slide the mobile bottom nav out of the snackbar's way. */
export function useSnackbarVisible() {
  return useContext(SnackbarContext)?._internal.open ?? false;
}

export interface UseUnsavedSnackbarOptions {
  snapshot: string;
  message?: string;
  /**
   * Persist the pending edits.
   *
   * 🔴 RETURN A PROMISE AND THE CONFIRMATION WAITS FOR IT. Without one this
   * hook has no way to know whether the save happened, so it assumes it did:
   * it marks the form clean and toasts "Saved" on the next tick. For anything
   * that can be interrupted — a step-up reauth dialog, a slow request, a 403 —
   * that means success is announced before the write, and a FAILED save leaves
   * the bar dismissed with the edits unretryable.
   *
   * A void return keeps the old fire-and-forget behaviour.
   */
  onSave: () => void | Promise<unknown>;
  onReset: () => void;
  /**
   * Text for the confirmation toast. `null` suppresses it — for callers that
   * announce their own outcome (localized, or distinguishing what was saved),
   * so the user does not get two toasts for one action.
   */
  savedMessage?: string | null;
}

interface BaselineHandle {
  current: string;
}

/**
 * The `{ current }` handle `useUnsavedSnackbar` hands back — a baseline that
 * RENDERS when it is written.
 *
 * 🔴 MODULE SCOPE, NOT A CLOSURE IN THE HOOK. Accessors defined inside the hook
 * capture the whole mount render's scope for as long as the handle lives, which
 * pins that render's `options` — and through it the caller's `onSave`/`onReset`
 * and everything they close over — for the lifetime of the component. Taking
 * the two things it actually needs as arguments retains nothing else.
 *
 * The equality guard is not an optimization detail, it is what makes a caller
 * that rebases the baseline on every clean render cost nothing. React's own
 * same-value bailout does NOT cover this: after the first update one fiber of
 * the pair always carries a stale lane, so the eager path is skipped and an
 * identical value still schedules a render.
 *
 * 🔴 THE BASELINE MUST STAY A STRING. Both the guard here and `isDirty` compare
 * with `Object.is`, so a caller re-deriving an equal snapshot settles. Widen it
 * to an object and a caller effect with no dep array becomes an infinite loop.
 */
function makeBaselineHandle(
  mirror: { current: string },
  commit: (next: string) => void,
): BaselineHandle {
  return {
    get current() {
      return mirror.current;
    },
    set current(next: string) {
      if (mirror.current === next) return;
      mirror.current = next;
      commit(next);
    },
  };
}

export function useUnsavedSnackbar(options: UseUnsavedSnackbarOptions) {
  const { showSnackbar, dismissSnackbar } = useSnackbar();
  /**
   * The baseline the snapshot is compared against — STATE, not a ref, because
   * writing it has to be able to bring the bar back.
   *
   * 🔴 A REF WRITE CANNOT RE-RUN THE `[isDirty]` EFFECT. `isDirty` is derived
   * during render, so the only thing that re-evaluates it is a render. When
   * the baseline lived in a plain ref, every write that happened OUTSIDE a
   * render — `restore()` on a rejected save, or a caller rebasing
   * `savedRef.current` from a promise handler — mutated the comparand and then
   * waited for someone else to re-render. If nothing did, dirtiness was never
   * recomputed and the bar stayed dismissed with the edits still on screen.
   * That is exactly what a cancelled step-up dialog produced: the page's
   * `setState` for closing the dialog flushed BEFORE the rejection microtask,
   * so `restore()` was the last thing to happen and nothing rendered after it.
   *
   * `savedRef` below keeps the `{ current }` shape callers already write to —
   * the write now also schedules a render, so the comparison is always redone.
   */
  const [savedSnapshot, setSavedSnapshot] = useState(options.snapshot);
  /**
   * The same value again, as a ref. Load-bearing, for two reasons:
   *
   *   (a) `savedRef` has to keep ONE identity — callers put it in dep arrays —
   *       so its accessors are created once and cannot close over
   *       `savedSnapshot`, which would freeze them at the first render's value.
   *   (b) `previousBaseline` in the Save handler below must read the LATEST
   *       baseline. That closure is installed only on the clean→dirty
   *       transition, so a caller that rebases the baseline while the form is
   *       already dirty never reinstalls it, and reading state there would
   *       restore a value two writes old.
   */
  const savedMirror = useRef(options.snapshot);
  // Created once (useRef, not an empty-dep useMemo, which React may discard)
  // and lazily, so the accessors are not reallocated on every render.
  const handle = useRef<BaselineHandle | null>(null);
  handle.current ??= makeBaselineHandle(savedMirror, setSavedSnapshot);
  const savedRef = handle.current;
  const isDirty = options.snapshot !== savedSnapshot;
  const prevDirty = useRef(false);

  // Keep latest callbacks/snapshot in refs so snackbar onClick always uses current values
  const optionsRef = useRef(options);
  optionsRef.current = options;

  useEffect(() => {
    if (isDirty && !prevDirty.current) {
      showSnackbar({
        message: options.message ?? "Unsaved changes",
        variant: "unsave",
        duration: 0,
        action: {
          label: "Save",
          onClick: () => {
            // Held so a failed save can put the bar back exactly as it was.
            const previousBaseline = savedRef.current;
            savedRef.current = optionsRef.current.snapshot;
            prevDirty.current = false;
            dismissSnackbar();

            const confirm = () => {
              const saved = optionsRef.current.savedMessage;
              // null = the caller announces its own outcome.
              if (saved === null) return;
              setTimeout(() => {
                showSnackbar({ message: saved ?? "Saved", variant: "success" });
              }, 50);
            };
            // 🔴 A FAILED SAVE MUST LEAVE THE EDITS ON SCREEN. Restoring the
            // baseline makes the form dirty again, which brings the bar back so
            // the work can be retried — dismissing it and keeping the draft
            // would strand edits with no way to submit them.
            //
            // Runs in a rejection microtask, long after the click scheduled it:
            // this write is the only thing left that can render the bar.
            const restore = () => {
              savedRef.current = previousBaseline;
            };

            const result = optionsRef.current.onSave();
            if (result && typeof (result as Promise<unknown>).then === "function") {
              void (result as Promise<unknown>).then(confirm, restore);
            } else {
              confirm();
            }
          },
        },
        secondaryAction: {
          label: "Reset",
          onClick: () => {
            prevDirty.current = false;
            optionsRef.current.onReset();
            dismissSnackbar();
          },
        },
      });
    } else if (!isDirty && prevDirty.current) {
      dismissSnackbar();
    }
    prevDirty.current = isDirty;
    // Show/dismiss must fire only on dirtiness transitions; callbacks and
    // message are read through optionsRef so they stay current without
    // retriggering the effect.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDirty, options.snapshot]);

  return { isDirty, savedRef };
}

export interface SnackbarOutletProps {
  className?: string;
}

/**
 * Place inside a content area to center the snackbar over that area.
 * Pass a className to offset for sidebars (e.g. "lg:left-72").
 */
export function SnackbarOutlet({ className }: SnackbarOutletProps) {
  const context = useContext(SnackbarContext);
  const registerOutlet = context?._internal.registerOutlet;

  useEffect(() => {
    return registerOutlet?.();
  }, [registerOutlet]);

  if (!context) return null;

  const { _internal, dismissSnackbar } = context;
  const { current, open } = _internal;

  if (!current && !open) return null;

  return (
    <Snackbar
      message={current?.message ?? ""}
      variant={current?.variant}
      action={current?.action}
      secondaryAction={current?.secondaryAction}
      loading={current?.loading}
      duration={current?.duration}
      onDismiss={dismissSnackbar}
      open={open}
      inline
      className={className}
    />
  );
}
