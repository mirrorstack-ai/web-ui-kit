import { cleanup, fireEvent, render } from "@testing-library/react";
import { describe, expect, it, afterEach } from "vitest";
import { NotFoundScene } from "./NotFoundScene";

afterEach(() => {
  cleanup();
  Reflect.deleteProperty(window, "matchMedia");
});

/** jsdom has no matchMedia — install a stub with a fixed reduce answer. */
function stubReducedMotion(matches: boolean) {
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    writable: true,
    value: (query: string) => ({ matches, media: query }),
  });
}

describe("NotFoundScene", () => {
  it("renders the 404 code, default title, and kit logo", () => {
    const { getByText, getByRole } = render(<NotFoundScene />);
    expect(getByText("404")).toBeInTheDocument();
    expect(
      getByRole("heading", { name: "Oops! Page Not Found!" }),
    ).toBeInTheDocument();
    expect(getByRole("img", { name: "MirrorStack Logo" })).toBeInTheDocument();
  });

  it("links home to / by default and to homeHref when given", () => {
    const { getByRole, rerender } = render(<NotFoundScene />);
    expect(getByRole("link", { name: "Return to Home" })).toHaveAttribute("href", "/");
    rerender(<NotFoundScene homeHref="/apps" />);
    expect(getByRole("link", { name: "Return to Home" })).toHaveAttribute("href", "/apps");
  });

  it("renders the default roster unpressed with no verdict", () => {
    const { getByRole, queryByText } = render(<NotFoundScene />);
    for (const name of ["Claude", "Gemini", "GPT", "Grok"]) {
      expect(getByRole("button", { name })).toHaveAttribute("aria-pressed", "false");
    }
    expect(queryByText(/You chose the engineer/)).not.toBeInTheDocument();
  });

  it("selects a member and reveals the verdict", () => {
    const { getByRole, getByText } = render(<NotFoundScene />);
    fireEvent.click(getByRole("button", { name: "Claude" }));
    expect(getByRole("button", { name: "Claude" })).toHaveAttribute("aria-pressed", "true");
    expect(
      getByText("You chose the engineer “Claude”, submit the answer when you return to home"),
    ).toBeInTheDocument();
  });

  it("moves the selection when another member is picked", () => {
    const { getByRole, getByText } = render(<NotFoundScene />);
    fireEvent.click(getByRole("button", { name: "Claude" }));
    fireEvent.click(getByRole("button", { name: "Grok" }));
    expect(getByRole("button", { name: "Claude" })).toHaveAttribute("aria-pressed", "false");
    expect(getByRole("button", { name: "Grok" })).toHaveAttribute("aria-pressed", "true");
    expect(getByText(/“Grok”/)).toBeInTheDocument();
  });

  it("cancel unpresses immediately and hides the verdict after the dismiss animation", () => {
    const { container, getByRole, queryByText } = render(<NotFoundScene />);
    fireEvent.click(getByRole("button", { name: "GPT" }));
    fireEvent.click(getByRole("button", { name: "Cancel Select" }));

    // Unpressed right away; the verdict stays mounted while it animates out.
    expect(getByRole("button", { name: "GPT" })).toHaveAttribute("aria-pressed", "false");
    const verdict = container.querySelector(".ms-fire-verdict");
    expect(verdict).toHaveClass("ms-fire-verdict--dismiss");

    fireEvent.animationEnd(verdict!);
    expect(queryByText(/You chose the engineer/)).not.toBeInTheDocument();
  });

  it("keeps the verdict when the reveal animation ends", () => {
    const { container, getByRole, getByText } = render(<NotFoundScene />);
    fireEvent.click(getByRole("button", { name: "GPT" }));
    fireEvent.animationEnd(container.querySelector(".ms-fire-verdict")!);
    expect(getByText(/“GPT”/)).toBeInTheDocument();
  });

  it("re-selecting mid-dismiss keeps the new verdict alive", () => {
    const { container, getByRole, getByText } = render(<NotFoundScene />);
    fireEvent.click(getByRole("button", { name: "GPT" }));
    fireEvent.click(getByRole("button", { name: "Cancel Select" }));
    fireEvent.click(getByRole("button", { name: "Gemini" }));
    const verdict = container.querySelector(".ms-fire-verdict");
    expect(verdict).toHaveClass("ms-fire-verdict--reveal");
    fireEvent.animationEnd(verdict!);
    expect(getByText(/“Gemini”/)).toBeInTheDocument();
  });

  it("hides the verdict immediately on cancel under prefers-reduced-motion", () => {
    stubReducedMotion(true);
    const { getByRole, queryByText } = render(<NotFoundScene />);
    fireEvent.click(getByRole("button", { name: "Claude" }));
    fireEvent.click(getByRole("button", { name: "Cancel Select" }));
    // No animationend needed — the block must not strand hidden-but-mounted.
    expect(queryByText(/You chose the engineer/)).not.toBeInTheDocument();
  });

  it("merges partial strings over the English defaults", () => {
    const { getByRole } = render(
      <NotFoundScene strings={{ title: "哎呀！找不到頁面！", home: "回到首頁" }} />,
    );
    expect(getByRole("heading", { name: "哎呀！找不到頁面！" })).toBeInTheDocument();
    expect(getByRole("link", { name: "回到首頁" })).toBeInTheDocument();
    // Untouched keys keep their defaults.
    fireEvent.click(getByRole("button", { name: "Claude" }));
    expect(getByRole("button", { name: "Cancel Select" })).toBeInTheDocument();
  });

  it("renders a custom roster", () => {
    const { getByRole, queryByRole, getByText } = render(
      <NotFoundScene members={[{ name: "Fable", icon: <span>F</span>, iconBg: "#123456" }]} />,
    );
    expect(queryByRole("button", { name: "Claude" })).not.toBeInTheDocument();
    fireEvent.click(getByRole("button", { name: "Fable" }));
    expect(getByText(/“Fable”/)).toBeInTheDocument();
  });
});
