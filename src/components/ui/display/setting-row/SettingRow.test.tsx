import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { SettingRow } from "./SettingRow";

afterEach(cleanup);

describe("SettingRow", () => {
  it("renders title and description", () => {
    render(
      <SettingRow
        title="Developer mode"
        description="Show the developer rail."
        control={<button>toggle</button>}
      />,
    );
    expect(screen.getByText("Developer mode")).toBeInTheDocument();
    expect(screen.getByText("Show the developer rail.")).toBeInTheDocument();
  });

  it("renders the control slot", () => {
    render(
      <SettingRow
        title="Beta program"
        control={<button>my-control</button>}
      />,
    );
    expect(screen.getByText("my-control")).toBeInTheDocument();
  });

  it("omits the description block when not provided", () => {
    const { container } = render(
      <SettingRow title="Title only" control={<span>x</span>} />,
    );
    expect(container.querySelectorAll("p").length).toBe(1);
  });

  it("applies the neutral border by default", () => {
    const { container } = render(
      <SettingRow title="X" control={<span />} />,
    );
    expect(container.firstChild).toHaveClass("border-outline-variant");
  });

  it.each([
    ["primary", "border-primary/40"],
    ["secondary", "border-secondary/40"],
    ["tertiary", "border-tertiary/40"],
    ["error", "border-error/40"],
    ["warning", "border-warning/40"],
    ["success", "border-success/40"],
  ] as const)("applies the %s tone border", (tone, expected) => {
    const { container } = render(
      <SettingRow title="X" control={<span />} tone={tone} />,
    );
    expect(container.firstChild).toHaveClass(expected);
  });

  /**
   * 🔴 IN FRONT OF THE TEXT, NOT BESIDE THE CONTROL. The slot exists because
   * `title` and `description` are plain strings: without it a caller with a
   * mark to show either hangs it off `control`, where it reads as decoration on
   * the action rather than as the row's subject, or rebuilds the row by hand
   * and drifts out of step with this one.
   */
  it("renders the leading slot before the title", () => {
    render(
      <SettingRow
        title="Transfer ownership"
        leading={<span data-testid="mark" />}
        control={<button type="button">Go</button>}
      />,
    );

    const mark = screen.getByTestId("mark");
    const title = screen.getByText("Transfer ownership");
    expect(
      mark.compareDocumentPosition(title) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).not.toBe(0);
  });

  /**
   * 🔴 `ReactNode` INCLUDES `number`, AND `0 && x` IS `0`. A `leading &&` guard
   * therefore renders a bare "0" outside the wrapper for a legal value. Found
   * in review, not in use — but the guard is the kind that is copied.
   */
  it("renders nothing for a falsy numeric leading value", () => {
    const { container } = render(
      <SettingRow title="X" leading={0} control={<span />} />,
    );
    expect(container.textContent).not.toContain("0");
    expect(container.firstChild?.childNodes).toHaveLength(2);
  });

  /** No slot, no box — the row must not gain a gap it did not have before. */
  it("renders no leading box when the slot is empty", () => {
    const { container } = render(<SettingRow title="X" control={<span />} />);
    expect(container.firstChild?.childNodes).toHaveLength(2);
  });

  // 🔴 jsdom computes no layout, so these assert the CONTRACT that produces the
  // right layout rather than the layout itself: the row may wrap, and the text
  // column has a real basis to wrap at. The picture is checked on the
  // LongDescriptionWithWideControl story at 400px — that is the evidence; this
  // is what stops the classes being removed without anyone noticing.
  it("lets the row wrap instead of starving the text column", () => {
    const { container } = render(
      <SettingRow title="Token ceiling" description="A long one." control={<span>4096</span>} />,
    );
    expect(container.firstChild).toHaveClass("flex-wrap");
  });

  it("gives the text column a basis to wrap at, not bare flex-1", () => {
    const { container } = render(
      <SettingRow title="Token ceiling" description="A long one." control={<span>4096</span>} />,
    );
    const text = screen.getByText("Token ceiling").parentElement;
    expect(text).toHaveClass("basis-48");
    expect(text).toHaveClass("grow");
    // flex-1 sets basis-0, which is exactly the "shrink to nothing" the basis
    // above replaces — if both are present the basis is dead.
    expect(text).not.toHaveClass("flex-1");
  });

  it("forwards the className prop", () => {
    const { container } = render(
      <SettingRow title="X" control={<span />} className="custom-class" />,
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });
});
