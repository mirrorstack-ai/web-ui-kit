/**
 * The two shapes the platform's unsaved-changes bridge is made of.
 *
 * 🔴 DECLARED HERE, NOT IMPORTED, AND THE REASON IS NOT CONVENIENCE.
 * `@mirrorstack-ai/app-module-client` owns these (`src/web/types.ts`) and is
 * published to GitHub Packages — this repository's CI has no auth for the
 * @mirrorstack-ai scope and never needed any, so importing them made
 * `pnpm install --frozen-lockfile` fail with a 401 in CI while passing on a
 * developer's machine, which had a token in ~/.npmrc. Two interfaces are not
 * worth coupling the kit's build to another private package's availability.
 *
 * Structural typing does the rest: a module hands the shell the bridge the
 * console handed it, and it satisfies these without either side importing the
 * other.
 *
 * The drift this accepts is bounded and points the safe way. If the client
 * grows a field the host renders, this shell ignores it and the preview shows
 * LESS than production — a harness that showed MORE would be inventing
 * feedback the product does not give, which is the bug that actually happened
 * (see useHostUnsavedBar).
 */

/** State rendered by the platform unsaved-changes bar. */
export interface UnsavedBarState {
  message: string;
  saveLabel: string;
  resetLabel: string;
  /** Disables the save action while retaining reset and warning behaviour. */
  canSave?: boolean;
  onSave: () => void;
  onReset: () => void;
}

/** Bridge used by a mounted module to control unsaved-change UI. */
export interface PlatformUnsaved {
  set: (state: UnsavedBarState | null) => void;
}
