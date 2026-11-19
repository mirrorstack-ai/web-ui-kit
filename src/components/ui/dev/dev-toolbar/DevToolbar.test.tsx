import { render, screen, fireEvent, within } from "@testing-library/react";
declare const process: any;
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { DevToolbar } from "./DevToolbar";
import { ENV } from "@/utils/env";

vi.mock("@/utils/env", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/utils/env")>();
  return {
    ...actual,
    get isProd() { return process.env.NODE_ENV === "production"; },
    get isDev() { return process.env.NODE_ENV === "development"; },
    get isStorybook() { return Boolean(import.meta.env?.STORYBOOK); },
  };
});

describe("DevToolbar", () => {
  const defaultProps = {
    items: [
      { label: "State A", value: "a" },
      { label: "State B", value: "b" },
    ],
    value: "a",
    onChange: vi.fn(),
  };

  const originalEnv = process.env.NODE_ENV;

  afterEach(() => {
    process.env.NODE_ENV = originalEnv;
    vi.unstubAllEnvs();
    vi.clearAllMocks();
  });

  it("renders in dev mode", () => {
    process.env.NODE_ENV = ENV.DEV;
    render(<DevToolbar {...defaultProps} />);
    expect(screen.getAllByRole("button", { name: "State A" })[0]).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: "State B" })[0]).toBeInTheDocument();
  });

  it("returns null in production", () => {
    process.env.NODE_ENV = ENV.PROD;
    vi.stubEnv("STORYBOOK", "");
    const { container } = render(<DevToolbar {...defaultProps} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders when isProd = true but isStorybook = true", () => {
    process.env.NODE_ENV = ENV.PROD;
    vi.stubEnv("STORYBOOK", "true");
    render(<DevToolbar {...defaultProps} />);
    expect(screen.getAllByRole("button", { name: "State A" })[0]).toBeInTheDocument();
  });

  it("calls onChange when an item is clicked", () => {
    process.env.NODE_ENV = ENV.DEV;
    render(<DevToolbar {...defaultProps} />);
    
    const buttonB = screen.getAllByRole("button", { name: "State B" })[0];
    fireEvent.click(buttonB);
    
    expect(defaultProps.onChange).toHaveBeenCalledWith("b");
  });

  // 🔴 web-ui-kit#408. The bar is `fixed` and centred, so a second instance sits
  // ON the first — which is why quiz-core folded theme/locale into `items` and
  // ai-assistant bolted a ThemeToggle beside the bar. Three axes in ONE bar is
  // what lets both drop their workaround.
  it("renders every axis in one bar and routes each pill to its own onChange", () => {
    process.env.NODE_ENV = ENV.DEV;
    const onScene = vi.fn();
    const onTheme = vi.fn();
    const onLocale = vi.fn();

    // 🔴 SCOPED TO THIS RENDER'S CONTAINER. This file has no `cleanup()` in its
    // afterEach, so every previous test's DOM is still mounted — which is why
    // every assertion here reads `getAllBy...[0]`. A bare `getAllByText("DEV:")`
    // counts the bars from earlier tests too, so "one bar" has to be asked of
    // one render, not of the document.
    const { container } = render(
      <DevToolbar
        axes={[
          {
            label: "Scene",
            items: [{ label: "Empty", value: "empty" }, { label: "Full", value: "full" }],
            value: "empty",
            onChange: onScene,
          },
          {
            label: "Theme",
            items: [{ label: "Light", value: "light" }, { label: "Dark", value: "dark" }],
            value: "light",
            onChange: onTheme,
          },
          {
            label: "Locale",
            items: [{ label: "zh-TW", value: "zh-TW" }, { label: "en", value: "en" }],
            value: "zh-TW",
            onChange: onLocale,
          },
        ]}
      />
    );

    // One bar, not three: every axis lives under a single fixed container.
    expect(within(container).getAllByText("DEV:")).toHaveLength(1);

    fireEvent.click(within(container).getByRole("button", { name: "Dark" }));
    expect(onTheme).toHaveBeenCalledWith("dark");
    // 🔴 The mis-routing this guards: three axes sharing one handler is exactly
    // what folding them into `items` produced.
    expect(onScene).not.toHaveBeenCalled();
    expect(onLocale).not.toHaveBeenCalled();
  });

  it("marks the selected pill of each axis independently", () => {
    process.env.NODE_ENV = ENV.DEV;
    const { container } = render(
      <DevToolbar
        axes={[
          {
            label: "Scene",
            items: [{ label: "Empty", value: "empty" }, { label: "Full", value: "full" }],
            value: "full",
            onChange: vi.fn(),
          },
          {
            label: "Theme",
            items: [{ label: "Light", value: "light" }, { label: "Dark", value: "dark" }],
            value: "dark",
            onChange: vi.fn(),
          },
        ]}
      />
    );

    // aria-pressed rather than a class assertion: the selected pill has to be
    // announced, not merely coloured, and a colour test would pin the palette.
    const bar = within(container);
    expect(bar.getByRole("button", { name: "Full" })).toHaveAttribute("aria-pressed", "true");
    expect(bar.getByRole("button", { name: "Empty" })).toHaveAttribute("aria-pressed", "false");
    expect(bar.getByRole("button", { name: "Dark" })).toHaveAttribute("aria-pressed", "true");
    expect(bar.getByRole("button", { name: "Light" })).toHaveAttribute("aria-pressed", "false");
  });

  // The single-axis form is what both modules and every existing story pass
  // today. A kit release that broke it would block the very previews #408
  // exists to unblock, so it is pinned rather than left to the type system.
  it("still accepts the flat single-axis props", () => {
    process.env.NODE_ENV = ENV.DEV;
    const onChange = vi.fn();
    const { container } = render(
      <DevToolbar items={defaultProps.items} value="a" onChange={onChange} />
    );

    expect(within(container).getAllByText("DEV:")).toHaveLength(1);
    fireEvent.click(within(container).getByRole("button", { name: "State B" }));
    expect(onChange).toHaveBeenCalledWith("b");
  });

  it("calls onToggleError when error button is clicked", () => {
    process.env.NODE_ENV = ENV.DEV;
    const onToggleError = vi.fn();
    render(<DevToolbar {...defaultProps} onToggleError={onToggleError} />);
    
    const errorButton = screen.getAllByRole("button", { name: "Error OFF" })[0];
    fireEvent.click(errorButton);
    
    expect(onToggleError).toHaveBeenCalled();
  });
});
