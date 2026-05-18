import { cleanup, render, screen } from "@testing-library/react";
import { describe, expect, it, afterEach } from "vitest";
import { StatCard } from "./StatCard";

afterEach(cleanup);

describe("StatCard", () => {
  it("renders label, value, and icon", () => {
    render(<StatCard icon="apps" label="Installs" value="1,284" />);
    expect(screen.getByText("Installs")).toBeInTheDocument();
    expect(screen.getByText("1,284")).toBeInTheDocument();
    expect(screen.getByText("apps")).toBeInTheDocument();
  });

  it("truncates string values", () => {
    render(<StatCard icon="apps" label="L" value="some-long-string" />);
    expect(screen.getByText("some-long-string")).toHaveClass("truncate");
  });

  it("does not apply truncate when value is a ReactNode", () => {
    render(
      <StatCard
        icon="apps"
        label="L"
        value={<span data-testid="custom">x</span>}
      />,
    );
    const node = screen.getByTestId("custom");
    expect(node.parentElement).not.toHaveClass("truncate");
  });

  it("applies a custom className to the underlying Card", () => {
    const { container } = render(
      <StatCard icon="apps" label="L" value="v" className="my-extra" />,
    );
    expect(container.firstChild).toHaveClass("my-extra");
  });
});
