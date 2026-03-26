"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "../utils/cn";
import { IconButton } from "./IconButton";
import { TabWithInverseCorners } from "./TabWithInverseCorners";

interface ChatTab {
  id: string;
  title: string;
}

interface AgentSidebarHeaderProps {
  sidebarWidth: number;
  onToggleCollapse: () => void;
  onClose: () => void;
}

export function AgentSidebarHeader({
  sidebarWidth,
  onToggleCollapse,
  onClose,
}: AgentSidebarHeaderProps) {
  const isCollapsed = sidebarWidth <= 350;

  const [tabs, setTabs] = useState<ChatTab[]>([{ id: "1", title: "Chat 1" }]);
  const [activeTabId, setActiveTabId] = useState("1");
  const nextIdRef = useRef(2);

  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const overflowMenuRef = useRef<HTMLDivElement>(null);
  const [visibleTabCount, setVisibleTabCount] = useState(tabs.length);
  const [showIcons, setShowIcons] = useState(true);
  const [showOverflowMenu, setShowOverflowMenu] = useState(false);

  let visibleTabs = tabs.slice(0, visibleTabCount);
  let overflowedTabs = tabs.slice(visibleTabCount);

  const activeTabIndex = tabs.findIndex((t) => t.id === activeTabId);
  if (activeTabIndex >= visibleTabCount && visibleTabCount > 0) {
    const lastVisibleIndex = visibleTabCount - 1;
    const swappedTabs = [...tabs];
    [swappedTabs[activeTabIndex], swappedTabs[lastVisibleIndex]] = [
      swappedTabs[lastVisibleIndex]!,
      swappedTabs[activeTabIndex]!,
    ];
    visibleTabs = swappedTabs.slice(0, visibleTabCount);
    overflowedTabs = swappedTabs.slice(visibleTabCount);
  }

  const calculateVisibleTabs = useCallback(() => {
    if (!tabsContainerRef.current) return;

    const containerWidth = tabsContainerRef.current.clientWidth;
    const TAB_WITH_ICON = 140;
    const TAB_NO_ICON = 100;
    const GAP = 6;
    const RESERVED = 80; // left padding + add button

    const available = containerWidth - RESERVED;

    const totalWithIcons =
      tabs.length * TAB_WITH_ICON + (tabs.length - 1) * GAP;
    if (totalWithIcons <= available) {
      setVisibleTabCount(tabs.length);
      setShowIcons(true);
      return;
    }

    const totalNoIcons =
      tabs.length * TAB_NO_ICON + (tabs.length - 1) * GAP;
    if (totalNoIcons <= available) {
      setVisibleTabCount(tabs.length);
      setShowIcons(false);
      return;
    }

    const withOverflow = available - 40;
    const countWithIcons = Math.floor(
      (withOverflow + GAP) / (TAB_WITH_ICON + GAP)
    );
    const countNoIcons = Math.floor(
      (withOverflow + GAP) / (TAB_NO_ICON + GAP)
    );

    if (countNoIcons > countWithIcons) {
      setVisibleTabCount(Math.max(1, countNoIcons));
      setShowIcons(false);
    } else {
      setVisibleTabCount(Math.max(1, countWithIcons));
      setShowIcons(true);
    }
  }, [tabs]);

  useEffect(() => {
    calculateVisibleTabs();
    const container = tabsContainerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(() => calculateVisibleTabs());
    observer.observe(container);
    return () => observer.disconnect();
  }, [calculateVisibleTabs]);

  useEffect(() => {
    calculateVisibleTabs();
  }, [tabs, calculateVisibleTabs]);

  // Close overflow menu on Escape or click outside
  useEffect(() => {
    if (!showOverflowMenu) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowOverflowMenu(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        overflowMenuRef.current &&
        !overflowMenuRef.current.contains(e.target as Node)
      ) {
        setShowOverflowMenu(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showOverflowMenu]);

  const handleAddTab = () => {
    const id = nextIdRef.current;
    nextIdRef.current += 1;
    const newTab: ChatTab = { id: String(id), title: `Chat ${id}` };
    setTabs((prev) => [...prev, newTab]);
    setActiveTabId(newTab.id);
  };

  const handleCloseTab = (tabId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (tabs.length === 1) return;

    const tabIndex = tabs.findIndex((t) => t.id === tabId);
    const newTabs = tabs.filter((t) => t.id !== tabId);
    setTabs(newTabs);

    if (tabId === activeTabId) {
      const next = newTabs[Math.min(tabIndex, newTabs.length - 1)];
      if (next) setActiveTabId(next.id);
    }
  };

  return (
    <div className="relative flex items-center h-10 flex-shrink-0">
      {/* History */}
      <div className="absolute left-0 top-0 z-10 w-10 h-10 flex justify-center">
        <IconButton
          icon="stat_minus_1"
          variant="text"
          size="sm"
          className="m-auto text-on-surface"
          title="Chat history"
        />
      </div>

      {/* Tabs + actions */}
      <div
        ref={tabsContainerRef}
        className="flex-1 flex h-full overflow-hidden pl-10 gap-1.5"
      >
        <div
          role="tablist"
          aria-label="Chat sessions"
          className="flex h-full gap-1.5"
        >
          {visibleTabs.map((tab) => (
            <TabWithInverseCorners
              key={tab.id}
              isActive={tab.id === activeTabId}
              title={tab.title}
              showIcon={showIcons}
              showClose={tabs.length > 1}
              onClick={() => setActiveTabId(tab.id)}
              onClose={(e) => handleCloseTab(tab.id, e)}
            />
          ))}
        </div>

        {/* Overflow menu */}
        {overflowedTabs.length > 0 && (
          <div ref={overflowMenuRef} className="relative z-10 h-10 flex justify-center">
            <IconButton
              icon="more_horiz"
              variant="text"
              size="sm"
              className="m-auto text-on-surface"
              aria-haspopup="menu"
              aria-expanded={showOverflowMenu}
              onClick={() => setShowOverflowMenu(!showOverflowMenu)}
              title={`${overflowedTabs.length} more tabs`}
            />

            <div
              role="menu"
              aria-hidden={!showOverflowMenu}
              className={cn(
                "absolute top-full left-0 mt-1 w-64 bg-surface-container rounded-lg shadow-lg overflow-hidden z-20 transition-all duration-200",
                showOverflowMenu
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              )}
            >
              <div className="py-2">
                <div className="px-4 py-2 text-on-surface/50 text-xs font-medium">
                  More Tabs
                </div>
                {overflowedTabs.map((tab) => (
                  <button
                    key={tab.id}
                    role="menuitem"
                    className={cn(
                      "w-full px-4 py-2 text-left text-sm hover:bg-on-surface/10 transition-colors",
                      tab.id === activeTabId
                        ? "bg-primary/10 text-primary"
                        : "text-on-surface"
                    )}
                    onClick={() => {
                      setActiveTabId(tab.id);
                      setShowOverflowMenu(false);
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-rounded text-[16px]">
                        auto_awesome
                      </span>
                      <span className="truncate">{tab.title}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Add tab */}
        <div className="z-10 h-10 flex justify-center">
          <IconButton
            icon="add"
            variant="text"
            size="sm"
            className="m-auto text-on-surface"
            onClick={handleAddTab}
            title="New chat"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-0.5 pr-1 flex-shrink-0">
        <IconButton
          icon={isCollapsed ? "unfold_more" : "unfold_less"}
          variant="text"
          size="sm"
          className="mb-1 rotate-90 text-on-surface"
          onClick={onToggleCollapse}
          title={isCollapsed ? "Expand" : "Collapse"}
        />
        <IconButton
          icon="close"
          variant="text"
          size="sm"
          className="mb-1 text-on-surface"
          onClick={onClose}
          title="Close sidebar"
        />
      </div>
    </div>
  );
}
