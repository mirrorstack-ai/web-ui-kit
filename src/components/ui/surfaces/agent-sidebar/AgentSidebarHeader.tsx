import { useState, useRef, useEffect, useCallback, forwardRef } from "react";
import { cn } from "@/utils/cn";
import { IconButton } from "@/components/ui/actions/icon-button/IconButton";
import { Icon } from "@/components/ui/media/icon/Icon";

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

// SVG path: notch top-right, panel below — mirrored AppSwitcher approach
const R = 8; // corner radius
const CR = 6; // concave (inverse) corner radius

function buildOutline(nw: number, nh: number, pw: number, ph: number) {
  const th = nh + ph;
  const nl = pw - nw; // notch left x

  return [
    // Top-left of notch
    `M ${nl + R},0`,
    // Top edge of notch
    `H ${pw - R}`,
    // Top-right corner of notch
    `A ${R},${R} 0 0,1 ${pw},${R}`,
    // Right edge all the way down (notch + panel share right edge)
    `V ${th - R}`,
    // Bottom-right corner
    `A ${R},${R} 0 0,1 ${pw - R},${th}`,
    // Bottom edge
    `H ${R}`,
    // Bottom-left corner
    `A ${R},${R} 0 0,1 0,${th - R}`,
    // Left edge of panel up
    `V ${nh + R}`,
    // Top-left corner of panel
    `A ${R},${R} 0 0,1 ${R},${nh}`,
    // Top edge of panel to inverse corner
    `H ${nl - CR}`,
    // Inverse concave corner (bottom-left of notch)
    `A ${CR},${CR} 0 0,0 ${nl},${nh - CR}`,
    // Left edge of notch up
    `V ${R}`,
    // Top-left corner of notch
    `A ${R},${R} 0 0,1 ${nl + R},0`,
    `Z`,
  ].join(" ");
}

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
  const dropdownRef = useRef<HTMLDivElement>(null);

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
          <IconButton icon="more_horiz" variant="text" size="sm" className="text-on-surface" onClick={() => setShowOverflow(!showOverflow)} aria-label={`${overflowTabs.length} more tabs`} />
        ) : (
          <IconButton icon="add" variant="text" size="sm" className="text-on-surface" onClick={handleAddTab} aria-label="New chat" />
        )}
        <IconButton icon={isCollapsed ? "unfold_more" : "unfold_less"} variant="text" size="sm" className="rotate-90 text-on-surface" onClick={onToggleCollapse} aria-label={isCollapsed ? "Expand" : "Collapse"} />
        <IconButton icon="close" variant="text" size="sm" className="text-on-surface" onClick={onClose} aria-label="Close sidebar" />
      </div>

      {/* Overflow dropdown with SVG outline */}
      {showOverflow && overflowTabs.length > 0 && (
        <OverflowDropdown
          ref={dropdownRef}
          tabs={overflowTabs}
          activeTabId={activeTabId}
          onSelect={(id) => { setActiveTabId(id); setShowOverflow(false); }}
          onAddTab={() => { handleAddTab(); setShowOverflow(false); }}
        />
      )}
    </div>
  );
}

interface OverflowDropdownProps {
  tabs: ChatTab[];
  activeTabId: string;
  onSelect: (id: string) => void;
  onAddTab: () => void;
}

const NOTCH_W = 36;
const NOTCH_H = 40;
const PANEL_W = 176;

const OverflowDropdown = forwardRef<HTMLDivElement, OverflowDropdownProps>(
  function OverflowDropdown({ tabs, activeTabId, onSelect, onAddTab }, ref) {
    const contentRef = useRef<HTMLDivElement>(null);
    const [panelH, setPanelH] = useState(80);

    useEffect(() => {
      if (contentRef.current) {
        setPanelH(contentRef.current.offsetHeight);
      }
    }, [tabs.length]);

    const path = buildOutline(NOTCH_W, NOTCH_H, PANEL_W, panelH);
    const totalH = NOTCH_H + panelH;

    return (
      <div
        ref={ref}
        className="absolute z-50"
        style={{ top: 0, right: 0, width: PANEL_W, height: totalH }}
      >
        <svg
          className="absolute inset-0 pointer-events-none"
          width={PANEL_W}
          height={totalH}
          style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.08))" }}
        >
          <path
            d={path}
            fill="var(--color-surface-container-low)"
            stroke="var(--color-primary)"
            strokeWidth="1"
          />
        </svg>
        <div
          ref={contentRef}
          className="absolute py-1.5 px-1.5"
          style={{ top: NOTCH_H, left: 0, width: PANEL_W }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={cn(
                "w-full px-2.5 py-1.5 text-left text-xs rounded-md transition-colors flex items-center gap-1.5",
                tab.id === activeTabId ? "bg-primary/10 text-primary font-medium" : "text-on-surface hover:bg-on-surface/10",
              )}
              onClick={() => onSelect(tab.id)}
            >
              <Icon name="auto_awesome" size={12} />
              <span className="truncate">{tab.title}</span>
            </button>
          ))}
          <div className="h-px bg-outline-variant mx-1 my-1" />
          <button
            className="w-full px-2.5 py-1.5 text-left text-xs rounded-md transition-colors flex items-center gap-1.5 text-primary hover:bg-on-surface/10"
            onClick={onAddTab}
          >
            <Icon name="add" size={12} />
            <span>New chat</span>
          </button>
        </div>
      </div>
    );
  },
);
