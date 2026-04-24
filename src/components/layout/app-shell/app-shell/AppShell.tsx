import { useState, useRef, useEffect, type ReactNode } from "react";
import { cn } from "@/utils/cn";
import type { ComponentMeta } from "@/types/component-meta";
import { IconButton } from "@/components/ui/actions/icon-button/IconButton";
import { SidebarProvider, useSidebarWidth } from "@/context/sidebar/SidebarProvider";
import { AgentSidebarHeader } from "@/components/ui/surfaces/agent-sidebar/AgentSidebarHeader";
import { AgentSidebarInput } from "@/components/ui/surfaces/agent-sidebar/AgentSidebarInput";

export const meta: ComponentMeta = {
  name: "AppShell",
  description:
    "Top-level application layout with navigation, app switcher, resizable agent sidebar, and content area",
};

const MIN_WIDTH = 350;
const PADDING = 20;

export interface AppShellProps {
  children: ReactNode;
  /** Navigation slot — inject a NavigationRail, NavDrawer, or custom nav */
  navigation?: ReactNode;
  /** App switcher slot — positioned top-left after nav area */
  appSwitcher?: ReactNode;
  /** Class for the outer shell */
  className?: string;
  /** Class for the app switcher container */
  appSwitcherClassName?: string;
  /** Class for the content area */
  contentClassName?: string;
  /** Agent sidebar chat content */
  agentSidebarContent?: ReactNode;
  onAgentSend?: (message: string) => void;
  onAgentAttachFile?: () => void;
  onAgentMic?: () => void;
}

export function AppShell(props: AppShellProps) {
  return (
    <SidebarProvider defaultWidth={0}>
      <AppShellInner {...props} />
    </SidebarProvider>
  );
}

function AppShellInner({
  children,
  navigation,
  appSwitcher,
  className,
  appSwitcherClassName = "max-w-7xl",
  contentClassName,
  agentSidebarContent,
  onAgentSend,
  onAgentAttachFile,
  onAgentMic,
}: AppShellProps) {
  const { sidebarWidth, setSidebarWidth } = useSidebarWidth();
  const [isResizing, setIsResizing] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
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
            <div className="hidden lg:block absolute top-2 left-0 right-0 z-20 pointer-events-none">
              <div className={cn("mx-auto w-full px-4", appSwitcherClassName)}>
                <div className="pointer-events-auto w-fit">
                  {appSwitcher}
                </div>
              </div>
            </div>
          )}

          <div className="h-full flex">
            {navigation && (
              <div className="hidden lg:flex h-full shrink-0 items-center [&>*]:h-auto">
                {navigation}
              </div>
            )}

            <div className="flex-1 min-w-0 flex flex-col h-full overflow-hidden relative">
              <main className="relative flex-1 min-h-0 overflow-y-auto overflow-x-hidden">
                <div
                  className={cn(
                    "mx-auto w-full px-6 pb-8",
                    appSwitcher ? "pt-20" : "pt-6",
                    contentClassName,
                  )}
                >
                  {children}
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>

      {/* Right: agent sidebar */}
      {sidebarWidth > 0 && (
        <div
          className={cn(
            "flex justify-end shrink-0",
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
              />

              <div className="rounded-2xl bg-on-background h-full flex flex-col">
                <div className="flex-1 overflow-y-auto overflow-x-hidden p-4">
                  {agentSidebarContent}
                </div>

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
