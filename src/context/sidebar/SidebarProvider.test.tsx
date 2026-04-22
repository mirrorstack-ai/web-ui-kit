import { cleanup, render, screen, fireEvent, act } from "@testing-library/react";
import { describe, expect, it, afterEach } from "vitest";
import { SidebarProvider, useSidebarWidth } from "./SidebarProvider";

afterEach(cleanup);

function TestConsumer() {
  const { sidebarWidth, setSidebarWidth } = useSidebarWidth();
  return (
    <div>
      <span data-testid="width">{sidebarWidth}</span>
      <button onClick={() => setSidebarWidth(500)}>Resize</button>
    </div>
  );
}

describe("SidebarProvider", () => {
  it("provides default width", () => {
    render(
      <SidebarProvider>
        <TestConsumer />
      </SidebarProvider>,
    );
    expect(screen.getByTestId("width").textContent).toBe("350");
  });

  it("accepts custom default width", () => {
    render(
      <SidebarProvider defaultWidth={400}>
        <TestConsumer />
      </SidebarProvider>,
    );
    expect(screen.getByTestId("width").textContent).toBe("400");
  });

  it("updates width", () => {
    render(
      <SidebarProvider>
        <TestConsumer />
      </SidebarProvider>,
    );
    act(() => {
      fireEvent.click(screen.getByText("Resize"));
    });
    expect(screen.getByTestId("width").textContent).toBe("500");
  });

  it("throws when used outside provider", () => {
    expect(() => render(<TestConsumer />)).toThrow(
      "useSidebarWidth must be used within a SidebarProvider",
    );
  });
});
