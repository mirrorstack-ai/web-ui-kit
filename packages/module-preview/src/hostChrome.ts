/**
 * What the console puts around a module mount.
 *
 * 🔴 A PREVIEW WITHOUT THE HOST'S CHROME IS A PREVIEW OF A PAGE NOBODY WILL
 * SEE, AND IT READS AS A DEFECT IN THE MODULE. ai-assistant 1.0.0's settings
 * surface was rejected on 2026-09-14 for having "no page header" — every
 * deployed module opens with a breadcrumb, a title and a subtitle, and this one
 * appeared to open on its first section label. The header was never the
 * module's: web-applications' settings-module route renders it above the mount
 * and says in its own source that a bundle "should NOT render its own
 * page-level heading to avoid duplication". The module was right and the
 * harness was wrong, and it cost a review round of the owner's time — the only
 * UI reviewer there is.
 *
 * The strings below are the CONSOLE's, copied. That is a real cost: reword them
 * in web-applications and this goes stale, silently, in the direction of
 * showing a nicer page than production. It is written down here so the next
 * reader knows it is a copy, and it is the argument for eventually serving the
 * host's own messages rather than restating them.
 *
 * Source: web-applications messages/<locale>.json, key `moduleSettings`.
 */

/** One surface a module can be mounted on, as the console mounts it. */
export type PreviewSurface = "settings" | "nav";

/** The console's copy for one locale's settings-module page. */
export interface HostSettingsCopy {
  /** The page title — the console's own word, not the module's. */
  title: string;
  /** The subtitle, with `{name}` standing for the module's display name. */
  manage: string;
}

/**
 * web-applications `moduleSettings` for the locales the console ships.
 *
 * A locale that is missing here falls back to en-US rather than rendering a
 * key: a preview that shows `moduleSettings.title` teaches a reviewer nothing
 * about the page.
 */
export const HOST_SETTINGS_COPY: Record<string, HostSettingsCopy> = {
  "zh-TW": { title: "設定", manage: "管理 {name}" },
  "en-US": { title: "Settings", manage: "Manage {name}" },
};

/**
 * Read the console's settings copy for a locale.
 *
 * @param locale - The locale the host would have resolved for the operator.
 * @returns The copy for that locale, falling back to en-US.
 */
export function hostSettingsCopy(locale: string): HostSettingsCopy {
  const exact = HOST_SETTINGS_COPY[locale];
  if (exact !== undefined) return exact;
  // Match on the LANGUAGE SUBTAG against the keys' own subtags, not against the
  // keys themselves: the console's key is "zh-TW", so looking up "zh" finds
  // nothing and a browser reporting "zh-Hant-TW" — which real Chrome does —
  // would be handed English copy on a Chinese page.
  const base = locale.split("-")[0];
  if (base !== undefined && base !== "") {
    for (const [key, copy] of Object.entries(HOST_SETTINGS_COPY)) {
      if (key.split("-")[0] === base) return copy;
    }
  }
  return HOST_SETTINGS_COPY["en-US"]!;
}

/**
 * The frame the console wraps a mount in, per surface.
 *
 * 🔴 THE WIDTH IS NOT "FULL". The console does not mount modules full width:
 * `web-applications/src/lib/module-mount/ModuleMount.tsx` wraps every mount in
 * `max-w-5xl mx-auto`, inside a tab shell that does the same, and the
 * settings-module route repeats it around the header. ai-assistant's first
 * preview used `max-w-3xl` — NARROWER than the console — which is what made
 * the owner call the page cramped: a verdict about the harness, delivered as a
 * verdict about the page.
 *
 * `nav` is provisional and says so: what a nav-item page is framed in is being
 * decided in web-applications#390, and this must be read off that route when
 * it lands rather than guessed here. Until then it matches `settings`, which
 * is the console's behaviour today.
 */
export const SURFACE_FRAME: Record<PreviewSurface, string> = {
  settings: "mx-auto max-w-5xl space-y-6",
  nav: "mx-auto max-w-5xl space-y-4",
};
