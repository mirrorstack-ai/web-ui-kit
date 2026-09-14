/**
 * Reading and writing the axes a review moves along: which scene, which
 * locale, which theme.
 */

/**
 * Read one axis's starting value from the query string, so a review can be
 * handed over as a link to the exact state under discussion rather than as
 * three clicks to reproduce.
 *
 * @param name - Query parameter to read.
 * @param allowed - Values this axis accepts.
 * @param search - The query string to read; defaults to the current location.
 * @returns The requested value, or null when absent or unrecognised.
 */
export function fromQuery<T extends string>(
  name: string,
  allowed: readonly T[],
  search: string = typeof window === "undefined" ? "" : window.location.search,
): T | null {
  const asked = new URLSearchParams(search).get(name);
  return allowed.find((value) => value === asked) ?? null;
}

/**
 * Resolve the locale a preview should open in.
 *
 * 🔴 THE BROWSER'S LANGUAGE IS THE FALLBACK, AND THAT IS WHAT MAKES A
 * PREFLIGHT SHEET MEAN ANYTHING. `/ui-preflight` renders the owner's matrix by
 * driving a browser CONTEXT — it sets the language and a cookie, not this
 * page's query string. ai-assistant's preview read its locale only from
 * `?locale=`, so all four "en" cells of every sheet rendered Chinese: half the
 * matrix asserted nothing while reporting PASS, which is the same shape as a
 * test suite that only ever exercises one branch.
 *
 * @param locales - Locales the module ships a catalog for, most preferred first.
 * @param language - The browser's language; defaults to `navigator.language`.
 * @param search - The query string to read; defaults to the current location.
 * @returns The locale to open in — never undefined, so a preview always renders.
 */
export function resolveLocale<T extends string>(
  locales: readonly [T, ...T[]],
  language: string = typeof navigator === "undefined" ? "" : navigator.language,
  search?: string,
): T {
  const asked = fromQuery("locale", locales, search);
  if (asked !== null) return asked;
  // Match on the language subtag, because the renderer asks for "en" and the
  // module ships "en-US". An exact match still wins: it is checked first.
  const exact = locales.find((value) => value === language);
  if (exact !== undefined) return exact;
  const base = language.split("-")[0] ?? "";
  return locales.find((value) => value.split("-")[0] === base) ?? locales[0];
}
