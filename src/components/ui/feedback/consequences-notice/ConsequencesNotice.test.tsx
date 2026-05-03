import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ConsequencesNotice } from "./ConsequencesNotice";

afterEach(cleanup);

describe("ConsequencesNotice", () => {
  it("renders the title and a bullet per item", () => {
    render(
      <ConsequencesNotice
        title="Before you continue"
        items={["First consequence", "Second consequence"]}
      />,
    );
    expect(screen.getByText("Before you continue")).toBeInTheDocument();
    expect(screen.getByText("First consequence")).toBeInTheDocument();
    expect(screen.getByText("Second consequence")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  it("accepts ReactNode items so callers can embed strong/links", () => {
    render(
      <ConsequencesNotice
        title="t"
        items={[
          <>
            You can restore within <strong>90 days</strong>.
          </>,
        ]}
      />,
    );
    expect(screen.getByText("90 days").tagName).toBe("STRONG");
  });

  it("hides the leading variant icon (delegates to Alert hideIcon)", () => {
    render(<ConsequencesNotice title="t" items={["x"]} />);
    // The error variant's default icon is "error" — should not appear.
    expect(screen.queryByText("error")).not.toBeInTheDocument();
  });

  it("uses error variant by default and accepts an override", () => {
    const { rerender } = render(<ConsequencesNotice title="t" items={["x"]} />);
    expect(screen.getByRole("alert")).toHaveClass("text-error");
    rerender(
      <ConsequencesNotice title="t" items={["x"]} variant="warning" />,
    );
    expect(screen.getByRole("alert")).toHaveClass("text-warning");
  });
});
