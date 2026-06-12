import { useState, useRef, useEffect, useCallback, useLayoutEffect } from "react";
import { flushSync } from "react-dom";
import { cn } from "@/utils/cn";
import { isDev } from "@/utils/env";
import { IconButton } from "@/components/ui/actions/icon-button/IconButton";
import { Icon } from "@/components/ui/media/icon/Icon";
import { Notch } from "@/components/ui/surfaces/notch/Notch";
import { useClickOutside } from "@/hooks/useClickOutside";
import type { AgentSidebarHeaderLabels, AgentSidebarHistoryGroup, ChatTab } from "./types";

export interface AgentSidebarHeaderProps {
  sidebarWidth: number;
  onToggleCollapse: () => void;
  onClose: () => void;
  /** Past conversations grouped by date — shown in the arrow-down dropdown. */
  history?: AgentSidebarHistoryGroup[];
  onSelectHistoryItem?: (id: string) => void;
  /** Controlled tab list. Provide together with activeTabId/onSelectTab/onCloseTab/onNewTab;
   *  omit all five to keep the internal uncontrolled tab state. */
  tabs?: ChatTab[];
  /** Controlled active tab id. */
  activeTabId?: string;
  /** Called when the user clicks a tab. Consumer updates activeTabId. */
  onSelectTab?: (id: string) => void;
  /** Called when the user clicks the X on a tab. Consumer removes it from tabs. */
  onCloseTab?: (id: string) => void;
  /** Called when the user clicks + or the overflow "New chat" entry. Consumer appends a tab. */
  onNewTab?: () => void;
  /** Enables the hover rename affordance on history rows.
   *  Called with the trimmed title (1-200 chars) when the user commits an inline rename. */
  onRenameConversation?: (id: string, title: string) => void;
  /** Enables the hover delete affordance on history rows. Confirmation (if any)
   *  is the consumer's responsibility; the kit fires immediately. */
  onDeleteConversation?: (id: string) => void;
  /** Label overrides. All have EN defaults. */
  labels?: AgentSidebarHeaderLabels;
}

const TAB_WIDTH = 100;
const GAP = 6;
const ADD_BTN = 40;

// Active tab notch (headOnly)
const TAB_R = 12;
const TAB_IR = 12;
const HEADER_H = 40;

// History dropdown
const HIST_W = 260;
const HIST_NOTCH_H = 24;

// Overflow dropdown notch dimensions
const DD_W = 260;
const DD_NOTCH_W = 32; // matches IconButton sm
const DD_NOTCH_H = 24; // full IconButton sm height (h-8)
const DD_R = 8;
const DD_IR = 8;

export function AgentSidebarHeader({
  sidebarWidth,
  onToggleCollapse,
  onClose,
  history,
  onSelectHistoryItem,
  tabs: propTabs,
  activeTabId: propActiveTabId,
  onSelectTab,
  onCloseTab,
  onNewTab,
  onRenameConversation,
  onDeleteConversation,
  labels,
}: AgentSidebarHeaderProps) {
  const isCollapsed = sidebarWidth <= 350;

  const isControlled =
    propTabs !== undefined &&
    propActiveTabId !== undefined &&
    onSelectTab !== undefined &&
    onCloseTab !== undefined &&
    onNewTab !== undefined;

  if (isDev && !isControlled) {
    const wired = [propTabs, propActiveTabId, onSelectTab, onCloseTab, onNewTab].filter(
      (p) => p !== undefined,
    ).length;
    if (wired > 0) {
      console.warn(
        "[AgentSidebarHeader] Partial controlled-tabs wiring detected — falling back to uncontrolled. Provide all five of: tabs, activeTabId, onSelectTab, onCloseTab, onNewTab.",
      );
    }
  }

  // Internal state — used only in uncontrolled mode.
  const [internalTabs, setInternalTabs] = useState<ChatTab[]>([{ id: "1", title: "Chat 1" }]);
  const [internalActiveTabId, setInternalActiveTabId] = useState("1");

  const tabs = isControlled ? propTabs! : internalTabs;
  const activeTabId = isControlled ? propActiveTabId! : internalActiveTabId;

  const [visibleCount, setVisibleCount] = useState(tabs.length);
  const [showOverflow, setShowOverflow] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const nextIdRef = useRef(2);
  const headerRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLDivElement>(null);
  const [activeTabRect, setActiveTabRect] = useState<{ left: number; width: number } | null>(null);
  const historyBtnRef = useRef<HTMLDivElement>(null);
  const historyDropdownRef = useRef<HTMLDivElement>(null);
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const overflowRef = useRef<HTMLDivElement>(null);
  const triggerBtnRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const ddContentRef = useRef<HTMLDivElement>(null);
  const [ddContentH, setDdContentH] = useState(0);
  const [ddNotchX, setDdNotchX] = useState(0);
  const histContentRef = useRef<HTMLDivElement>(null);
  const [histContentH, setHistContentH] = useState(0);

  // Inline history-row rename.
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const editInputRef = useRef<HTMLInputElement>(null);

  const calculateVisible = useCallback(() => {
    if (!tabsContainerRef.current) return;
    const container = tabsContainerRef.current.clientWidth;
    const spaceForAll = tabs.length * TAB_WIDTH + (tabs.length - 1) * GAP;

    if (spaceForAll <= container) {
      setVisibleCount(tabs.length);
      return;
    }

    const available = container - ADD_BTN;
    const count = Math.floor((available + GAP) / (TAB_WIDTH + GAP));
    setVisibleCount(Math.max(1, count));
  }, [tabs.length]);

  useEffect(() => {
    calculateVisible();
    const el = tabsContainerRef.current;
    if (!el) return;
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(calculateVisible);
    observer.observe(el);
    return () => observer.disconnect();
  }, [calculateVisible]);

  let visibleTabs = tabs.slice(0, visibleCount);
  let overflowTabs = tabs.slice(visibleCount);
  const activeIdx = tabs.findIndex((t) => t.id === activeTabId);
  if (activeIdx >= visibleCount && visibleCount > 0) {
    const swapped = [...tabs];
    [swapped[activeIdx], swapped[visibleCount - 1]] = [swapped[visibleCount - 1], swapped[activeIdx]];
    visibleTabs = swapped.slice(0, visibleCount);
    overflowTabs = swapped.slice(visibleCount);
  }

  useClickOutside({
    refs: [overflowRef, dropdownRef],
    onDismiss: () => setShowOverflow(false),
    enabled: showOverflow,
  });

  useClickOutside({
    refs: [historyBtnRef, historyDropdownRef],
    onDismiss: () => setShowHistory(false),
    enabled: showHistory,
  });

  // Every close path (toggle button, item select, click-outside, Escape)
  // also exits inline-rename, so reopening never resumes a stale edit.
  useEffect(() => {
    if (!showHistory) setEditingId(null);
  }, [showHistory]);

  useLayoutEffect(() => {
    if (!showHistory || !histContentRef.current) return;
    setHistContentH(histContentRef.current.offsetHeight);
  }, [showHistory, history]);

  useLayoutEffect(() => {
    const tab = activeTabRef.current;
    const header = headerRef.current;
    if (!tab || !header) { setActiveTabRect(null); return; }
    const measure = () => {
      const tRect = tab.getBoundingClientRect();
      const hRect = header.getBoundingClientRect();
      return { left: tRect.left - hRect.left, width: tRect.width };
    };
    setActiveTabRect(measure());
    if (typeof ResizeObserver === "undefined") return;
    // flushSync commits the notch position in the same frame the
    // ResizeObserver fired — without it, RO → setState → render lags
    // one frame behind the tab DOM during a live sidebar drag, which
    // reads as a soft trailing curve on the notch.
    const observer = new ResizeObserver(() => {
      const next = measure();
      flushSync(() =>
        setActiveTabRect((prev) =>
          prev && prev.left === next.left && prev.width === next.width ? prev : next,
        ),
      );
    });
    observer.observe(tab);
    return () => observer.disconnect();
  }, [activeTabId, visibleCount, tabs.length]);

  useLayoutEffect(() => {
    if (!showOverflow || !ddContentRef.current) return;
    setDdContentH(ddContentRef.current.offsetHeight);
    const triggerBtn = triggerBtnRef.current;
    const dd = dropdownRef.current;
    if (triggerBtn && dd) {
      const btnRect = triggerBtn.getBoundingClientRect();
      const ddRect = dd.getBoundingClientRect();
      setDdNotchX(btnRect.left - ddRect.left);
    }
  }, [showOverflow, overflowTabs.length]);

  const handleAddTab = () => {
    if (isControlled) {
      onNewTab!();
      return;
    }
    const id = String(nextIdRef.current++);
    setInternalTabs((prev) => [...prev, { id, title: `Chat ${id}` }]);
    setInternalActiveTabId(id);
  };

  const handleSelectTab = (id: string) => {
    if (isControlled) onSelectTab!(id);
    else setInternalActiveTabId(id);
  };

  const handleCloseTab = (tabId: string) => {
    if (isControlled) {
      onCloseTab!(tabId);
      return;
    }
    if (internalTabs.length === 1) return;
    const idx = internalTabs.findIndex((t) => t.id === tabId);
    const newTabs = internalTabs.filter((t) => t.id !== tabId);
    setInternalTabs(newTabs);
    if (tabId === internalActiveTabId) {
      const next = newTabs[Math.min(idx, newTabs.length - 1)];
      if (next) setInternalActiveTabId(next.id);
    }
  };

  return (
    <div ref={headerRef} className="relative flex items-center h-10 shrink-0">
      {/* Active tab notch shape (rendered at header level to avoid overflow clip).
          transition-none + !transition-none keeps the notch snapping to the
          tab on every ResizeObserver fire — without it, parent transitions
          (e.g. the wrapper's transition-all on open / drag-end) can bleed in
          via `all` and give the notch a perceptible easing curve. */}
      {activeTabRect && (
        <Notch
          width={1000}
          height={1000}
          notchWidth={HEADER_H - TAB_IR}
          notchHeight={activeTabRect.width}
          notchSide="bottom"
          notchOffset={100}
          radius={TAB_R}
          inverseRadius={TAB_IR}
          fill="var(--color-on-background)"
          stroke="none"
          headOnly
          className="absolute z-[5] !transition-none"
          style={{ left: activeTabRect.left - TAB_IR, top: 0 }}
        />
      )}

      {/* History */}
      <div ref={historyBtnRef} className="absolute left-0 top-0 z-[51] w-10 h-10 flex justify-center">
        <IconButton icon="expand_more" variant="text" size="sm" className="m-auto text-on-surface" onClick={() => setShowHistory(!showHistory)} aria-label={labels?.historyButtonLabel ?? "Chat history"} />
      </div>

      {/* History dropdown */}
      {showHistory && (
        <div
          ref={historyDropdownRef}
          className="absolute z-50 overflow-visible"
          style={{ left: 4, top: 4, filter: "drop-shadow(0 4px 12px rgb(0 0 0 / 0.12))" }}
        >
          {histContentH > 0 && (
            <Notch
              width={HIST_W}
              height={histContentH}
              notchWidth={DD_NOTCH_W}
              notchHeight={HIST_NOTCH_H}
              notchSide="bottom"
              notchOffset={0}
              radius={DD_R}
              inverseRadius={DD_IR}
              stroke="var(--color-primary)"
              strokeWidth={1.5}
              className="absolute top-0 left-0"
            />
          )}
          <div
            ref={histContentRef}
            className="relative z-10 pt-2 pb-1.5 px-1.5 flex flex-col gap-1 max-h-[60vh] overflow-y-auto"
            style={{ marginTop: HIST_NOTCH_H, width: HIST_W }}
          >
            {!history || history.length === 0 ? (
              <div className="px-2 py-3 text-xs text-on-surface-variant text-center">
                {labels?.historyEmpty ?? "No previous conversations"}
              </div>
            ) : (
              history.map((group) => (
                <div key={group.label} className="flex flex-col gap-0.5">
                  <div className="px-2 pt-1 pb-0.5 text-[10px] font-medium uppercase tracking-wide text-on-surface-variant">
                    {group.label}
                  </div>
                  {group.items.map((item) => {
                    const isEditing = editingId === item.id;
                    const select = () => {
                      if (isEditing) return;
                      onSelectHistoryItem?.(item.id);
                      setShowHistory(false);
                    };
                    const startEdit = (e: React.SyntheticEvent) => {
                      e.stopPropagation();
                      setEditingId(item.id);
                      setEditValue(item.title);
                      // Focus once the input has rendered.
                      requestAnimationFrame(() => editInputRef.current?.focus());
                    };
                    const commitEdit = () => {
                      const trimmed = editValue.trim();
                      if (trimmed.length >= 1 && trimmed.length <= 200) {
                        onRenameConversation?.(item.id, trimmed);
                      }
                      setEditingId(null);
                    };
                    const cancelEdit = () => setEditingId(null);
                    return (
                      <div
                        key={item.id}
                        role={isEditing ? undefined : "button"}
                        tabIndex={isEditing ? undefined : 0}
                        className="group/item flex items-center gap-1.5 px-2 py-1 rounded-md cursor-pointer transition-colors text-on-surface hover:bg-on-surface/10"
                        onClick={select}
                        onKeyDown={(e) => {
                          // target check: nested rename/cancel buttons handle their own keys.
                          if (e.target === e.currentTarget && !isEditing && (e.key === "Enter" || e.key === " ")) {
                            e.preventDefault();
                            select();
                          }
                        }}
                      >
                        {isEditing ? (
                          <>
                            <input
                              ref={editInputRef}
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") { e.preventDefault(); commitEdit(); }
                                if (e.key === "Escape") {
                                  e.preventDefault();
                                  // Keep the dropdown's Escape-to-dismiss from also firing.
                                  e.stopPropagation();
                                  cancelEdit();
                                }
                              }}
                              onClick={(e) => e.stopPropagation()}
                              maxLength={200}
                              className="flex-1 min-w-0 text-sm bg-transparent border-b border-outline focus:outline-none text-on-surface"
                              aria-label={`${labels?.renameConversationLabel ?? "Rename conversation"}: ${item.title}`}
                            />
                            <button
                              type="button"
                              className="w-5 h-5 flex items-center justify-center rounded-full cursor-pointer text-on-surface hover:bg-on-surface/10 shrink-0"
                              onClick={(e) => { e.stopPropagation(); cancelEdit(); }}
                              aria-label={labels?.cancelRenameLabel ?? "Cancel rename"}
                            >
                              <Icon name="close" size={12} />
                            </button>
                          </>
                        ) : (
                          <>
                            <Icon name="chat_bubble_outline" size={14} className="text-on-surface-variant shrink-0" />
                            <span className="text-sm truncate flex-1">{item.title}</span>
                            {onRenameConversation && (
                              <button
                                type="button"
                                className="w-5 h-5 flex items-center justify-center rounded-full cursor-pointer text-on-surface hover:bg-on-surface/10 shrink-0 opacity-0 group-hover/item:opacity-70 group-hover/item:hover:opacity-100 focus-visible:opacity-100 transition-opacity"
                                onClick={startEdit}
                                aria-label={labels?.renameConversationLabel ?? "Rename conversation"}
                              >
                                <Icon name="edit" size={12} />
                              </button>
                            )}
                            {onDeleteConversation && (
                              <button
                                type="button"
                                className="w-5 h-5 flex items-center justify-center rounded-full cursor-pointer text-on-surface hover:bg-error/10 hover:text-error shrink-0 opacity-0 group-hover/item:opacity-70 group-hover/item:hover:opacity-100 focus-visible:opacity-100 transition-opacity"
                                onClick={(e) => { e.stopPropagation(); onDeleteConversation(item.id); }}
                                aria-label={labels?.deleteConversationLabel ?? "Delete conversation"}
                              >
                                <Icon name="delete" size={12} />
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Tabs — !transition-none on the tab + its inner box so flex-1
          width changes snap during a live sidebar drag instead of easing
          through whatever transition class the ancestor chain inherits. */}
      <div ref={tabsContainerRef} className="flex-1 flex h-full overflow-hidden pl-10 pr-1.5 gap-1.5 !transition-none">
        <div role="tablist" aria-label="Chat sessions" className="flex flex-1 h-full gap-1.5 !transition-none">
          {visibleTabs.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <div
                key={tab.id}
                role="tab"
                ref={isActive ? activeTabRef : undefined}
                aria-selected={isActive}
                tabIndex={isActive ? 0 : -1}
                onClick={() => handleSelectTab(tab.id)}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleSelectTab(tab.id); } }}
                // min-w-0 overrides the flex min-width:auto floor so a long
                // title shrinks to the strip's allotment and ellipsizes
                // (the inner box's min-w-[100px]/[80px] is the real floor).
                className="group relative h-full flex flex-1 min-w-0 !transition-none"
              >
                <div
                  className={cn(
                    "relative flex items-center gap-2 px-3 h-full cursor-pointer select-none !transition-none",
                    isActive
                      ? "text-inverse-on-surface z-10 min-w-[100px]"
                      : "h-7 m-auto rounded-lg bg-secondary-container text-on-surface/80 hover:bg-on-secondary-container/50 min-w-[80px]",
                    "w-full",
                  )}
                >
                  <span className="text-[13px] font-normal truncate flex-1">{tab.title}</span>
                  {tabs.length > 1 && <span className="w-5 h-5 shrink-0" />}
                </div>
                {tabs.length > 1 && (
                  <div
                    className={cn(
                      "absolute right-1 top-1/2 -translate-y-1/2 z-20 w-5 h-5 flex items-center justify-center rounded-full transition-opacity cursor-pointer",
                      isActive
                        ? "text-inverse-on-surface hover:bg-inverse-on-surface/20 opacity-70 hover:opacity-100"
                        : "text-on-surface hover:bg-on-surface/10 opacity-0 group-hover:opacity-70 group-hover:hover:opacity-100",
                    )}
                    onClick={(e) => { e.stopPropagation(); handleCloseTab(tab.id); }}
                    aria-label={`Close ${tab.title}`}
                  >
                    <Icon name="close" size={14} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div ref={overflowRef} className="flex items-center gap-0.5 pr-1 shrink-0">
        {overflowTabs.length > 0 ? (
          <div ref={triggerBtnRef} className="relative z-[51]">
            <IconButton icon="more_horiz" variant="text" size="sm" className="text-on-surface" onClick={() => setShowOverflow(!showOverflow)} aria-label={`${overflowTabs.length} more tabs`} />
          </div>
        ) : (
          <IconButton icon="add" variant="text" size="sm" className="text-on-surface" onClick={handleAddTab} aria-label={labels?.newChatLabel ?? "New chat"} />
        )}
        <IconButton icon={isCollapsed ? "unfold_more" : "unfold_less"} variant="text" size="sm" className="rotate-90 text-on-surface" onClick={onToggleCollapse} aria-label={isCollapsed ? "Expand" : "Collapse"} />
        <IconButton icon="close" variant="text" size="sm" className="text-on-surface" onClick={onClose} aria-label="Close sidebar" />
      </div>

      {/* Overflow dropdown with notch tab connecting to the ... button */}
      {showOverflow && overflowTabs.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute z-50 overflow-visible"
          style={{ right: 8, top: 4, filter: "drop-shadow(0 4px 12px rgb(0 0 0 / 0.12))" }}
        >
          {ddContentH > 0 && (
            <Notch
              width={DD_W}
              height={ddContentH}
              notchWidth={DD_NOTCH_W}
              notchHeight={DD_NOTCH_H}
              notchSide="bottom"
              notchOffset={ddNotchX}
              radius={DD_R}
              inverseRadius={DD_IR}
              stroke="var(--color-primary)"
              strokeWidth={1.5}
              className="absolute top-0 left-0"
            />
          )}
          <div
            ref={ddContentRef}
            className="relative z-10 pt-2 pb-1.5 px-1.5 flex flex-col gap-0.5"
            style={{ marginTop: DD_NOTCH_H, width: DD_W }}
          >
            {overflowTabs.map((tab) => (
              <button
                key={tab.id}
                className={cn(
                  "w-full px-2 py-1 text-left text-sm rounded-md transition-colors flex items-center gap-1.5",
                  tab.id === activeTabId ? "bg-primary/10 text-primary font-medium" : "text-on-surface hover:bg-on-surface/10",
                )}
                onClick={() => { handleSelectTab(tab.id); setShowOverflow(false); }}
              >
                <span className="truncate">{tab.title}</span>
              </button>
            ))}
            <div className="h-px bg-outline-variant mx-1.5 my-1" />
            <button
              className="w-full px-2 py-1 text-left text-sm rounded-md transition-colors flex items-center gap-1.5 text-primary hover:bg-on-surface/10"
              onClick={() => { handleAddTab(); setShowOverflow(false); }}
            >
              <Icon name="add" size={12} />
              <span>{labels?.newChatLabel ?? "New chat"}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
