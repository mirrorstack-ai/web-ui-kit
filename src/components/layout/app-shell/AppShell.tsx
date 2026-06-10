import { useState, useRef, useEffect, type ReactNode } from "react";
import { cn } from "@/utils/cn";
import type { ComponentMeta } from "@/types/component-meta";
import { IconButton } from "@/components/ui/actions/icon-button/IconButton";
import { SidebarProvider, useSidebarWidth } from "@/context/sidebar/SidebarProvider";
import {
  SnackbarProvider,
  SnackbarOutlet,
  useSnackbarVisible,
} from "@/context/snackbar/SnackbarProvider";
import { AgentSidebarHeader } from "@/components/ui/agent/sidebar/AgentSidebarHeader";
import { AgentSidebarInput } from "@/components/ui/agent/sidebar/AgentSidebarInput";
import type { AgentSidebarHistoryGroup } from "@/components/ui/agent/sidebar/types";

export const meta: ComponentMeta = {
  name: "AppShell",
  description:
    "Top-level application layout with navigation, app switcher, resizable agent sidebar, and content area",
};

const MIN_WIDTH = 350;
const PADDING = 20;

export interface AppShellProps {
  children: ReactNode;
  /** Navigation slot — inject a NavigationRail, NavDrawer, or custom nav.
   *  Shown on the side at lg+, hidden below it (use bottomNavigation for mobile). */
  navigation?: ReactNode;
  /** Mobile navigation slot — pinned to the bottom of the content area below lg
   *  and hidden at lg+ (where `navigation` takes over). Inject a horizontal
   *  NavigationRail to mirror the side rail as a bottom-nav pill. */
  bottomNavigation?: ReactNode;
  /** App switcher slot — positioned top-left after nav area */
  appSwitcher?: ReactNode;
  /** Class for the outer shell */
  className?: string;
  /** Class for the app switcher container */
  appSwitcherClassName?: string;
  /** Class for the content area */
  contentClassName?: string;
  /** Class for the navigation wrapper (override responsive visibility) */
  navClassName?: string;
  /** Class for the snackbar container (e.g. max-w-2xl mx-auto) */
  snackbarClassName?: string;
  /** Agent sidebar chat content */
  agentSidebarContent?: ReactNode;
  onAgentSend?: (message: string) => void;
  onAgentAttachFile?: () => void;
  onAgentMic?: () => void;
  /** Past conversations grouped by date — shown in the agent header history dropdown. */
  agentHistory?: AgentSidebarHistoryGroup[];
  onSelectAgentHistoryItem?: (id: string) => void;
  /** Slot pinned directly above the agent input — used for messages the user
   *  sent while the agent was still responding (queued input). Stays in view
   *  with the input even when the messages list scrolls. */
  agentPendingContent?: ReactNode;
}

export function AppShell(props: AppShellProps) {
  return (
    <SidebarProvider defaultWidth={0}>
      <SnackbarProvider>
        <AppShellInner {...props} />
      </SnackbarProvider>
    </SidebarProvider>
  );
}

/** Pins the mobile bottom nav to the content area's bottom edge. Isolated so
 *  snackbar churn re-renders just this slot, not the whole shell. */
function BottomNavRegion({ children }: { children: ReactNode }) {
  const snackbarVisible = useSnackbarVisible();
  return (
    // `!important` on the responsive display/width: a mounted module bundle
    // injects its own global Tailwind CSS (plain `.flex` / `.w-full`) after
    // the host stylesheet, which would otherwise override our media-query
    // utilities (`lg:hidden`, `sm:w-auto`) and leak the bottom nav onto
    // desktop / force it full-width.
    <div
      className={cn(
        "absolute inset-x-0 bottom-2 z-20 flex justify-center px-2 lg:!hidden pointer-events-none",
        // Step aside while a snackbar is up — both pin to the same bottom
        // edge, and the snackbar is the transient, actionable one. Slides
        // back as soon as the snackbar starts exiting. `invisible` also
        // drops it from tab order / a11y tree while hidden (visibility
        // flips after the exit transition ends).
        "transition-all duration-300",
        snackbarVisible && "invisible translate-y-[150%] opacity-0",
      )}
    >
      {/* Full-width pill only on tight phone widths (<640px); content-width
          and centered from sm up. pointer-events re-enable only while shown —
          the wrapper's `none` is the inherited default. */}
      <div className={cn("w-full sm:!w-auto max-w-full", !snackbarVisible && "pointer-events-auto")}>
        {children}
      </div>
    </div>
  );
}

function AppShellInner({
  children,
  navigation,
  bottomNavigation,
  appSwitcher,
  className,
  appSwitcherClassName = "max-w-7xl",
  contentClassName,
  navClassName,
  snackbarClassName,
  agentSidebarContent,
  onAgentSend,
  onAgentAttachFile,
  onAgentMic,
  agentHistory,
  onSelectAgentHistoryItem,
  agentPendingContent,
}: AppShellProps) {
  const { sidebarWidth, setSidebarWidth } = useSidebarWidth();
  const [isResizing, setIsResizing] = useState(false);
  const [windowWidth, setWindowWidth] = useState(() =>
    typeof window === "undefined" ? 0 : window.innerWidth,
  );
  const startX = useRef(0);
  const startWidth = useRef(0);
  const maxWidthRef = useRef(800);
  const dragWidthRef = useRef(0);
  const sidebarElRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      setWindowWidth(window.innerWidth);
      maxWidthRef.current = window.innerWidth - PADDING;
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const isOverlaying =
    sidebarWidth > 0 &&
    windowWidth > 0 &&
    windowWidth < sidebarWidth + 800;

  const startResize = (e: React.MouseEvent) => {
    setIsResizing(true);
    startX.current = e.clientX;
    startWidth.current = sidebarWidth;
    document.body.style.cursor = "ew-resize";
    document.body.style.userSelect = "none";
  };

  useEffect(() => {
    if (!isResizing) return;

    const onMove = (e: MouseEvent) => {
      const diff = startX.current - e.clientX;
      const next = Math.min(Math.max(startWidth.current + diff, MIN_WIDTH), maxWidthRef.current);
      dragWidthRef.current = next;
      if (sidebarElRef.current) {
        sidebarElRef.current.style.width = `${next}px`;
      }
    };

    const onUp = () => {
      setSidebarWidth(dragWidthRef.current);
      setIsResizing(false);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isResizing, setSidebarWidth]);

  // Keep dragWidthRef in sync when sidebar opens
  useEffect(() => { dragWidthRef.current = sidebarWidth; }, [sidebarWidth]);

  const handleToggleCollapse = () => {
    if (sidebarWidth <= MIN_WIDTH) {
      setSidebarWidth(Math.min((windowWidth || 1000) * 0.5, maxWidthRef.current));
    } else {
      setSidebarWidth(MIN_WIDTH);
    }
  };

  const handleClose = () => setSidebarWidth(0);

  return (
    <div className="h-dvh flex bg-background text-on-background overflow-hidden">
      {/* Left: app content area */}
      <div className="flex-1 min-w-0 h-dvh overflow-hidden">
        <div className={cn("mx-auto w-full h-full relative", className)}>
          {appSwitcher && (
            <div className="absolute top-2 left-0 right-0 z-20 pointer-events-none">
              <div className={cn("mx-auto w-full px-1 lg:px-2 xl:px-4", appSwitcherClassName)}>
                <div className="pointer-events-auto w-fit">
                  {appSwitcher}
                </div>
              </div>
            </div>
          )}

          <div className="h-full flex">
            {navigation && (
              <div className={cn("hidden lg:flex flex-col h-full shrink-0 justify-center", navClassName)}>
                {navigation}
              </div>
            )}

            <div className="flex-1 min-w-0 flex flex-col h-full overflow-hidden relative py-4">
              <main className="relative flex-1 min-h-0 overflow-y-auto overflow-x-hidden">
                <div
                  className={cn(
                    // Responsive gutters — tighter on phones / laptops, full on
                    // wide desktops. Pages must NOT add their own horizontal
                    // padding (it would double up); they own max-width only.
                    "mx-auto w-full px-4 md:px-5 xl:px-6 pt-12",
                    // Clear the pinned mobile bottom nav so content isn't hidden
                    // behind it. No-op at lg+ and when no bottomNavigation is set.
                    bottomNavigation ? "pb-28 lg:pb-16" : "pb-16",
                    contentClassName,
                  )}
                >
                  {children}
                </div>
              </main>
              <SnackbarOutlet className={snackbarClassName} />

              {bottomNavigation && <BottomNavRegion>{bottomNavigation}</BottomNavRegion>}
            </div>
          </div>
        </div>
      </div>

      {/* Right: agent sidebar. `starting:!w-0` compiles to an
          @starting-style block that holds width at 0 on mount, then
          transition-all interpolates up to the inline style — so open
          uses the same curve + duration as drag-end + collapse. */}
      {sidebarWidth > 0 && (
        <div
          className={cn(
            "flex justify-end shrink-0 starting:!w-0",
            isOverlaying
              ? "fixed top-0 right-0 h-screen z-30"
              : "relative z-50",
            !isResizing && "transition-all duration-300",
          )}
          style={isOverlaying ? undefined : { width: `${sidebarWidth + 10}px` }}
        >
          {isOverlaying && (
            <div
              className="fixed inset-0 bg-black/20 -z-10"
              onClick={handleClose}
            />
          )}

          <div className="flex">
            <div
              className="w-2 flex cursor-ew-resize z-20 rounded-full hover:bg-primary-container transition-colors shrink-0"
              onMouseDown={startResize}
            />

            <div
              ref={sidebarElRef}
              className="overflow-hidden relative my-2 mr-2 flex flex-col"
              style={{ width: `${sidebarWidth}px`, height: "calc(100vh - 1rem)" }}
            >
              <AgentSidebarHeader
                sidebarWidth={sidebarWidth}
                onToggleCollapse={handleToggleCollapse}
                onClose={handleClose}
                history={agentHistory}
                onSelectHistoryItem={onSelectAgentHistoryItem}
              />

              <div className="rounded-2xl bg-on-background flex-1 min-h-0 flex flex-col">
                <div className="flex-1 overflow-y-auto overflow-x-hidden p-4">
                  {agentSidebarContent}
                </div>

                {agentPendingContent && (
                  <div className="shrink-0 mx-3 mt-2 mb-1 rounded-xl bg-inverse-on-surface/[0.06] backdrop-blur-md border border-inverse-on-surface/[0.08] p-3">
                    {agentPendingContent}
                  </div>
                )}

                <AgentSidebarInput
                  onSend={onAgentSend}
                  onAttachFile={onAgentAttachFile}
                  onMic={onAgentMic}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Agent toggle button */}
      {sidebarWidth === 0 && (
        <IconButton
          icon="smart_toy"
          variant="tonal"
          size="md"
          className="fixed top-2 right-2 z-50"
          onClick={() => setSidebarWidth(MIN_WIDTH)}
          aria-label="Open agent"
        />
      )}
    </div>
  );
}
