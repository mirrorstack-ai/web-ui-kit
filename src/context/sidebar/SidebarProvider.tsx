import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export interface SidebarContextValue {
  /** Current sidebar width in pixels (0 = closed) */
  readonly width: number;
  /** Whether the sidebar is open */
  readonly isOpen: boolean;
  /** Open the sidebar to the given or default width */
  readonly open: (width?: number) => void;
  /** Close the sidebar (set width to 0) */
  readonly close: () => void;
  /** Toggle the sidebar open/close */
  readonly toggle: () => void;
  /** Resize the sidebar to a specific width */
  readonly resize: (width: number) => void;
}

export interface SidebarProviderProps {
  readonly children: ReactNode;
  /** Default sidebar width when opened (defaults to 240) */
  readonly defaultWidth?: number;
  /** Initial width (0 = closed) */
  readonly initialWidth?: number;
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

const DEFAULT_WIDTH = 240;

export function SidebarProvider({
  children,
  defaultWidth = DEFAULT_WIDTH,
  initialWidth = 0,
}: SidebarProviderProps) {
  const [width, setWidth] = useState(initialWidth);

  const isOpen = width > 0;

  const open = useCallback(
    (w?: number) => {
      setWidth(w ?? defaultWidth);
    },
    [defaultWidth],
  );

  const close = useCallback(() => {
    setWidth(0);
  }, []);

  const toggle = useCallback(() => {
    setWidth((prev) => (prev > 0 ? 0 : defaultWidth));
  }, [defaultWidth]);

  const resize = useCallback((w: number) => {
    setWidth(Math.max(0, w));
  }, []);

  const value = useMemo<SidebarContextValue>(
    () => ({ width, isOpen, open, close, toggle, resize }),
    [width, isOpen, open, close, toggle, resize],
  );

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
}

export function useSidebar(): SidebarContextValue {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}
