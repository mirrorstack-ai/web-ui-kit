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
  const tabsContainerRef = useRef<HTMLDivElement>(null);

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
      <div ref={tabsContainerRef} className="flex-1 flex h-full overflow-hidden pl-2 gap-1.5">
        <div role="tablist" aria-label="Chat sessions" className="flex h-full gap-1.5">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <div
                key={tab.id}
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
                className={cn(
                  "flex items-center gap-2 px-3 h-full cursor-pointer select-none text-sm",
                  isActive
                    ? "rounded-t-xl bg-on-background text-inverse-on-surface"
                    : "h-7 m-auto rounded-lg bg-secondary-container text-on-surface/80 hover:bg-on-secondary-container/50",
                )}
              >
                <Icon name="auto_awesome" size={14} />
                <span className="truncate max-w-[100px]">{tab.title}</span>
                {tabs.length > 1 && (
                  <button
                    type="button"
                    onClick={(e) => handleCloseTab(tab.id, e)}
                    className="ml-1 opacity-60 hover:opacity-100"
                    aria-label={`Close ${tab.title}`}
                  >
                    <Icon name="close" size={14} />
                  </button>
                )}
              </div>
            );
          })}
        </div>

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
