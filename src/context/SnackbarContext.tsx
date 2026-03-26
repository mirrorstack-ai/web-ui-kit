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
  type SnackbarVariant,
} from "../components/Snackbar";

export interface SnackbarOptions {
  message: string;
  variant?: SnackbarVariant;
  action?: { label: string; onClick: () => void };
  secondaryAction?: { label: string; onClick: () => void };
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

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined,
);

export function SnackbarProvider({ children }: { children: ReactNode }) {
  const [current, setCurrent] = useState<SnackbarOptions | null>(null);
  const [open, setOpen] = useState(false);
  const [outletCount, setOutletCount] = useState(0);
  const cleanupTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dismissSnackbar = useCallback(() => {
    setOpen(false);
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
      {/* Only render here if no SnackbarOutlet is mounted */}
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

/**
 * Place inside a content area to center the snackbar over that area.
 * Pass a className to offset for sidebars (e.g. "lg:left-72").
 */
export function SnackbarOutlet({ className }: { className?: string }) {
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
