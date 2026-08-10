/**
 * Reports whether the host page URL carries `?skeleton`, allowing a loading
 * placeholder to remain visible for design review.
 *
 * The URL is read at call time because one module bundle can mount on many URLs
 * during a client-side navigation session. The flag only forces a loading
 * branch: it changes no fetch, suppresses no error, and is read nowhere except
 * a loading decision. Shipping it in production is deliberate and safe because
 * the only thing it can do is render a placeholder, and a placeholder carries
 * no data; release builds do not need to strip it.
 */
export function skeletonPreview(): boolean {
  if (typeof window === "undefined") return false;

  try {
    // `has` matches both a valueless `?skeleton` and `?skeleton=1`.
    return new URLSearchParams(window.location.search).has("skeleton");
  } catch {
    // An unparseable URL is not a reason to break the page.
    return false;
  }
}
