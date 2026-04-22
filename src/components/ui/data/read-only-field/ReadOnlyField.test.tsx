import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi, afterEach } from "vitest";
import { ReadOnlyField } from "./ReadOnlyField";

afterEach(cleanup);

describe("ReadOnlyField", () => {
  it("renders label and value", () => {
    render(<ReadOnlyField label="Email" value="test@example.com" />);
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("test@example.com")).toBeInTheDocument();
  });

  it("applies mono font when mono=true", () => {
    render(<ReadOnlyField label="ID" value="abc-123" mono />);
    expect(screen.getByText("abc-123")).toHaveClass("font-mono");
  });

  it("shows copy button when copyable", () => {
    render(<ReadOnlyField label="Key" value="secret" copyable />);
    expect(screen.getByLabelText("Copy Key")).toBeInTheDocument();
  });

  it("does not show copy button by default", () => {
    render(<ReadOnlyField label="Key" value="secret" />);
    expect(screen.queryByLabelText("Copy Key")).not.toBeInTheDocument();
  });

  it("calls navigator.clipboard.writeText on copy click", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });

    const onCopy = vi.fn();
    render(<ReadOnlyField label="Key" value="secret" copyable onCopy={onCopy} />);
    fireEvent.click(screen.getByLabelText("Copy Key"));

    await vi.waitFor(() => {
      expect(writeText).toHaveBeenCalledWith("secret");
      expect(onCopy).toHaveBeenCalledOnce();
    });
  });

  it("renders suffix content", () => {
    render(
      <ReadOnlyField label="Status" value="Active" suffix={<span data-testid="badge">Live</span>} />,
    );
    expect(screen.getByTestId("badge")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <ReadOnlyField label="Test" value="val" className="mt-4" />,
    );
    expect(container.firstChild).toHaveClass("mt-4");
  });
});
