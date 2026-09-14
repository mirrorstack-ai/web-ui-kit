// @vitest-environment jsdom
//
// Every assertion in here is a review round somebody already paid for.
//
// This shell exists because five different mistakes were made independently in
// one module's hand-rolled preview, and each one was reviewed as a defect in
// the page rather than in the harness: a missing page header, a frame narrower
// than the console's, a "Saved" toast the product never shows, a page that went
// blank when the unsaved bar was raised, and a locale axis that rendered the
// same language in both columns of the owner's matrix. A packaged shell is only
// worth publishing if those five cannot come back, so they are asserted here
// and nowhere else.

import { afterEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";

import { SURFACE_FRAME } from "../hostChrome.js";
import { ModulePreview, type MountScene } from "../ModulePreview.js";

afterEach(() => {
  cleanup();
  window.history.replaceState({}, "", "/");
});

/**
 * Open the preview at one point on the axes, the way a review link does.
 *
 * The shell resolves its locale from the browser when the query says nothing,
 * and jsdom's navigator.language is en-US — so a test that wants the zh-TW
 * chrome has to ask for it, exactly as a reviewer would.
 *
 * @param search - The query string to open at.
 */
function openAt(search: string) {
  window.history.replaceState({}, "", search);
}

type Scenario = "configured" | "empty";
type Locale = "zh-TW" | "en-US";

/** A module that records how it was mounted, and can drive the platform bar. */
function fakeModule() {
  const mounts: Array<MountScene<Scenario, Locale>> = [];
  const disposed = vi.fn();
  let scene: MountScene<Scenario, Locale> | undefined;
  return {
    mounts,
    disposed,
    /** The scene of the most recent mount. */
    get scene() {
      return scene;
    },
    mount: (target: HTMLElement, next: MountScene<Scenario, Locale>) => {
      mounts.push(next);
      scene = next;
      target.textContent = `${next.scenario}/${next.locale}`;
      return disposed;
    },
  };
}

/**
 * Render the shell around a fake module.
 *
 * @param module - The fake module to mount.
 * @param overrides - Props to override, e.g. the surface.
 * @returns The render result.
 */
function renderShell(
  module: ReturnType<typeof fakeModule>,
  overrides: Partial<Parameters<typeof ModulePreview<Scenario, Locale>>[0]> = {},
) {
  return render(
    <ModulePreview<Scenario, Locale>
      moduleName={{ "zh-TW": "AI 助理", "en-US": "AI Assistant" }}
      scenarios={["configured", "empty"]}
      locales={["zh-TW", "en-US"]}
      savedMessage={{ "zh-TW": "已儲存", "en-US": "Saved" }}
      mount={module.mount}
      {...overrides}
    />,
  );
}

describe("the host's page chrome", () => {
  it("renders the console's header, so a module never has to", () => {
    openAt("?locale=zh-TW");
    renderShell(fakeModule());

    // 🔴 ai-assistant 1.0.0 was rejected for "no page header". The header is
    // the HOST's: web-applications' settings-module route renders it and says
    // a bundle "should NOT render its own page-level heading". The module was
    // right and the preview was wrong, and it cost the owner a review round.
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading.textContent).toBe("設定");
    expect(screen.getByText("管理 AI 助理")).toBeDefined();
    // The breadcrumb names the module, which is where the crumb navigates.
    expect(screen.getByRole("navigation", { name: /breadcrumb/i }).textContent).toContain(
      "AI 助理",
    );
  });

  it("titles the page with the name the CONSOLE would resolve, untranslated and all", () => {
    // A module that declares no module.name is titled with its Latin config
    // name on a zh-TW console. The preview must show that rather than hide it:
    // ai-assistant shipped to review with exactly this gap and it was invisible.
    openAt("?locale=zh-TW");
    renderShell(fakeModule(), {
      moduleName: { "zh-TW": "AI Assistant", "en-US": "AI Assistant" },
    });

    expect(screen.getByText("管理 AI Assistant")).toBeDefined();
  });

  it("frames the mount at the console's own width, never narrower", () => {
    const { container } = renderShell(fakeModule());

    // 🔴 NOT "FULL WIDTH", AND NOT max-w-3xl. ModuleMount wraps every mount in
    // max-w-5xl mx-auto; ai-assistant's first preview used max-w-3xl, which is
    // what made the owner call the page cramped — a verdict about the harness.
    expect(SURFACE_FRAME.settings).toContain("max-w-5xl");
    expect(container.querySelector(".max-w-5xl")).not.toBeNull();
    expect(container.querySelector(".max-w-3xl")).toBeNull();
  });

  it("draws no settings header on a nav surface", () => {
    renderShell(fakeModule(), { surface: "nav" });

    // A nav-item page is not a settings page, and the console gives it no
    // "設定 / 管理 …" header. What it DOES give it is web-applications#390's
    // to decide; until then this must not invent one.
    expect(screen.queryByRole("heading", { level: 1 })).toBeNull();
  });
});

describe("the locale axis", () => {
  // resolveLocale itself is asserted in hostChrome.test.ts. What needs a render
  // is that the resolved value REACHES the module, and that changing it gives
  // the module a real unmount/mount cycle rather than a silent re-render.
  it("hands the resolved locale to the module, and remounts when it changes", () => {
    openAt("?locale=zh-TW");
    const module = fakeModule();
    renderShell(module);
    expect(module.scene?.locale).toBe("zh-TW");

    fireEvent.click(screen.getByRole("button", { name: "en-US", pressed: false }));

    expect(module.scene?.locale).toBe("en-US");
    expect(module.disposed).toHaveBeenCalled();
  });
});

describe("the platform's unsaved bar", () => {
  it("does not remount the module when the bar is raised", () => {
    const module = fakeModule();
    renderShell(module);
    const mountsBefore = module.mounts.length;

    act(() => {
      module.scene!.unsaved.set({
        message: "有未發布的變更",
        saveLabel: "發布並啟用",
        resetLabel: "重設",
        onSave: () => undefined,
        onReset: () => undefined,
      });
    });

    // 🔴 RAISING THE BAR RE-RENDERS THE SHELL. When the bridge or the mount ref
    // is rebuilt on every render, that re-render unmounts and remounts the
    // module — and the page under review goes blank at the exact moment the
    // reviewer is looking at it.
    expect(screen.getByText("有未發布的變更")).toBeDefined();
    expect(module.mounts.length).toBe(mountsBefore);
    expect(module.disposed).not.toHaveBeenCalled();
  });

  it("confirms a save only after the SAVE action, never on going clean", async () => {
    // 🔴 FAKE TIMERS ARE LOAD-BEARING HERE, AND THIS ASSERTION WAS VACUOUS
    // WITHOUT THEM. The host defers the confirmation by 50 ms, so a test that
    // checks for the toast on the next line finds nothing whatever the code
    // does: with `armed` deleted, the invented-feedback bug this test exists
    // to catch still passed. Advance the clock, THEN assert the absence.
    vi.useFakeTimers();
    try {
      openAt("?locale=zh-TW");
      const module = fakeModule();
      renderShell(module);
      const settle = async () => {
        await act(async () => {
          vi.advanceTimersByTime(200);
        });
      };

      // A page that reports itself clean has saved nothing — on mount, on a
      // scene that saved nothing, after a reset. A harness that toasts "已儲存"
      // here invents feedback the product does not give, and the owner
      // reviews the invention.
      act(() => module.scene!.unsaved.set(null));
      await settle();
      expect(screen.queryByText("已儲存")).toBeNull();

      act(() =>
        module.scene!.unsaved.set({
          message: "有未發布的變更",
          saveLabel: "發布並啟用",
          resetLabel: "重設",
          onSave: vi.fn(),
          onReset: vi.fn(),
        }),
      );
      act(() => {
        fireEvent.click(screen.getByRole("button", { name: "重設" }));
      });
      act(() => module.scene!.unsaved.set(null));
      await settle();
      expect(screen.queryByText("已儲存")).toBeNull();
    } finally {
      vi.useRealTimers();
    }
  });

  it("confirms with the CONSOLE's wording once the save action ran", async () => {
    vi.useFakeTimers();
    try {
      openAt("?locale=zh-TW");
      const module = fakeModule();
      renderShell(module);
      const onSave = vi.fn();

      act(() =>
        module.scene!.unsaved.set({
          message: "有未發布的變更",
          saveLabel: "發布並啟用",
          resetLabel: "重設",
          onSave,
          onReset: () => undefined,
        }),
      );
      act(() => {
        fireEvent.click(screen.getByRole("button", { name: "發布並啟用" }));
      });
      expect(onSave).toHaveBeenCalledOnce();

      act(() => module.scene!.unsaved.set(null));
      await act(async () => {
        vi.advanceTimersByTime(100);
      });

      // The host confirms from ITS catalog (moduleMount.saved), not the
      // module's — so the preview shows the sentence production shows.
      expect(screen.getByText("已儲存")).toBeDefined();
    } finally {
      vi.useRealTimers();
    }
  });

  it("offers reset but no save while the page says it cannot save", () => {
    const module = fakeModule();
    renderShell(module);

    act(() =>
      module.scene!.unsaved.set({
        message: "有未發布的變更",
        saveLabel: "發布並啟用",
        resetLabel: "重設",
        canSave: false,
        onSave: () => undefined,
        onReset: () => undefined,
      }),
    );

    expect(screen.queryByRole("button", { name: "發布並啟用" })).toBeNull();
    expect(screen.getByRole("button", { name: "重設" })).toBeDefined();
  });
});
