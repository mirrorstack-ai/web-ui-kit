import "@testing-library/jest-dom/vitest";

// jsdom does not implement ResizeObserver. Recharts' ResponsiveContainer
// uses it to track parent size. Provide a no-op polyfill so chart components
// can render in tests.
if (typeof globalThis.ResizeObserver === "undefined") {
  globalThis.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}
