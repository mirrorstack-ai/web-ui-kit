import { afterEach, describe, expect, it, vi } from "vitest";
import { skeletonPreview } from "./skeletonPreview";

afterEach(() => {
  vi.unstubAllGlobals();
  window.history.replaceState({}, "", "/");
});

describe("skeletonPreview", () => {
  it("returns true for a valueless skeleton parameter", () => {
    window.history.replaceState({}, "", "/?skeleton");
    expect(skeletonPreview()).toBe(true);
  });

  it("returns true for skeleton=1", () => {
    window.history.replaceState({}, "", "/?skeleton=1");
    expect(skeletonPreview()).toBe(true);
  });

  it("returns false when the skeleton parameter is absent", () => {
    window.history.replaceState({}, "", "/?other=1");
    expect(skeletonPreview()).toBe(false);
  });

  it("returns false for a malformed search string", () => {
    window.history.replaceState({}, "", "/?%E0%A4%A");
    expect(skeletonPreview()).toBe(false);
  });

  it("reads the current URL on every call", () => {
    window.history.replaceState({}, "", "/");
    expect(skeletonPreview()).toBe(false);

    window.history.replaceState({}, "", "/?skeleton");
    expect(skeletonPreview()).toBe(true);
  });

  it("returns false when window is undefined", () => {
    vi.stubGlobal("window", undefined);
    expect(skeletonPreview()).toBe(false);
  });
});
