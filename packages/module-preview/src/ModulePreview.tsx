import { useCallback, useEffect, useState, type ReactNode } from "react";
import {
  Breadcrumb,
  DevToolbar,
  PageHeader,
  SegmentedButton,
  SnackbarOutlet,
  SnackbarProvider,
  ThemeToggle,
  type Theme,
} from "@mirrorstack-ai/web-ui-kit";
import type { PlatformUnsaved } from "./hostTypes.js";

import { fromQuery, resolveLocale } from "./axes.js";
import { SURFACE_FRAME, hostSettingsCopy, type PreviewSurface } from "./hostChrome.js";
import { useHostUnsavedBar } from "./useHostUnsavedBar.js";

/** One state of the axes, handed to the module so it can mount itself. */
export interface MountScene<Scenario extends string, Locale extends string> {
  /** The reviewable state the module's fixtures should serve. */
  scenario: Scenario;
  /** The locale the host would have resolved for the operator. */
  locale: Locale;
  /** The platform's unsaved-changes bridge, as the console supplies it. */
  unsaved: PlatformUnsaved;
}

/** Everything a module tells the shell about itself. */
export interface ModulePreviewProps<Scenario extends string, Locale extends string> {
  /**
   * Which surface the console mounts this page on. Decides the frame width AND
   * the chrome above the mount, not just a max-width — see hostChrome.ts.
   *
   * @defaultValue "settings"
   */
  surface?: PreviewSurface;
  /**
   * The module's display name per locale — what the console resolves from
   * `<module>/i18n/<locale>.json` `module.name`, falling back to the
   * non-localized `ms.Config.Name`.
   *
   * 🔴 PASS THE FALLBACK, NOT A NICER NAME. A module that declares no
   * `module.name` is titled in the console with its Latin config name
   * ("管理 AI Assistant" on a zh-TW console), and the preview must show that
   * rather than hide it: ai-assistant shipped to review with exactly this gap
   * and nobody could see it, because the preview drew no header at all.
   */
  moduleName: Record<Locale, string>;
  /** Reviewable states the module's fixtures serve, in review order. */
  scenarios: readonly [Scenario, ...Scenario[]];
  /** Locales the module ships a catalog for, most preferred first. */
  locales: readonly [Locale, ...Locale[]];
  /**
   * The confirmation the HOST shows after a save — the console's own catalog
   * (`moduleMount.saved`), per locale.
   */
  savedMessage: Record<Locale, string>;
  /**
   * Mount the module's real entry point into `target` and return its dispose.
   * This is the one seam: the shell owns the chrome, the module owns its
   * fixtures and its own mount call.
   */
  mount: (target: HTMLElement, scene: MountScene<Scenario, Locale>) => (() => void) | void;
}

/**
 * The console's page shell, on localhost, around a module's real mount.
 *
 * @param props - See {@link ModulePreviewProps}.
 * @returns The preview page.
 */
export function ModulePreview<Scenario extends string, Locale extends string>(
  props: ModulePreviewProps<Scenario, Locale>,
): ReactNode {
  return (
    // The console wraps a module mount in exactly this provider, and the
    // unsaved bar is rendered by the outlet — never by the module.
    <SnackbarProvider>
      <Shell {...props} />
      <SnackbarOutlet />
    </SnackbarProvider>
  );
}

/**
 * The shell proper, inside the snackbar provider the bar needs.
 *
 * @param props - See {@link ModulePreviewProps}.
 * @returns The chrome, the frame and the mount.
 */
function Shell<Scenario extends string, Locale extends string>({
  surface = "settings",
  moduleName,
  scenarios,
  locales,
  savedMessage,
  mount,
}: ModulePreviewProps<Scenario, Locale>): ReactNode {
  const [scenario, setScenario] = useState<Scenario>(
    () => fromQuery("scenario", scenarios) ?? scenarios[0],
  );
  const [locale, setLocale] = useState<Locale>(() => resolveLocale(locales));
  const [theme, setTheme] = useState<Theme>(
    () => fromQuery("theme", ["auto", "light", "dark"] as const) ?? "auto",
  );

  // The kit flips its tokens on `.dark` on the document element, the same class
  // the console's ThemeProvider sets — so dark mode here is the real thing and
  // not a preview-only palette. "auto" follows the OS, as the console's does,
  // which is also what a preflight sheet drives.
  useEffect(() => {
    // matchMedia is absent in jsdom, and a shell that throws there is a shell
    // nobody can put under test — which is how a harness accumulates the five
    // bugs this package exists to prevent. Without it, "auto" resolves to
    // light, which is the same default the kit takes.
    const prefersDark =
      typeof window.matchMedia === "function"
        ? window.matchMedia("(prefers-color-scheme: dark)")
        : null;
    const apply = () => {
      document.documentElement.classList.toggle(
        "dark",
        theme === "dark" || (theme === "auto" && prefersDark?.matches === true),
      );
    };
    apply();
    prefersDark?.addEventListener("change", apply);
    return () => prefersDark?.removeEventListener("change", apply);
  }, [theme]);

  const unsaved = useHostUnsavedBar(savedMessage[locale]);
  const copy = hostSettingsCopy(locale);
  const name = moduleName[locale];

  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <DevToolbar
        items={scenarios.map((value) => ({ label: value, value }))}
        value={scenario}
        onChange={(value) => setScenario(value as Scenario)}
      />
      {/* Below the scene switcher at phone width, beside it from sm up: both
          clusters are fixed, and at 400px they overlapped each other. */}
      <div className="fixed top-16 right-4 z-50 flex items-center gap-2 rounded-2xl border border-outline-variant bg-surface-container px-3 py-2 shadow-xl sm:top-4">
        {locales.length > 1 && (
          <SegmentedButton
            size="sm"
            variant="boxed"
            aria-label="locale"
            options={locales.map((value) => ({ value, label: value }))}
            value={locale}
            onChange={setLocale}
          />
        )}
        <ThemeToggle theme={theme} onToggle={() => setTheme(ThemeToggle.next(theme))} />
      </div>
      <main className="px-4 pb-16 pt-24">
        <div className={SURFACE_FRAME[surface]}>
          {surface === "settings" && (
            <PageHeader
              title={copy.title}
              description={copy.manage.replace("{name}", name)}
              path={
                <Breadcrumb
                  items={[{ label: name, href: "#" }]}
                  // The crumb navigates inside the console; in here it must not
                  // leave the preview, so the click is swallowed.
                  onNavigate={(_href, event) => event.preventDefault()}
                />
              }
            />
          )}
          <Mount scenario={scenario} locale={locale} unsaved={unsaved} mount={mount} />
        </div>
      </main>
    </div>
  );
}

/**
 * Mounts and unmounts the module's real surface as the axes change.
 *
 * @param props - The scene, and the module's mount function.
 * @returns The element the module is mounted into.
 */
function Mount<Scenario extends string, Locale extends string>({
  scenario,
  locale,
  unsaved,
  mount,
}: MountScene<Scenario, Locale> & {
  mount: ModulePreviewProps<Scenario, Locale>["mount"];
}): ReactNode {
  // The ref callback is memoised because React re-runs a ref whose identity
  // changed: an inline arrow here unmounts and remounts the module on every
  // render of the shell, which blanks the page whenever the bar is raised.
  const attach = useCallback(
    (target: HTMLElement | null) => {
      if (target === null) return undefined;
      return mount(target, { scenario, locale, unsaved }) ?? undefined;
    },
    [scenario, locale, unsaved, mount],
  );
  // A fresh key per (scenario, locale) forces a real unmount/mount cycle, so
  // the preview also shows the module's loading skeleton and its dispose path.
  return <div key={`${scenario}:${locale}`} ref={attach} />;
}
