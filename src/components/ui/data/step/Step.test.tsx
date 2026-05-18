import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi, afterEach } from "vitest";
import { Step } from "./Step";

afterEach(cleanup);

describe("Step", () => {
  it("renders the step number when not complete", () => {
    render(
      <Step n={2} title="Modules" status="pending">
        body
      </Step>,
    );
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("Modules")).toBeInTheDocument();
  });

  it("renders a check icon instead of the number when complete", () => {
    render(
      <Step n={1} title="Details" status="complete">
        body
      </Step>,
    );
    // The Icon component renders the material symbol name as text.
    expect(screen.getByText("check")).toBeInTheDocument();
    // The numeric label should not appear inside the circle.
    expect(screen.queryByText("1")).not.toBeInTheDocument();
  });

  it("renders the Edit button only when complete + onEdit is provided", () => {
    const onEdit = vi.fn();
    const { rerender } = render(
      <Step n={1} title="Details" status="active" onEdit={onEdit}>
        body
      </Step>,
    );
    expect(screen.queryByText("Edit")).not.toBeInTheDocument();

    rerender(
      <Step n={1} title="Details" status="complete" onEdit={onEdit}>
        body
      </Step>,
    );
    expect(screen.getByText("Edit")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Edit"));
    expect(onEdit).toHaveBeenCalledOnce();
  });

  it("does not render the Edit button when complete but no onEdit is passed", () => {
    render(
      <Step n={1} title="Details" status="complete">
        body
      </Step>,
    );
    expect(screen.queryByText("Edit")).not.toBeInTheDocument();
  });

  it("renders children inside the content slot", () => {
    render(
      <Step n={1} title="Details" status="active">
        <span data-testid="body">step body</span>
      </Step>,
    );
    expect(screen.getByTestId("body")).toBeInTheDocument();
  });

  it("omits children wrapper when no children are passed", () => {
    render(<Step n={1} title="Details" status="active" />);
    expect(screen.getByText("Details")).toBeInTheDocument();
  });

  it("dims the title when status is pending", () => {
    render(
      <Step n={3} title="Review" status="pending">
        body
      </Step>,
    );
    expect(screen.getByText("Review")).toHaveClass("text-on-surface-variant");
  });

  it("applies a custom className to the section wrapper", () => {
    const { container } = render(
      <Step n={1} title="Details" status="active" className="my-extra">
        body
      </Step>,
    );
    expect(container.firstChild).toHaveClass("my-extra");
  });
});
