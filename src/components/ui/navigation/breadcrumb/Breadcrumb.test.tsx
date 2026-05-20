import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Breadcrumb } from "./Breadcrumb";

afterEach(cleanup);

describe("Breadcrumb", () => {
  it("renders each item as an anchor with the right href", () => {
    render(
      <Breadcrumb
        items={[
          { label: "Dev Modules", href: "/dev" },
          { label: "Acme Module", href: "/dev/module/acme" },
        ]}
      />,
    );
    const first = screen.getByRole("link", { name: "Dev Modules" });
    const second = screen.getByRole("link", { name: "Acme Module" });
    expect(first).toHaveAttribute("href", "/dev");
    expect(second).toHaveAttribute("href", "/dev/module/acme");
  });

  it("exposes a Breadcrumb landmark for assistive tech", () => {
    render(<Breadcrumb items={[{ label: "X", href: "/x" }]} />);
    expect(
      screen.getByRole("navigation", { name: "Breadcrumb" }),
    ).toBeInTheDocument();
  });

  it("inserts a separator between items, none before the first", () => {
    render(
      <Breadcrumb
        items={[
          { label: "A", href: "/a" },
          { label: "B", href: "/b" },
          { label: "C", href: "/c" },
        ]}
      />,
    );
    // Three items → two "/" separators between them.
    expect(screen.getAllByText("/").length).toBe(2);
  });

  it("renders nothing when items is empty", () => {
    const { container } = render(<Breadcrumb items={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it("forwards the className prop", () => {
    const { container } = render(
      <Breadcrumb
        items={[{ label: "X", href: "/x" }]}
        className="custom-class"
      />,
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });
});
