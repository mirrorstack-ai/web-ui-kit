import { useState, useRef, useEffect, useCallback, useLayoutEffect } from "react";
import { cn } from "@/utils/cn";
import { IconButton } from "@/components/ui/actions/icon-button/IconButton";
import { Icon } from "@/components/ui/media/icon/Icon";
import { Notch } from "@/components/ui/surfaces/notch/Notch";

interface ChatTab {
  id: string;
  title: string;
}

export interface AgentSidebarHeaderProps {
  sidebarWidth: number;
  onToggleCollapse: () => void;
  onClose: () => void;
}

const TAB_WIDTH = 100;
const GAP = 6;
const ADD_BTN = 40;

// Active tab notch (headOnly)
const TAB_R = 12;
const TAB_IR = 12;
const HEADER_H = 40;

// Overflow dropdown notch dimensions
const DD_W = 176;
const DD_NOTCH_W = 32; // matches IconButton sm
const DD_NOTCH_H = 32; // full IconButton sm height (h-8)
const DD_R = 8;
const DD_IR = 8;

export function AgentSidebarHeader({
  sidebarWidth,
  onToggleCollapse,
  onClose,
}: AgentSidebarHeaderProps) {
  const isCollapsed = sidebarWidth <= 350;

  const [tabs, setTabs] = useState<ChatTab[]>([{ id: "1", title: "Chat 1" }]);
  const [activeTabId, setActiveTabId] = useState("1");
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

  useEffect(() => {
    if (!showOverflow) return;
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") setShowOverflow(false); };
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (overflowRef.current?.contains(target)) return;
      if (dropdownRef.current?.contains(target)) return;
      setShowOverflow(false);
    };
    document.addEventListener("keydown", handleKey);
    document.addEventListener("mousedown", handleClick);
    return () => { document.removeEventListener("keydown", handleKey); document.removeEventListener("mousedown", handleClick); };
  }, [showOverflow]);

  useEffect(() => {
    if (!showHistory) return;
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") setShowHistory(false); };
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (historyBtnRef.current?.contains(target)) return;
      if (historyDropdownRef.current?.contains(target)) return;
      setShowHistory(false);
    };
    document.addEventListener("keydown", handleKey);
    document.addEventListener("mousedown", handleClick);
    return () => { document.removeEventListener("keydown", handleKey); document.removeEventListener("mousedown", handleClick); };
  }, [showHistory]);

  useLayoutEffect(() => {
    const tab = activeTabRef.current;
    const header = headerRef.current;
    if (!tab || !header) { setActiveTabRect(null); return; }
    const tRect = tab.getBoundingClientRect();
    const hRect = header.getBoundingClientRect();
    setActiveTabRect({ left: tRect.left - hRect.left, width: tRect.width });
  }, [activeTabId, visibleCount]);

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
    const id = String(nextIdRef.current++);
    setTabs((prev) => [...prev, { id, title: `Chat ${id}` }]);
    setActiveTabId(id);
  };

  const handleDeleteHistory = (tabId: string) => {
    if (tabs.length === 1) return;
    const idx = tabs.findIndex((t) => t.id === tabId);
    const newTabs = tabs.filter((t) => t.id !== tabId);
    setTabs(newTabs);
    if (tabId === activeTabId) {
      const next = newTabs[Math.min(idx, newTabs.length - 1)];
      if (next) setActiveTabId(next.id);
    }
  };

  const handleCloseTab = (tabId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (tabs.length === 1) return;
    const idx = tabs.findIndex((t) => t.id === tabId);
    const newTabs = tabs.filter((t) => t.id !== tabId);
    setTabs(newTabs);
    if (tabId === activeTabId) {
      const next = newTabs[Math.min(idx, newTabs.length - 1)];
      if (next) setActiveTabId(next.id);
    }
  };

  return (
    <div ref={headerRef} className="relative flex items-center h-10 shrink-0">
      {/* Active tab notch shape (rendered at header level to avoid overflow clip) */}
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
          className="absolute z-[5]"
          style={{ left: activeTabRect.left - TAB_IR, top: 0 }}
        />
      )}

      {/* History */}
      <div ref={historyBtnRef} className="absolute left-0 top-0 z-10 w-10 h-10 flex justify-center">
        <IconButton icon="expand_more" variant="text" size="sm" className="m-auto text-on-surface" onClick={() => setShowHistory(!showHistory)} aria-label="Chat history" />
      </div>

      {/* History dropdown */}
      {showHistory && (
        <div ref={historyDropdownRef} className="absolute left-1 top-full z-50 w-56 bg-surface-container-low border border-outline-variant rounded-lg shadow-lg py-1">
          <div className="px-3 py-1.5 text-xs font-medium text-on-surface-variant">Chat history</div>
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={cn(
                "group/item flex items-center gap-2 px-3 py-1.5 mx-1 rounded-md cursor-pointer transition-colors",
                tab.id === activeTabId ? "bg-primary/10 text-primary" : "text-on-surface hover:bg-on-surface/8",
              )}
              onClick={() => { setActiveTabId(tab.id); setShowHistory(false); }}
            >
              <span className="text-xs truncate flex-1">{tab.title}</span>
              {tabs.length > 1 && (
                <div
                  className="w-5 h-5 shrink-0 flex items-center justify-center rounded-full opacity-0 group-hover/item:opacity-70 hover:!opacity-100 hover:bg-on-surface/10 transition-opacity"
                  onClick={(e) => { e.stopPropagation(); handleDeleteHistory(tab.id); }}
                  aria-label={`Delete ${tab.title}`}
                >
                  <Icon name="delete" size={14} className="text-on-surface-variant" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Tabs */}
      <div ref={tabsContainerRef} className="flex-1 flex h-full overflow-hidden pl-10 gap-1.5">
        <div role="tablist" aria-label="Chat sessions" className="flex h-full gap-1.5">
          {visibleTabs.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <div
                key={tab.id}
                role="tab"
                ref={isActive ? activeTabRef : undefined}
                aria-selected={isActive}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveTabId(tab.id)}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setActiveTabId(tab.id); } }}
                className="group relative h-full flex"
              >
                <div
                  className={cn(
                    "relative flex items-center gap-2 px-3 h-full cursor-pointer select-none",
                    isActive
                      ? "text-inverse-on-surface z-10 min-w-[100px] max-w-[200px]"
                      : "h-7 m-auto rounded-lg bg-secondary-container text-on-surface/80 hover:bg-on-secondary-container/50 min-w-[80px] max-w-[140px]",
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
                    onClick={(e) => handleCloseTab(tab.id, e)}
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
          <IconButton icon="add" variant="text" size="sm" className="text-on-surface" onClick={handleAddTab} aria-label="New chat" />
        )}
        <IconButton icon={isCollapsed ? "unfold_more" : "unfold_less"} variant="text" size="sm" className="rotate-90 text-on-surface" onClick={onToggleCollapse} aria-label={isCollapsed ? "Expand" : "Collapse"} />
        <IconButton icon="close" variant="text" size="sm" className="text-on-surface" onClick={onClose} aria-label="Close sidebar" />
      </div>

      {/* Overflow dropdown with notch tab connecting to the ... button */}
      {showOverflow && overflowTabs.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute z-50 overflow-visible"
          style={{ right: 8, top: `calc(100% - ${DD_NOTCH_H + 4}px)`, filter: "drop-shadow(0 4px 12px rgb(0 0 0 / 0.12))" }}
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
            className="relative z-10 py-1.5 px-1.5"
            style={{ marginTop: DD_NOTCH_H, width: DD_W }}
          >
            {overflowTabs.map((tab) => (
              <button
                key={tab.id}
                className={cn(
                  "w-full px-2.5 py-1.5 text-left text-xs rounded-md transition-colors flex items-center gap-1.5",
                  tab.id === activeTabId ? "bg-primary/10 text-primary font-medium" : "text-on-surface hover:bg-on-surface/10",
                )}
                onClick={() => { setActiveTabId(tab.id); setShowOverflow(false); }}
              >
                <span className="truncate">{tab.title}</span>
              </button>
            ))}
            <div className="h-px bg-outline-variant mx-1 my-1" />
            <button
              className="w-full px-2.5 py-1.5 text-left text-xs rounded-md transition-colors flex items-center gap-1.5 text-primary hover:bg-on-surface/10"
              onClick={() => { handleAddTab(); setShowOverflow(false); }}
            >
              <Icon name="add" size={12} />
              <span>New chat</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
