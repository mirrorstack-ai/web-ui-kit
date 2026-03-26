"use client";

import { type ReactNode } from "react";
import { IconButton } from "./IconButton";

export interface SettingsTab {
  value: string;
  label: string;
  icon: string;
}

export interface ModuleSettingsLayoutProps {
  children: ReactNode;
  title: string;
  tabs: SettingsTab[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  onBack?: () => void;
}

export function ModuleSettingsLayout({
  title,
  tabs,
  activeTab,
  onTabChange,
  onBack,
  children,
}: ModuleSettingsLayoutProps) {
  return (
    <div className="p-8 flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <IconButton
          icon="arrow_back"
          variant="text"
          aria-label="Back"
          onClick={onBack}
        />
        <h1 className="text-2xl font-semibold text-on-surface">
          {title}
        </h1>
      </div>

      <div className="flex gap-2">
        {tabs.map((t) => (
          <button
            key={t.value}
            onClick={() => onTabChange(t.value)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
              activeTab === t.value
                ? "bg-primary text-on-primary"
                : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
            }`}
          >
            <span className="material-symbols-rounded !text-[16px]">
              {t.icon}
            </span>
            {t.label}
          </button>
        ))}
      </div>

      {children}
    </div>
  );
}
