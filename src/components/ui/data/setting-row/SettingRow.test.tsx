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

  it("forwards the className prop", () => {
    const { container } = render(
      <SettingRow title="X" control={<span />} className="custom-class" />,
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });
});
