import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useDebounce } from "../src/hooks/useDebounce";

describe("useDebounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("hello", 300));

    expect(result.current).toBe("hello");
  });

  it("does not update debounced value before delay", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "initial", delay: 300 } },
    );

    rerender({ value: "updated", delay: 300 });

    // Before timer fires
    expect(result.current).toBe("initial");
  });

  it("updates debounced value after delay", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "initial", delay: 300 } },
    );

    rerender({ value: "updated", delay: 300 });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current).toBe("updated");
  });

  it("resets the timer on rapid changes", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "a", delay: 300 } },
    );

    rerender({ value: "ab", delay: 300 });

    act(() => {
      vi.advanceTimersByTime(200);
    });

    rerender({ value: "abc", delay: 300 });

    act(() => {
      vi.advanceTimersByTime(200);
    });

    // Only 200ms since last change -- should still show "a"
    expect(result.current).toBe("a");

    act(() => {
      vi.advanceTimersByTime(100);
    });

    // Now 300ms since last change -- should show "abc"
    expect(result.current).toBe("abc");
  });

  it("uses default delay of 300ms", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value),
      { initialProps: { value: "start" } },
    );

    rerender({ value: "end" });

    act(() => {
      vi.advanceTimersByTime(299);
    });

    expect(result.current).toBe("start");

    act(() => {
      vi.advanceTimersByTime(1);
    });

    expect(result.current).toBe("end");
  });

  it("works with non-string values", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 0, delay: 100 } },
    );

    rerender({ value: 42, delay: 100 });

    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(result.current).toBe(42);
  });
});
