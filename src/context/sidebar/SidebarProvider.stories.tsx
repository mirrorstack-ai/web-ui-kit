import type { Meta, StoryObj } from "@storybook/react";
import { SidebarProvider, useSidebar } from "./SidebarProvider";
import { Button } from "@/components/ui/actions/button/Button";

const navItems = [
  { icon: "home", label: "Home", active: true },
  { icon: "inbox", label: "Inbox" },
  { icon: "calendar_month", label: "Calendar" },
  { icon: "analytics", label: "Analytics" },
  { icon: "settings", label: "Settings" },
];

function SidebarDemo() {
  const { width, isOpen, open, close, toggle } = useSidebar();

  const isNarrow = width > 0 && width < 200;

  return (
    <div className="flex h-96 w-[720px] overflow-hidden rounded-2xl border border-outline-variant bg-surface shadow-lg">
      {/* Sidebar */}
      <div
        className="flex flex-shrink-0 flex-col border-r border-outline-variant bg-surface-container transition-all duration-300 ease-in-out"
        style={{ width }}
      >
        <div className="flex h-full flex-col overflow-hidden">
          {/* Sidebar header */}
          <div className="flex h-14 flex-shrink-0 items-center border-b border-outline-variant/50 px-4">
            {!isNarrow && (
              <span className="truncate text-sm font-semibold text-on-surface">
                Workspace
              </span>
            )}
          </div>

          {/* Nav items */}
          <nav className="flex flex-1 flex-col gap-1 p-2">
            {navItems.map((item) => (
              <div
                key={item.icon}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors ${
                  item.active
                    ? "bg-primary/12 text-primary"
                    : "text-on-surface-variant hover:bg-on-surface/5"
                } ${isNarrow ? "justify-center px-0" : ""}`}
              >
                <span
                  className="material-symbols-rounded flex-shrink-0"
                  aria-hidden="true"
                  style={{ fontSize: 20 }}
                >
                  {item.icon}
                </span>
                {!isNarrow && (
                  <span className="truncate text-sm font-medium">
                    {item.label}
                  </span>
                )}
              </div>
            ))}
          </nav>

          {/* Sidebar footer */}
          {!isNarrow && (
            <div className="border-t border-outline-variant/50 p-3">
              <div className="flex items-center gap-3 rounded-lg px-2 py-1.5">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-on-primary">
                  JD
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-on-surface">
                    Jane Doe
                  </p>
                  <p className="truncate text-xs text-on-surface-variant">
                    jane@example.com
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        {/* Toolbar */}
        <div className="flex h-14 flex-shrink-0 items-center gap-3 border-b border-outline-variant/50 px-4">
          <Button
            variant="text"
            size="sm"
            leftIcon={isOpen ? "menu_open" : "menu"}
            onClick={() => toggle()}
          />
          <h1 className="text-sm font-semibold text-on-surface">Dashboard</h1>
          <div className="ml-auto flex items-center gap-1 rounded-full bg-surface-container px-3 py-1">
            <span className="text-xs font-medium text-on-surface-variant">
              {width}px
            </span>
            <span className="text-xs text-on-surface-variant/60">
              · {isOpen ? (isNarrow ? "Narrow" : "Open") : "Closed"}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-5">
          <p className="mb-4 text-xs font-medium uppercase tracking-wider text-on-surface-variant">
            Sidebar Controls
          </p>
          <div className="flex flex-wrap gap-2">
            <Button variant="filled" size="sm" onClick={() => open()}>
              Default
            </Button>
            <Button variant="tonal" size="sm" onClick={() => open(400)}>
              Wide
            </Button>
            <Button variant="tonal" size="sm" onClick={() => open(72)}>
              Icon only
            </Button>
            <Button
              variant="outline"
              size="sm"
              color="error"
              onClick={() => close()}
            >
              Close
            </Button>
          </div>

          {/* Placeholder content */}
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-surface-container p-4">
              <div className="h-2.5 w-2/3 rounded bg-on-surface/8" />
              <div className="mt-3 h-8 w-full rounded-lg bg-on-surface/5" />
            </div>
            <div className="rounded-xl bg-surface-container p-4">
              <div className="h-2.5 w-1/2 rounded bg-on-surface/8" />
              <div className="mt-3 h-8 w-full rounded-lg bg-on-surface/5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const meta: Meta = {
  title: "Context/SidebarProvider",
  decorators: [
    (Story) => (
      <SidebarProvider>
        <Story />
      </SidebarProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj;

/** Interactive sidebar with open/close/toggle/resize controls */
export const Playground: Story = {
  render: () => <SidebarDemo />,
};
