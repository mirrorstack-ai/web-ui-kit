import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { SettingsSection } from "./SettingsSection";

afterEach(cleanup);

describe("SettingsSection", () => {
  it("renders title and children", () => {
    const { getByText } = render(
      <SettingsSection title="Info">
        <p>body</p>
      </SettingsSection>,
    );
    expect(getByText("Info")).toBeInTheDocument();
    expect(getByText("body")).toBeInTheDocument();
  });

  it("applies p-5 to the inner Surface by default", () => {
    const { getByText } = render(
      <SettingsSection title="Info">
        <p>body</p>
      </SettingsSection>,
    );
    const surface = getByText("body").parentElement as HTMLElement;
    expect(surface.className).toContain("p-5");
    expect(surface.className).toContain("rounded-2xl");
    expect(surface.className).toContain("border-outline-variant");
  });

  it("merges surfaceClassName onto the Surface", () => {
    const { getByText } = render(
      <SettingsSection title="Info" surfaceClassName="px-4 py-2">
        <p>body</p>
      </SettingsSection>,
    );
    const surface = getByText("body").parentElement as HTMLElement;
    expect(surface.className).toContain("px-4");
    expect(surface.className).toContain("py-2");
  });

  it("applies className to the outer wrapper", () => {
    const { container } = render(
      <SettingsSection title="Info" className="mb-8">
        <p>body</p>
      </SettingsSection>,
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("mb-8");
  });
});
