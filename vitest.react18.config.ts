import { defineConfig } from "vitest/config";
import path from "node:path";

// The package declares `react: ">=18"`, but the dev dependencies and the normal
// test run are React 19 only. React 19 turned `ref` into an ordinary prop, so a
// component that injects a ref into a caller-supplied child works on 19 and
// silently does nothing on 18 — no error, just a component that never appears.
// `test/react18` is a private workspace package pinned to React 18, and every
// import below is redirected into it, so `*.react18.test.tsx` files run against
// a real React 18 renderer and that class of regression fails CI.
const react18 = (specifier: string) =>
  path.resolve(__dirname, "test/react18/node_modules", specifier);

export default defineConfig({
  test: {
    name: "react18",
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.react18.test.{ts,tsx}"],
  },
  resolve: {
    alias: [
      { find: /^react$/, replacement: react18("react") },
      { find: /^react\/jsx-runtime$/, replacement: react18("react/jsx-runtime") },
      {
        find: /^react\/jsx-dev-runtime$/,
        replacement: react18("react/jsx-dev-runtime"),
      },
      { find: /^react-dom$/, replacement: react18("react-dom") },
      { find: /^react-dom\/client$/, replacement: react18("react-dom/client") },
      {
        find: /^react-dom\/test-utils$/,
        replacement: react18("react-dom/test-utils"),
      },
      {
        find: /^@testing-library\/react$/,
        replacement: react18("@testing-library/react"),
      },
      { find: "@", replacement: path.resolve(__dirname, "src") },
    ],
  },
});
