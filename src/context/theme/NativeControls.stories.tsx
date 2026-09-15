import type { Meta, StoryObj } from "@storybook/react";

/**
 * 🔴 THE ONLY PLACE IN THIS KIT THAT RENDERS A CONTROL THE BROWSER PAINTS.
 *
 * Every other component here draws itself, which is exactly why a whole class
 * of dark-mode defects was invisible in this repo and only surfaced in a
 * consumer: ad-core's schedule fields are `<input type="datetime-local">`, and
 * in the console's dark mode the browser painted a near-black calendar glyph
 * onto a near-black input. Reported by the owner as one icon (T152).
 *
 * The cause was that `color-scheme` was declared nowhere. Our dark mode is a
 * `.dark` CLASS, which the user agent cannot see, so it believed every page was
 * light and painted every control it owns for the wrong mode — this glyph, the
 * picker popup it opens, `<select>` popups, spin buttons, autofill.
 *
 * This story exists so that stays visible. It is deliberately plain markup, not
 * kit components: the point is what the BROWSER draws when we do not.
 *
 * Read it in both themes. If a glyph or popup here looks like it belongs to the
 * other mode, `color-scheme` in theme.css has regressed.
 */
const meta: Meta = {
  title: "Foundations/Native controls",
  parameters: {
    docs: {
      description: {
        component:
          "Controls the browser paints rather than the kit. They follow `color-scheme` in theme.css, not our tokens — check them in both themes.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const field =
  "rounded-lg border border-outline-variant bg-surface-container px-3 py-2 text-sm text-on-surface";

export const Default: Story = {
  render: () => (
    <div className="max-w-xl space-y-4 p-4">
      <p className="text-sm text-on-surface-variant">
        The glyphs and popups below are drawn by the browser. Toggle the theme:
        they should change with it.
      </p>

      <label className="block space-y-1">
        <span className="text-xs text-on-surface-variant">
          datetime-local — the control the owner reported
        </span>
        <input type="datetime-local" className={`w-full ${field}`} />
      </label>

      <label className="block space-y-1">
        <span className="text-xs text-on-surface-variant">
          date — same indicator, same picker popup
        </span>
        <input type="date" className={`w-full ${field}`} />
      </label>

      <label className="block space-y-1">
        <span className="text-xs text-on-surface-variant">
          select — the popup is drawn by the browser, not by us
        </span>
        <select className={`w-full ${field}`}>
          <option>首頁主視覺</option>
          <option>課程側欄</option>
        </select>
      </label>

      <label className="block space-y-1">
        <span className="text-xs text-on-surface-variant">
          number — spin buttons
        </span>
        <input type="number" defaultValue={3} className={`w-full ${field}`} />
      </label>

      <div className="space-y-1">
        <span className="text-xs text-on-surface-variant">
          scrollbar — this one is ours (`::-webkit-scrollbar-*` in theme.css),
          so it follows the tokens rather than color-scheme
        </span>
        <div className={`h-24 overflow-y-scroll ${field}`}>
          <div className="h-64" />
        </div>
      </div>
    </div>
  ),
};
