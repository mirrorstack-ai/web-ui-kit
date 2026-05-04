import type { ReactNode } from "react";
import { cn } from "@/utils/cn";
import { SectionLabel } from "@/components/ui/data/section-label/SectionLabel";
import { Surface } from "@/components/ui/surfaces/surface/Surface";
import type { ComponentMeta } from "@/types/component-meta";

export const meta: ComponentMeta = {
  name: "SettingsSection",
  description:
    "Titled, boxed group of settings — a SectionLabel above a padded Surface. Use for Info / Settings / Profile groups whose rows visually belong together. Tone-coloured groups (Advanced=warning, Danger zone=error) do NOT use this shape — they render SectionLabel above a naked stack of SettingRow rows with their own per-row borders, no enclosing Surface.",
};

export interface SettingsSectionProps {
  /** Section heading text. Rendered via <SectionLabel>. */
  title: ReactNode;
  /** Body of the section — usually a stack of fields. */
  children: ReactNode;
  /** Optional class on the outer wrapper. */
  className?: string;
  /** Optional class on the inner Surface (e.g. override padding). */
  surfaceClassName?: string;
}

export function SettingsSection({
  title,
  children,
  className,
  surfaceClassName,
}: SettingsSectionProps) {
  return (
    <section className={className}>
      <SectionLabel className="mb-2">{title}</SectionLabel>
      <Surface className={cn("p-6", surfaceClassName)}>{children}</Surface>
    </section>
  );
}
