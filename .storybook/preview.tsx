import type { Preview } from "@storybook/react";
import "../src/storybook.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: { disable: true },
  },
  globalTypes: {
    theme: {
      description: "Theme",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: [
          { value: "light", title: "Light", icon: "sun" },
          { value: "dark", title: "Dark", icon: "moon" },
          // 🔴 ADDED SO THE OWNER'S REVIEW MATRIX CAN RENDER THIS KIT AT ALL.
          // ui-preflight drives light/dark by emulating prefers-color-scheme
          // (that is how the apps behave: the kit's ThemeProvider resolves
          // "auto" from the media query). Storybook took its theme only from
          // this toolbar, so both rows of the matrix rendered whatever the
          // global said and half of every sheet was a red cell that meant
          // nothing. With "auto", `?globals=theme:auto` makes a kit story
          // follow the emulated scheme like a real page does.
          //
          // NOT the default: `initialGlobals` stays "light", so nobody's
          // Storybook starts rendering dark because their OS does.
          { value: "auto", title: "Auto (OS)", icon: "browser" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "light",
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme;
      const dark =
        theme === "dark" ||
        (theme === "auto" &&
          typeof window !== "undefined" &&
          window.matchMedia("(prefers-color-scheme: dark)").matches);
      const el = document.documentElement;
      if (el.classList.contains("dark") !== dark) {
        el.classList.toggle("dark", dark);
      }
      return <Story />;
    },
  ],
};

export default preview;
