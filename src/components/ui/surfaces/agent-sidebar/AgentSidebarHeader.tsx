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

// Overflow dropdown notch dimensions
const DD_W = 176;
const DD_NOTCH_W = 32; // matches IconButton sm
const DD_NOTCH_H = 32; // full IconButton sm height (h-8)
const DD_R = 10;
const DD_IR = 6;

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
  const nextIdRef = useRef(2);
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
    <div className="relative flex items-center h-10 shrink-0">
      {/* History */}
      <div className="absolute left-0 top-0 z-10 w-10 h-10 flex justify-center">
        <IconButton icon="stat_minus_1" variant="text" size="sm" className="m-auto text-on-surface" aria-label="Chat history" />
      </div>

      {/* Tabs */}
      <div ref={tabsContainerRef} className="flex-1 flex h-full overflow-hidden pl-10 gap-1.5">
        <div role="tablist" aria-label="Chat sessions" className="flex h-full gap-1.5">
          {visibleTabs.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <div key={tab.id} className="group relative h-full flex">
                <div
                  role="tab"
                  aria-selected={isActive}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveTabId(tab.id)}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setActiveTabId(tab.id); } }}
                  className="relative h-full flex"
                >
                  <div
                    className={cn(
                      "relative flex items-center gap-2 px-3 h-full cursor-pointer select-none",
                      isActive
                        ? "rounded-t-xl bg-on-background text-inverse-on-surface z-10 min-w-[100px] max-w-[200px]"
                        : "h-7 m-auto rounded-lg bg-secondary-container text-on-surface/80 hover:bg-on-secondary-container/50 min-w-[80px] max-w-[140px]",
                    )}
                  >
                    {isActive && (
                      <>
                        <div className="absolute left-0 w-3 h-3 pointer-events-none" style={{ bottom: 0, transform: "translateX(-100%)", backgroundColor: "var(--color-on-background)", maskImage: "radial-gradient(circle 12px at 0 0, transparent 12px, black 12px)", WebkitMaskImage: "radial-gradient(circle 12px at 0 0, transparent 12px, black 12px)" }} />
                        <div className="absolute right-0 w-3 h-3 pointer-events-none" style={{ bottom: 0, transform: "translateX(100%)", backgroundColor: "var(--color-on-background)", maskImage: "radial-gradient(circle 12px at 12px 0, transparent 12px, black 12px)", WebkitMaskImage: "radial-gradient(circle 12px at 12px 0, transparent 12px, black 12px)" }} />
                      </>
                    )}
                    <Icon name="auto_awesome" size={14} className="shrink-0" />
                    <span className="text-[13px] font-normal truncate flex-1">{tab.title}</span>
                    {tabs.length > 1 && <span className="w-5 h-5 shrink-0" />}
                  </div>
                </div>
                {tabs.length > 1 && (
                  <div
                    className={cn(
                      "absolute right-1 top-1/2 -translate-y-1/2 z-20 w-5 h-5 flex items-center justify-center rounded-full hover:bg-inverse-on-surface/15 transition-opacity cursor-pointer",
                      isActive ? "opacity-70 hover:opacity-100" : "opacity-0 group-hover:opacity-70 group-hover:hover:opacity-100",
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
          style={{ right: 1, top: `calc(100% - ${DD_NOTCH_H + 4}px)`, filter: "drop-shadow(0 4px 12px rgb(0 0 0 / 0.12))" }}
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
                <Icon name="auto_awesome" size={12} />
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
