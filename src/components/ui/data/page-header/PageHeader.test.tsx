import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { PageHeader } from "./PageHeader";

afterEach(cleanup);

describe("PageHeader", () => {
  it("renders title and description", () => {
    render(
      <PageHeader
        title="Billing"
        description="Charges, plan, usage, and payment for this account."
      />,
    );
    expect(screen.getByText("Billing")).toBeInTheDocument();
    expect(
      screen.getByText("Charges, plan, usage, and payment for this account."),
    ).toBeInTheDocument();
  });

  it("renders the title as an h1", () => {
    render(<PageHeader title="Profile" />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Profile",
    );
  });

  it("renders the tail slot", () => {
    render(
      <PageHeader title="X" tail={<button>my-tail</button>} />,
    );
    expect(screen.getByText("my-tail")).toBeInTheDocument();
  });

  it("renders the leading slot", () => {
    render(
      <PageHeader title="X" leading={<span>my-leading</span>} />,
    );
    expect(screen.getByText("my-leading")).toBeInTheDocument();
  });

  it("renders the path slot", () => {
    render(
      <PageHeader title="X" path={<a href="/back">my-path</a>} />,
    );
    expect(screen.getByText("my-path")).toBeInTheDocument();
  });

  it("omits the description when not provided", () => {
    const { container } = render(<PageHeader title="Title only" />);
    expect(container.querySelectorAll("p").length).toBe(0);
  });

  it("forwards the className prop", () => {
    const { container } = render(
      <PageHeader title="X" className="custom-class" />,
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });
});
