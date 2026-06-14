import { useState, useRef, useEffect, type ReactNode } from "react";
import { cn } from "@/utils/cn";
import type { ComponentMeta } from "@/types/component-meta";
import { IconButton } from "@/components/ui/actions/icon-button/IconButton";
import {
  SidebarProvider,
  useSidebarWidth,
  type SidebarWidthPersistence,
} from "@/context/sidebar/SidebarProvider";
import {
  SnackbarProvider,
  SnackbarOutlet,
  useSnackbarVisible,
} from "@/context/snackbar/SnackbarProvider";
import { AgentSidebarHeader } from "@/components/ui/agent/sidebar/AgentSidebarHeader";
import type { AgentSidebarHeaderProps } from "@/components/ui/agent/sidebar/AgentSidebarHeader";
import { AgentSidebarInput } from "@/components/ui/agent/sidebar/AgentSidebarInput";
import type {
  AgentSidebarInputModel,
  AgentSidebarInputProps,
} from "@/components/ui/agent/sidebar/AgentSidebarInput";
import type { AgentSidebarHistoryGroup } from "@/components/ui/agent/sidebar/types";
import {
  AGENT_EMPTY_STATE_LOGO,
  type AgentSidebarMessagesProps,
} from "@/components/ui/agent/messages/AgentSidebarMessages";

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
   *  Shown on the side at lg+, hidden below it (use mobileNavigation for mobile). */
  navigation?: ReactNode;
  /** Mobile navigation slot — how `navigation` translates below lg (it's
   *  hidden there). With the "bottom" variant, inject a horizontal
   *  NavigationRail to mirror the side rail as a bottom-nav pill. With
   *  "drawer", this is the drawer's content — omit it to reuse `navigation`. */
  mobileNavigation?: ReactNode;
  /** How mobile navigation is hosted below lg:
   *  - `"bottom"` (default) — mobileNavigation pinned to the content area's
   *    bottom edge as a bar.
   *  - `"drawer"` — a menu button opens mobileNavigation (or `navigation`
   *    when not set) as a modal slide-in drawer. */
  mobileNavigationVariant?: "bottom" | "drawer";
  /** App switcher slot — positioned top-left after nav area */
  appSwitcher?: ReactNode;
  /** Injected server-side sidebar-width persistence (docs 12.4 + 13b). When
   *  wired, the rail width becomes ONE shared per-user value across every
   *  platform host (read on mount, written on resize-end through the host's
   *  shared agent client) instead of per-origin localStorage. Omit it for
   *  in-memory-only width — Storybook and pre-migration hosts keep working,
   *  width just doesn't persist. */
  sidebarWidthPersistence?: SidebarWidthPersistence;
  /** Controlled sidebar open/closed. Wire it to the host's persisted session
   *  open flag (`useAgentSession().open`) so a reload repaints the sidebar in
   *  the state the user left it — without it the shell derives visibility from
   *  width alone and always paints closed on reload. When `true` while the
   *  width is still 0 (fresh open, or restored-open before the width fetch
   *  lands) the shell seeds the width from the remembered/half-viewport size;
   *  when `false` while open it collapses to 0. Omit it (undefined) to keep the
   *  uncontrolled width-derived behavior unchanged. */
  open?: boolean;
  /** Called whenever the user opens or closes the sidebar (toggle, close,
   *  FAB). Pair with `open` to persist the flag — e.g.
   *  `useAgentSession().setOpen`. */
  onOpenChange?: (open: boolean) => void;
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
  /** Personalized opener shown in the agent body when no `agentSidebarContent`
   *  is wired (e.g. before any conversation exists) — typically a host
   *  greeting like "Hi, Sam, ask me anything about this app". Re-exports the
   *  inner `AgentSidebarMessages` `emptyState` slot so a host that renders the
   *  list itself and one that lets the shell render it agree on the same type.
   *  Undefined-safe: omit it and the body falls back to `agentSidebarContent`. */
  agentEmptyState?: AgentSidebarMessagesProps["emptyState"];
  /** Hide the MirrorStack logo the shell paints above `agentEmptyState`.
   *  Defaults to false (logo shown) — mirrors the inner
   *  `AgentSidebarMessages` `hideEmptyStateLogo`, so a host that lets the shell
   *  render the opener gets the same branded hero as one rendering the list
   *  itself. No-op when `agentEmptyState` is omitted. */
  hideAgentEmptyStateLogo?: AgentSidebarMessagesProps["hideEmptyStateLogo"];
  onAgentSend?: (message: string) => void;
  onAgentAttachFile?: () => void;
  onAgentMic?: () => void;
  /** Past conversations grouped by date — shown in the agent header history dropdown. */
  agentHistory?: AgentSidebarHistoryGroup[];
  onSelectAgentHistoryItem?: (id: string) => void;
  /** Controlled tab list for the agent header. Provide together with
   *  activeAgentTabId/onSelectAgentTab/onCloseAgentTab/onNewAgentTab; omit all
   *  five to keep the header's internal uncontrolled tab state. */
  agentTabs?: AgentSidebarHeaderProps["tabs"];
  /** Controlled active agent tab id. */
  activeAgentTabId?: AgentSidebarHeaderProps["activeTabId"];
  /** Called when the user clicks an agent tab. Consumer updates activeAgentTabId. */
  onSelectAgentTab?: AgentSidebarHeaderProps["onSelectTab"];
  /** Called when the user clicks the X on an agent tab. Consumer removes it from agentTabs. */
  onCloseAgentTab?: AgentSidebarHeaderProps["onCloseTab"];
  /** Called when the user clicks + or the overflow "New chat" entry. Consumer appends a tab. */
  onNewAgentTab?: AgentSidebarHeaderProps["onNewTab"];
  /** Enables the hover rename affordance on agent history rows.
   *  Called with the trimmed title (1-200 chars) when the user commits an inline rename. */
  onRenameAgentConversation?: AgentSidebarHeaderProps["onRenameConversation"];
  /** Enables the hover delete affordance on agent history rows. Confirmation
   *  (if any) is the consumer's responsibility; the kit fires immediately. */
  onDeleteAgentConversation?: AgentSidebarHeaderProps["onDeleteConversation"];
  /** Label overrides for the agent header (history, rename, new-chat strings).
   *  All have EN defaults. */
  agentHeaderLabels?: AgentSidebarHeaderProps["labels"];
  /** Messages waiting to send once the current reply finishes — rendered as
   *  cancellable rows above the agent input, in send order. Display-only:
   *  queueing logic lives in the consumer. */
  agentQueuedMessages?: AgentSidebarInputProps["queuedMessages"];
  /** Called with the queued row's id when its X is clicked. */
  onCancelAgentQueued?: AgentSidebarInputProps["onCancelQueued"];
  /** Slot pinned directly above the agent input — used for messages the user
   *  sent while the agent was still responding (queued input). Stays in view
   *  with the input even when the messages list scrolls. */
  agentPendingContent?: ReactNode;
  /** Model roster for the agent input's model selector — omitted = no selector. */
  agentModels?: AgentSidebarInputModel[];
  selectedAgentModelId?: string;
  onSelectAgentModel?: (id: string) => void;
  /** Placeholder for the agent input textarea. Default: "Type a message..." */
  agentInputPlaceholder?: AgentSidebarInputProps["placeholder"];
  /** Label overrides for the agent input (queued-message strings).
   *  All have EN defaults. */
  agentInputLabels?: AgentSidebarInputProps["labels"];
}

export function AppShell({
  sidebarWidthPersistence,
  ...props
}: AppShellProps) {
  return (
    // Start closed (0); persist the drag-resized OPEN width so it survives
    // reload AND carries across hosts. Width lives in the injected server
    // persistence (docs 12.4 + 13b) — ONE shared per-user value, NOT per-origin
    // localStorage; omit it and the width is in-memory only. minOpenWidth
    // matches the resize floor below; the provider clamps a rehydrated value to
    // [MIN_WIDTH, viewport] and ignores corrupt/oversized stored values.
    <SidebarProvider
      defaultWidth={0}
      widthPersistence={sidebarWidthPersistence}
      minOpenWidth={MIN_WIDTH}
    >
      <SnackbarProvider>
        <AppShellInner {...props} />
      </SnackbarProvider>
    </SidebarProvider>
  );
}

/** Hosts mobile navigation as a modal drawer below lg: a floating menu button
 *  opens the content in a slide-in panel over a scrim. Closes on scrim tap,
 *  Escape, or any link/button activation inside (a nav selection). */
function MobileNavDrawerRegion({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    panelRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="lg:!hidden">
      <IconButton
        icon="menu"
        variant="tonal"
        size="md"
        className="absolute bottom-2 left-2 z-20"
        onClick={() => setOpen(true)}
        aria-label="Open navigation"
        aria-expanded={open}
      />

      {open && (
        <div className="fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/20" onClick={() => setOpen(false)} />
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
            tabIndex={-1}
            // `starting:` holds the panel off-canvas on mount so transition-all
            // slides it in — same pattern as the agent sidebar's starting:!w-0.
            className="absolute inset-y-0 left-0 w-fit max-w-[85vw] overflow-y-auto overscroll-contain bg-background shadow-2xl outline-none transition-transform duration-300 starting:-translate-x-full"
            // A tap that activates a link or button inside is a navigation
            // selection — dismiss the drawer with it (M3 modal drawer behavior).
            onClickCapture={(e) => {
              if ((e.target as HTMLElement).closest("a, button")) setOpen(false);
            }}
          >
            {children}
          </div>
        </div>
      )}
    </div>
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
  mobileNavigation,
  mobileNavigationVariant = "bottom",
  appSwitcher,
  open,
  onOpenChange,
  className,
  appSwitcherClassName = "max-w-7xl",
  contentClassName,
  navClassName,
  snackbarClassName,
  agentSidebarContent,
  agentEmptyState,
  hideAgentEmptyStateLogo = false,
  onAgentSend,
  onAgentAttachFile,
  onAgentMic,
  agentHistory,
  onSelectAgentHistoryItem,
  agentTabs,
  activeAgentTabId,
  onSelectAgentTab,
  onCloseAgentTab,
  onNewAgentTab,
  onRenameAgentConversation,
  onDeleteAgentConversation,
  agentHeaderLabels,
  agentQueuedMessages,
  onCancelAgentQueued,
  agentPendingContent,
  agentModels,
  selectedAgentModelId,
  onSelectAgentModel,
  agentInputPlaceholder,
  agentInputLabels,
}: AppShellProps) {
  const { sidebarWidth, setSidebarWidth, lastOpenWidth } = useSidebarWidth();
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

  // Sidebar visibility: controlled by `open` when the host wires it (restores
  // the persisted open flag on reload), else derived from width alone
  // (uncontrolled — behavior unchanged when `open` is undefined).
  const isOpen = open ?? sidebarWidth > 0;

  const isOverlaying =
    isOpen &&
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

  // Reopen to the user's remembered (persisted) width, clamped to the live
  // viewport. Falls back to half the viewport when no wider width was ever
  // recorded (lastOpenWidth still at the MIN_WIDTH floor).
  const reopenWidth = () => {
    const remembered =
      lastOpenWidth > MIN_WIDTH
        ? lastOpenWidth
        : (windowWidth || 1000) * 0.5;
    return Math.min(Math.max(remembered, MIN_WIDTH), maxWidthRef.current);
  };

  // When `open` is controlled, keep the rendered width in lockstep with it:
  // open === true while the width is still 0 (fresh open, or a reload that
  // restored open:true before the async width fetch landed) seeds the width;
  // open === false while open collapses it. The width fetch's own reconcile
  // (SidebarProvider) only touches a default-0 width, so the two don't fight:
  // the first one to land wins and the other no-ops. Uncontrolled
  // (open === undefined) skips this entirely.
  useEffect(() => {
    if (open === undefined) return;
    if (open && sidebarWidth === 0) setSidebarWidth(reopenWidth());
    else if (!open && sidebarWidth > 0) setSidebarWidth(0);
    // reopenWidth reads refs/state captured per render; depend on the inputs
    // that actually change the decision.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, sidebarWidth]);

  // Open/close the sidebar AND notify the host so it can persist the flag.
  // When uncontrolled (`onOpenChange` omitted) only the width changes.
  const openSidebar = () => {
    setSidebarWidth(reopenWidth());
    onOpenChange?.(true);
  };

  const handleToggleCollapse = () => {
    if (sidebarWidth <= MIN_WIDTH) {
      setSidebarWidth(reopenWidth());
    } else {
      setSidebarWidth(MIN_WIDTH);
    }
  };

  const handleClose = () => {
    setSidebarWidth(0);
    onOpenChange?.(false);
  };

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
                    // Responsive gutters — tight on phones, roomier as the
                    // viewport grows. Pages must NOT add their own horizontal
                    // padding (it would double up); they own max-width only.
                    "mx-auto w-full px-4 md:px-8 xl:px-12 pt-12",
                    // Clear the pinned mobile bottom nav so content isn't hidden
                    // behind it. No-op at lg+, with no mobile navigation, and
                    // for the drawer variant (an overlay, not a pinned bar).
                    mobileNavigation && mobileNavigationVariant === "bottom"
                      ? "pb-28 lg:pb-16"
                      : "pb-16",
                    contentClassName,
                  )}
                >
                  {children}
                </div>
              </main>
              <SnackbarOutlet className={snackbarClassName} />

              {mobileNavigationVariant === "drawer"
                ? (mobileNavigation ?? navigation) && (
                    <MobileNavDrawerRegion>
                      {mobileNavigation ?? navigation}
                    </MobileNavDrawerRegion>
                  )
                : mobileNavigation && (
                    <BottomNavRegion>{mobileNavigation}</BottomNavRegion>
                  )}
            </div>
          </div>
        </div>
      </div>

      {/* Right: agent sidebar. `starting:!w-0` compiles to an
          @starting-style block that holds width at 0 on mount, then
          transition-all interpolates up to the inline style — so open
          uses the same curve + duration as drag-end + collapse. */}
      {isOpen && sidebarWidth > 0 && (
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
                tabs={agentTabs}
                activeTabId={activeAgentTabId}
                onSelectTab={onSelectAgentTab}
                onCloseTab={onCloseAgentTab}
                onNewTab={onNewAgentTab}
                onRenameConversation={onRenameAgentConversation}
                onDeleteConversation={onDeleteAgentConversation}
                labels={agentHeaderLabels}
              />

              <div className="rounded-2xl bg-on-background flex-1 min-h-0 flex flex-col">
                <div className="flex-1 overflow-y-auto overflow-x-hidden p-4">
                  {/* The host's chat surface when wired; otherwise the
                      personalized empty-state opener under the brand logo
                      (undefined-safe — both may be omitted, leaving an empty
                      body). The logo only rides the shell-rendered opener; when
                      a host wires `agentSidebarContent` its own
                      `AgentSidebarMessages` owns the empty-state logo. */}
                  {agentSidebarContent ??
                    (agentEmptyState != null && (
                      <div className="flex flex-col gap-4">
                        {!hideAgentEmptyStateLogo && AGENT_EMPTY_STATE_LOGO}
                        {agentEmptyState}
                      </div>
                    ))}
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
                  placeholder={agentInputPlaceholder}
                  models={agentModels}
                  selectedModelId={selectedAgentModelId}
                  onSelectModel={onSelectAgentModel}
                  queuedMessages={agentQueuedMessages}
                  onCancelQueued={onCancelAgentQueued}
                  labels={agentInputLabels}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Agent toggle button */}
      {!isOpen && (
        <IconButton
          icon="smart_toy"
          variant="tonal"
          size="md"
          className="fixed top-2 right-2 z-50"
          onClick={openSidebar}
          aria-label="Open agent"
        />
      )}
    </div>
  );
}
