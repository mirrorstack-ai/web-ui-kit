import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { SectionHeader } from "./SectionHeader";

afterEach(cleanup);

describe("SectionHeader", () => {
  it("renders title and description", () => {
    render(
      <SectionHeader
        title="Payment method"
        description="Cards used to settle invoices."
      />,
    );
    expect(screen.getByText("Payment method")).toBeInTheDocument();
    expect(
      screen.getByText("Cards used to settle invoices."),
    ).toBeInTheDocument();
  });

  it("renders the title as an h2", () => {
    render(<SectionHeader title="Invoices" />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Invoices",
    );
  });

  it("renders the action slot", () => {
    render(
      <SectionHeader title="X" action={<button>my-action</button>} />,
    );
    expect(screen.getByText("my-action")).toBeInTheDocument();
  });

  it("omits the description when not provided", () => {
    const { container } = render(<SectionHeader title="Title only" />);
    expect(container.querySelectorAll("p").length).toBe(0);
  });

  it("forwards the className prop", () => {
    const { container } = render(
      <SectionHeader title="X" className="custom-class" />,
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });
});
