import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { AppShell } from "./AppShell";
import { NavigationRail } from "@/components/ui/navigation/navigation-rail/NavigationRail";
import { NavigationButton } from "@/components/ui/navigation/navigation-button/NavigationButton";
import { AppSwitcher } from "@/components/ui/navigation/app-switcher/AppSwitcher";
import { Logo } from "@/components/ui/media/logo-mirrorstack/LogoMirrorStack";
import { NavDrawer, type NavDrawerItem } from "@/components/ui/navigation/nav-drawer/NavDrawer";
import { Avatar } from "@/components/ui/media/avatar/Avatar";

const meta: Meta<typeof AppShell> = {
  title: "Layout/AppShell",
  component: AppShell,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof AppShell>;

const apps = [
  { id: "account", label: "Account", description: "Profile & security settings", icon: "shield_person", href: "#" },
  { id: "apps", label: "Apps", description: "Manage your applications", icon: "data_table", href: "#" },
];

const DemoContent = () => (
  <div className="max-w-4xl mx-auto">
    <h1 className="text-2xl font-bold text-on-surface mb-4">Dashboard</h1>
    <p className="text-on-surface-variant">
      Main content area. The agent sidebar can be toggled with the floating button.
    </p>
  </div>
);

export const WithNavigationRail: Story = {
  render: () => {
    const [selected, setSelected] = useState("apps");
    return (
      <AppShell
        navigation={
          <NavigationRail
            logo={
              <NavigationButton
                customIcon={
                  <div className="w-full h-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-semibold text-lg">M</span>
                  </div>
                }
                label="My App"
                variant="secondary"
                disableHoverExpand
                className="border border-primary"
              />
            }
          >
            <div className="w-full gap-2 flex flex-col">
              <NavigationButton
                icon="space_dashboard"
                label="Dashboard"
                variant="primary"
                selected={selected === "dashboard"}
                onClick={() => setSelected("dashboard")}
              />
              <NavigationButton
                icon="data_table"
                label="Your Apps"
                selected={selected === "apps"}
                onClick={() => setSelected("apps")}
              />
            </div>
            <div className="h-px rounded-full w-full bg-outline" />
            <div className="w-full gap-2 flex flex-col">
              <NavigationButton
                icon="extension"
                label="Add-ons"
                selected={selected === "addons"}
                onClick={() => setSelected("addons")}
              />
              <NavigationButton
                icon="rocket_launch"
                label="Deployment"
                selected={selected === "deployment"}
                onClick={() => setSelected("deployment")}
              />
              <NavigationButton
                icon="settings"
                label="Settings"
                selected={selected === "settings"}
                onClick={() => setSelected("settings")}
              />
            </div>
          </NavigationRail>
        }
        appSwitcher={
          <AppSwitcher
            currentApp="Account"
            logo={<div className="w-8 h-8"><Logo /></div>}
            apps={apps}
            activeAppId="account"
          />
        }
        agentSidebarContent={
          <div className="text-inverse-on-surface text-sm">
            Chat messages would appear here...
          </div>
        }
        onAgentSend={(msg) => console.log("Send:", msg)}
      >
        <DemoContent />
      </AppShell>
    );
  },
};

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

export const WithNavDrawer: Story = {
  render: () => {
    const [active, setActive] = useState("profile");
    return (
      <AppShell
        navigation={
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
        }
        appSwitcher={
          <AppSwitcher
            currentApp="Account"
            logo={<div className="w-8 h-8"><Logo /></div>}
            apps={apps}
            activeAppId="account"
          />
        }
        agentSidebarContent={
          <div className="text-inverse-on-surface text-sm">
            Chat messages would appear here...
          </div>
        }
        onAgentSend={(msg) => console.log("Send:", msg)}
      >
        <DemoContent />
      </AppShell>
    );
  },
};

export const Playground: Story = {
  render: () => {
    const [selected, setSelected] = useState("apps");
    return (
      <AppShell
        navigation={
          <NavigationRail
            logo={
              <NavigationButton
                customIcon={
                  <div className="w-full h-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-semibold text-lg">M</span>
                  </div>
                }
                label="My App"
                variant="secondary"
                disableHoverExpand
                className="border border-primary"
              />
            }
          >
            <div className="w-full gap-2 flex flex-col">
              <NavigationButton
                icon="space_dashboard"
                label="Dashboard"
                variant="primary"
                selected={selected === "dashboard"}
                onClick={() => setSelected("dashboard")}
              />
              <NavigationButton
                icon="data_table"
                label="Your Apps"
                selected={selected === "apps"}
                onClick={() => setSelected("apps")}
              />
            </div>
            <div className="h-px rounded-full w-full bg-outline" />
            <div className="w-full gap-2 flex flex-col">
              <NavigationButton
                icon="settings"
                label="Settings"
                selected={selected === "settings"}
                onClick={() => setSelected("settings")}
              />
            </div>
          </NavigationRail>
        }
        agentSidebarContent={
          <div className="text-inverse-on-surface text-sm">
            Chat messages would appear here...
          </div>
        }
        onAgentSend={(msg) => console.log("Send:", msg)}
      >
        <DemoContent />
      </AppShell>
    );
  },
};
