import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { AppShell } from "./AppShell";
import { NavigationRail } from "@/components/ui/navigation/navigation-rail/NavigationRail";
import { NavigationButton } from "@/components/ui/navigation/navigation-button/NavigationButton";
import { BottomNavItem } from "@/components/ui/navigation/bottom-nav-item/BottomNavItem";
import { AppSwitcher } from "@/components/ui/navigation/app-switcher/AppSwitcher";
import { Logo } from "@/components/ui/media/logo/Logo";
import { NavDrawer, type NavDrawerItem } from "@/components/ui/navigation/nav-drawer/NavDrawer";
import { Avatar } from "@/components/ui/media/avatar/Avatar";
import { Button } from "@/components/ui/actions/button/Button";
import { useSnackbar } from "@/context/snackbar/SnackbarProvider";
import { mockAgentModels } from "@/components/ui/agent/sidebar/mock-data";

const meta: Meta<typeof AppShell> = {
  title: "Layout/AppShell",
  component: AppShell,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof AppShell>;

// --- Shared demo fixtures ---------------------------------------------------

const apps = [
  { id: "account", label: "Account", description: "Profile & security settings", icon: "shield_person", href: "#" },
  { id: "apps", label: "Apps", description: "Manage your applications", icon: "data_table", href: "#" },
];

const railGroups = [
  [
    { id: "dashboard", icon: "space_dashboard", label: "Dashboard" },
    { id: "apps", icon: "data_table", label: "Your Apps" },
  ],
  [
    { id: "addons", icon: "extension", label: "Add-ons" },
    { id: "settings", icon: "settings", label: "Settings" },
  ],
];

const navSections = [
  {
    label: "Account",
    items: [
      { id: "profile", label: "Profile", icon: "person" },
      { id: "security", label: "Security", icon: "shield" },
      { id: "preferences", label: "Preferences", icon: "tune" },
    ],
  },
  {
    items: [
      { id: "organizations", label: "Organizations", icon: "apartment" },
    ],
  },
  {
    items: [
      { id: "sign-out", label: "Sign out", icon: "logout", variant: "danger" as const },
    ],
  },
];

const logoGlyph = (
  <div className="w-full h-full bg-primary/20 flex items-center justify-center">
    <span className="text-primary font-semibold text-lg">M</span>
  </div>
);

const appSwitcher = (
  <AppSwitcher
    currentApp="Account"
    logo={<div className="w-8 h-8"><Logo /></div>}
    apps={apps}
    activeAppId="account"
  />
);

const agentProps = {
  agentSidebarContent: (
    <div className="text-inverse-on-surface text-sm">
      Chat messages would appear here...
    </div>
  ),
  onAgentSend: (msg: string) => console.log("Send:", msg),
  agentModels: mockAgentModels,
  selectedAgentModelId: mockAgentModels.find((m) => !m.disabled)?.id,
  onSelectAgentModel: (id: string) => console.log("Select model:", id),
};

/** The vertical side rail used by the desktop-nav stories. */
function DemoRail() {
  const [selected, setSelected] = useState("apps");
  return (
    <NavigationRail
      logo={
        <NavigationButton
          customIcon={logoGlyph}
          label="My App"
          variant="secondary"
          disableHoverExpand
          className="border border-primary"
        />
      }
    >
      {railGroups.map((group, gi) => (
        <div key={gi} className="contents">
          {gi > 0 && <div className="h-px rounded-full w-full bg-outline" />}
          <div className="w-full gap-2 flex flex-col">
            {group.map((item) => (
              <NavigationButton
                key={item.id}
                icon={item.icon}
                label={item.label}
                selected={selected === item.id}
                onClick={() => setSelected(item.id)}
              />
            ))}
          </div>
        </div>
      ))}
    </NavigationRail>
  );
}

/** The same destinations as DemoRail, as a mobile bottom-nav pill. */
function DemoBottomNav() {
  const [selected, setSelected] = useState("apps");
  return (
    <NavigationRail orientation="horizontal" containerClassName="gap-0 px-3 py-2">
      <BottomNavItem
        customIcon={logoGlyph}
        label="My App"
        showTitle={false}
        onClick={() => setSelected("dashboard")}
      />
      {railGroups.flat().map((item) => (
        <BottomNavItem
          key={item.id}
          icon={item.icon}
          label={item.label}
          selected={selected === item.id}
          onClick={() => setSelected(item.id)}
        />
      ))}
    </NavigationRail>
  );
}

function DemoNavDrawer() {
  const [active, setActive] = useState("profile");
  return (
    <NavDrawer
      contextSwitcher={
        <div className="flex items-center gap-3 p-3 rounded-xl">
          <Avatar size="md" fallback="J" />
          <div className="min-w-0 flex-1 space-y-0.5">
            <p className="text-sm font-medium text-on-surface truncate">John Doe</p>
            <p className="text-xs text-on-surface-variant">Personal Account</p>
          </div>
        </div>
      }
      sections={navSections}
      activeItemId={active}
      onItemClick={(item: NavDrawerItem) => setActive(item.id)}
    />
  );
}

const DemoContent = () => (
  <div className="max-w-4xl mx-auto">
    <h1 className="text-2xl font-bold text-on-surface mb-4">Dashboard</h1>
    <p className="text-on-surface-variant">
      Main content area. The agent sidebar can be toggled with the floating button.
    </p>
  </div>
);

// --- Stories -----------------------------------------------------------------

export const WithNavigationRail: Story = {
  render: () => (
    <AppShell navigation={<DemoRail />} appSwitcher={appSwitcher} {...agentProps}>
      <DemoContent />
    </AppShell>
  ),
};

export const WithNavDrawer: Story = {
  render: () => (
    <AppShell navigation={<DemoNavDrawer />} appSwitcher={appSwitcher} {...agentProps}>
      <DemoContent />
    </AppShell>
  ),
};

// Below lg the side rail hides and the pill pins to the content area's bottom
// edge; at lg+ the rail takes over. Resize the viewport to see the handoff.
export const WithMobileBottomNav: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile2" },
  },
  render: () => (
    <AppShell
      navigation={<DemoRail />}
      mobileNavigation={<DemoBottomNav />}
      appSwitcher={appSwitcher}
    >
      <DemoContent />
    </AppShell>
  ),
};

// Below lg the menu button (bottom-left) opens `navigation` as a modal
// slide-in drawer — no separate mobile tree needed.
export const WithMobileNavDrawer: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile2" },
  },
  render: () => (
    <AppShell
      mobileNavigationVariant="drawer"
      navigation={<DemoNavDrawer />}
      appSwitcher={appSwitcher}
    >
      <DemoContent />
    </AppShell>
  ),
};

function SnackbarDemoContent() {
  const { showSnackbar } = useSnackbar();
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-on-surface mb-4">Dashboard</h1>
      <p className="text-on-surface-variant mb-6">
        The snackbar outlet centers over the content area, not the full viewport.
        Click the button to see it — at mobile widths the bottom nav steps aside
        while the snackbar is up.
      </p>
      <div className="flex gap-3">
        <Button
          onClick={() =>
            showSnackbar({ message: "Saved", variant: "success" })
          }
        >
          Show Snackbar
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            showSnackbar({
              message: "Failed to save",
              variant: "error",
              action: { label: "Retry", onClick: () => {} },
            })
          }
        >
          Show with Action
        </Button>
      </div>
    </div>
  );
}

export const WithSnackbar: Story = {
  render: () => (
    <AppShell
      navigation={<DemoRail />}
      mobileNavigation={<DemoBottomNav />}
      appSwitcher={appSwitcher}
    >
      <SnackbarDemoContent />
    </AppShell>
  ),
};

function SnackbarScrollableDemoContent() {
  const { showSnackbar } = useSnackbar();
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-on-surface mb-4">Long Page</h1>
      <p className="text-on-surface-variant mb-6">
        Scroll the content area down. The "Show snackbar" button at the top will
        move out of view, but the snackbar must stay pinned to the bottom of the
        visible content area.
      </p>
      <div className="mb-6">
        <Button
          onClick={() =>
            showSnackbar({
              message: "Snackbar stays pinned while content scrolls",
              variant: "success",
            })
          }
        >
          Show snackbar
        </Button>
      </div>
      <div className="flex flex-col gap-3">
        {Array.from({ length: 30 }, (_, i) => (
          <div
            key={i}
            className="h-24 rounded-xl bg-surface-container flex items-center justify-center text-on-surface-variant"
          >
            Card {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
}

export const SnackbarWithScrollableContent: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates that the SnackbarOutlet stays pinned to the bottom of the visible content area while the inner content scrolls. Scroll the content — the snackbar must remain visible even after the trigger button leaves the viewport.",
      },
    },
  },
  render: () => (
    <AppShell navigation={<DemoRail />} appSwitcher={appSwitcher}>
      <SnackbarScrollableDemoContent />
    </AppShell>
  ),
};

export const Playground: Story = {
  render: () => (
    <AppShell navigation={<DemoRail />} {...agentProps}>
      <DemoContent />
    </AppShell>
  ),
};
