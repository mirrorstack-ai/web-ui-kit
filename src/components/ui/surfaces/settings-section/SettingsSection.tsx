import type { ReactNode } from "react";
import { cn } from "@/utils/cn";
import { SectionLabel } from "@/components/ui/data/section-label/SectionLabel";
import { Surface } from "@/components/ui/surfaces/surface/Surface";
import { type Tone, toneTextClass } from "@/types/tone";
import type { ComponentMeta } from "@/types/component-meta";

export const meta: ComponentMeta = {
  name: "SettingsSection",
  description:
    "Titled, padded surface used for settings groupings — bundles a SectionLabel with a Surface(p-6). Replaces the SECTION_CLASS pattern duplicated across web-account /me, /me/security, and web-applications /dev/module.",
};

export interface SettingsSectionProps {
  /** Section heading text. Rendered via <SectionLabel>. */
  title: ReactNode;
  /** Theme color for the title (e.g. "error" for danger zones). */
  tone?: Tone;
  /** Body of the section — usually a stack of fields. */
  children: ReactNode;
  /** Optional class on the outer wrapper. */
  className?: string;
  /** Optional class on the inner Surface. Use to override padding for special cases. */
  surfaceClassName?: string;
}

export function SettingsSection({
  title,
  tone,
  children,
  className,
  surfaceClassName,
}: SettingsSectionProps) {
  return (
    <section className={className}>
      <SectionLabel className={cn("mb-2", tone && toneTextClass[tone])}>
        {title}
      </SectionLabel>
      <Surface className={cn("p-6", surfaceClassName)}>{children}</Surface>
    </section>
  );
}
