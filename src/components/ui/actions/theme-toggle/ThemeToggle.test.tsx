import { render, cleanup } from "@testing-library/react";
import { describe, test, expect, afterEach, vi } from "vitest";
import { ThemeToggle } from "./ThemeToggle";

afterEach(cleanup);

describe("ThemeToggle", () => {
  test("renders auto icon", () => {
    const { container } = render(
      <ThemeToggle theme="auto" onChangeTheme={() => {}} />,
    );
    expect(container.textContent).toContain("brightness_auto");
  });

  test("renders light icon", () => {
    const { container } = render(
      <ThemeToggle theme="light" onChangeTheme={() => {}} />,
    );
    expect(container.textContent).toContain("light_mode");
  });

  test("renders dark icon", () => {
    const { container } = render(
      <ThemeToggle theme="dark" onChangeTheme={() => {}} />,
    );
    expect(container.textContent).toContain("dark_mode");
  });

  test("calls onChangeTheme with next theme on click", () => {
    const onChangeTheme = vi.fn();
    const { container } = render(
      <ThemeToggle theme="auto" onChangeTheme={onChangeTheme} />,
    );
    container.querySelector("button")!.click();
    expect(onChangeTheme).toHaveBeenCalledWith("light");
  });

  test("cycles auto → light → dark → auto", () => {
    const onChangeTheme = vi.fn();

    const { unmount: u1 } = render(
      <ThemeToggle theme="auto" onChangeTheme={onChangeTheme} />,
    );
    document.querySelector("button")!.click();
    expect(onChangeTheme).toHaveBeenLastCalledWith("light");
    u1();

    const { unmount: u2 } = render(
      <ThemeToggle theme="light" onChangeTheme={onChangeTheme} />,
    );
    document.querySelector("button")!.click();
    expect(onChangeTheme).toHaveBeenLastCalledWith("dark");
    u2();

    render(<ThemeToggle theme="dark" onChangeTheme={onChangeTheme} />);
    document.querySelector("button")!.click();
    expect(onChangeTheme).toHaveBeenLastCalledWith("auto");
  });

  test("has aria-label with current theme", () => {
    const { container } = render(
      <ThemeToggle theme="light" onChangeTheme={() => {}} />,
    );
    const button = container.querySelector("button")!;
    expect(button.getAttribute("aria-label")).toContain("Light theme");
  });

  test("applies custom className", () => {
    const { container } = render(
      <ThemeToggle theme="auto" onChangeTheme={() => {}} className="my-class" />,
    );
    expect(container.querySelector("button")).toHaveClass("my-class");
  });

  test("forwards disabled attribute", () => {
    const { container } = render(
      <ThemeToggle theme="auto" onChangeTheme={() => {}} disabled />,
    );
    expect(container.querySelector("button")).toBeDisabled();
  });

  test("renders as button with type button", () => {
    const { container } = render(
      <ThemeToggle theme="auto" onChangeTheme={() => {}} />,
    );
    expect(container.querySelector("button")).toHaveAttribute("type", "button");
  });
});

describe("ThemeToggle.next", () => {
  test("auto → light", () => {
    expect(ThemeToggle.next("auto")).toBe("light");
  });

  test("light → dark", () => {
    expect(ThemeToggle.next("light")).toBe("dark");
  });

  test("dark → auto", () => {
    expect(ThemeToggle.next("dark")).toBe("auto");
  });
});
