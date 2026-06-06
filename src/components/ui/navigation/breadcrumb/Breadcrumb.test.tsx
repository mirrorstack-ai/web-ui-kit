import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
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

  it("makes the back arrow a link to the first (root) segment", () => {
    render(
      <Breadcrumb
        items={[
          { label: "Dev Modules", href: "/dev" },
          { label: "Acme Module", href: "/dev/module/acme" },
        ]}
      />,
    );
    const back = screen.getByRole("link", { name: "Back to Dev Modules" });
    expect(back).toHaveAttribute("href", "/dev");
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

  it("calls onNavigate with the href + event for segments and the back arrow", () => {
    const onNavigate = vi.fn();
    render(
      <Breadcrumb
        items={[
          { label: "Apps", href: "/apps" },
          { label: "Acme", href: "/apps/acme" },
        ]}
        onNavigate={onNavigate}
      />,
    );
    fireEvent.click(screen.getByRole("link", { name: "Acme" }));
    expect(onNavigate).toHaveBeenLastCalledWith("/apps/acme", expect.anything());
    fireEvent.click(screen.getByRole("link", { name: "Back to Apps" }));
    expect(onNavigate).toHaveBeenLastCalledWith("/apps", expect.anything());
  });

  it("lets onNavigate intercept navigation via preventDefault", () => {
    const onNavigate = vi.fn((_href: string, e: { preventDefault: () => void }) =>
      e.preventDefault(),
    );
    render(<Breadcrumb items={[{ label: "Apps", href: "/apps" }]} onNavigate={onNavigate} />);
    const link = screen.getByRole("link", { name: "Apps" });
    const defaultPrevented = !fireEvent.click(link);
    expect(onNavigate).toHaveBeenCalledTimes(1);
    expect(defaultPrevented).toBe(true);
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
