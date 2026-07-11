import { cleanup, fireEvent, render } from "@testing-library/react";
import { describe, expect, it, vi, afterEach } from "vitest";
import { ErrorScene } from "./ErrorScene";

afterEach(cleanup);

describe("ErrorScene", () => {
  it("renders the 500 code and error title by default", () => {
    const { getByText, getByRole } = render(<ErrorScene />);
    expect(getByText("500")).toBeInTheDocument();
    expect(
      getByRole("heading", { name: "Oops! Something Went Wrong!" }),
    ).toBeInTheDocument();
    expect(
      getByText("One of our Development Team just broke production!"),
    ).toBeInTheDocument();
  });

  it("accepts a custom code", () => {
    const { getByText } = render(<ErrorScene code="503" />);
    expect(getByText("503")).toBeInTheDocument();
  });

  it("renders no retry button without onRetry", () => {
    const { queryByRole } = render(<ErrorScene />);
    expect(queryByRole("button", { name: "Try Again" })).not.toBeInTheDocument();
  });

  it("fires onRetry from the Try Again button", () => {
    const onRetry = vi.fn();
    const { getByRole } = render(<ErrorScene onRetry={onRetry} />);
    fireEvent.click(getByRole("button", { name: "Try Again" }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("uses a custom retryLabel", () => {
    const { getByRole } = render(<ErrorScene onRetry={() => {}} retryLabel="再試一次" />);
    expect(getByRole("button", { name: "再試一次" })).toBeInTheDocument();
  });

  it("renders the digest with the default label", () => {
    const { getByText } = render(<ErrorScene digest="abc123" />);
    expect(getByText("Error ID: abc123")).toBeInTheDocument();
  });

  it("renders the digest with a custom label", () => {
    const { getByText } = render(
      <ErrorScene digest="abc123" digestLabel={(d) => `Ref ${d}`} />,
    );
    expect(getByText("Ref abc123")).toBeInTheDocument();
  });

  it("renders no digest footer without a digest", () => {
    const { queryByText } = render(<ErrorScene />);
    expect(queryByText(/Error ID:/)).not.toBeInTheDocument();
  });

  it("shares the fire-an-engineer flow with the 404 scene", () => {
    const { getByRole, getByText } = render(<ErrorScene />);
    fireEvent.click(getByRole("button", { name: "Gemini" }));
    expect(getByRole("button", { name: "Gemini" })).toHaveAttribute("aria-pressed", "true");
    expect(getByText(/“Gemini”/)).toBeInTheDocument();
  });

  it("merges partial strings over the error defaults", () => {
    const { getByRole } = render(<ErrorScene strings={{ title: "哎呀！出了點問題！" }} />);
    expect(getByRole("heading", { name: "哎呀！出了點問題！" })).toBeInTheDocument();
    expect(getByRole("link", { name: "Return to Home" })).toBeInTheDocument();
  });
});
