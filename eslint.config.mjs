import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";

// Minimal config: the kit's correctness-critical lint surface is React hooks
// (rules-of-hooks + exhaustive-deps). Style/formatting stays with TypeScript
// strict mode and review.
export default [
  // Stories are excluded: CSF `render:` functions trip rules-of-hooks
  // (they render as React components, but the rule can't tell), and
  // stories don't ship in the package.
  { ignores: ["dist/**", "node_modules/**", "storybook-static/**", "**/*.stories.tsx"] },
  {
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: { parser: tseslint.parser },
    plugins: { "react-hooks": reactHooks },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "error",
    },
  },
];
