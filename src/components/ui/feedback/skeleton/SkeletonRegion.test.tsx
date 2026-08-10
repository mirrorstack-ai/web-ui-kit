import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { SkeletonRegion } from "./SkeletonRegion";

afterEach(cleanup);

describe("SkeletonRegion", () => {
  it("announces the busy region and hides its visual subtree", () => {
    const { container } = render(
      <SkeletonRegion label="Loading account details">
        <div data-testid="placeholder" />
      </SkeletonRegion>,
    );

    const region = screen.getByRole("status");
    expect(region).toBe(container.firstElementChild);
    expect(region).toHaveAttribute("aria-busy", "true");
    expect(region).toHaveAttribute("aria-label", "Loading account details");
    expect(region.firstElementChild).toHaveAttribute("aria-hidden", "true");
  });
});
