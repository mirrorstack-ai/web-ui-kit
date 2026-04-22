import { useState, useRef } from "react";
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

export function AgentSidebarHeader({
  sidebarWidth,
  onToggleCollapse,
  onClose,
}: AgentSidebarHeaderProps) {
  const isCollapsed = sidebarWidth <= 350;

  const [tabs, setTabs] = useState<ChatTab[]>([{ id: "1", title: "Chat 1" }]);
  const [activeTabId, setActiveTabId] = useState("1");
  const nextIdRef = useRef(2);

  const handleAddTab = () => {
    const id = String(nextIdRef.current++);
    const newTab: ChatTab = { id, title: `Chat ${id}` };
    setTabs((prev) => [...prev, newTab]);
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
        <IconButton
          icon="stat_minus_1"
          variant="text"
          size="sm"
          className="m-auto text-on-surface"
          aria-label="Chat history"
        />
      </div>

      {/* Tabs */}
      <div className="flex-1 flex h-full overflow-hidden pl-10 gap-1.5">
        <div role="tablist" aria-label="Chat sessions" className="flex h-full gap-1.5">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <div key={tab.id} className="group relative h-full flex">
                <div
                  role="tab"
                  aria-selected={isActive}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveTabId(tab.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveTabId(tab.id);
                    }
                  }}
                  className="relative h-full flex"
                >
                  <div
                    className={cn(
                      "relative flex items-center gap-2 px-3 h-full max-w-[200px] cursor-pointer select-none min-w-[100px]",
                      isActive
                        ? "rounded-t-xl bg-on-background text-inverse-on-surface z-10"
                        : "h-7 m-auto rounded-lg bg-secondary-container text-on-surface/80 hover:bg-on-secondary-container/50",
                    )}
                  >
                    {/* Inverse corners for active tab (Chrome-tab style) */}
                    {isActive && (
                      <>
                        <div
                          className="absolute left-0 w-3 h-3 pointer-events-none"
                          style={{
                            bottom: 0,
                            transform: "translateX(-100%)",
                            backgroundColor: "var(--color-on-background)",
                            maskImage: "radial-gradient(circle 12px at 0 0, transparent 12px, black 12px)",
                            WebkitMaskImage: "radial-gradient(circle 12px at 0 0, transparent 12px, black 12px)",
                          }}
                        />
                        <div
                          className="absolute right-0 w-3 h-3 pointer-events-none"
                          style={{
                            bottom: 0,
                            transform: "translateX(100%)",
                            backgroundColor: "var(--color-on-background)",
                            maskImage: "radial-gradient(circle 12px at 12px 0, transparent 12px, black 12px)",
                            WebkitMaskImage: "radial-gradient(circle 12px at 12px 0, transparent 12px, black 12px)",
                          }}
                        />
                      </>
                    )}

                    <Icon name="auto_awesome" size={14} className="shrink-0" />
                    <span className="text-[13px] font-normal truncate flex-1">{tab.title}</span>
                    {tabs.length > 1 && <span className="w-5 h-5 shrink-0" />}
                  </div>
                </div>

                {/* Close button — visible on hover, always visible when active */}
                {tabs.length > 1 && (
                  <div
                    className={cn(
                      "absolute right-1 top-1/2 -translate-y-1/2 z-20 w-5 h-5 flex items-center justify-center rounded-full hover:bg-inverse-on-surface/15 transition-opacity cursor-pointer",
                      isActive
                        ? "opacity-70 hover:opacity-100"
                        : "opacity-0 group-hover:opacity-70 group-hover:hover:opacity-100",
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

        {/* Add tab */}
        <div className="z-10 h-10 flex justify-center">
          <IconButton
            icon="add"
            variant="text"
            size="sm"
            className="m-auto text-on-surface"
            onClick={handleAddTab}
            aria-label="New chat"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-0.5 pr-1 shrink-0">
        <IconButton
          icon={isCollapsed ? "unfold_more" : "unfold_less"}
          variant="text"
          size="sm"
          className="rotate-90 text-on-surface"
          onClick={onToggleCollapse}
          aria-label={isCollapsed ? "Expand" : "Collapse"}
        />
        <IconButton
          icon="close"
          variant="text"
          size="sm"
          className="text-on-surface"
          onClick={onClose}
          aria-label="Close sidebar"
        />
      </div>
    </div>
  );
}
