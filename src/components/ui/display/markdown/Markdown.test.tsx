import { cleanup, render, screen } from "@testing-library/react";
import { describe, expect, it, afterEach } from "vitest";
import { Markdown } from "./Markdown";

afterEach(cleanup);

describe("Markdown", () => {
  it("renders an h3 for a top-level heading", () => {
    render(<Markdown source="# Hello" />);
    const h = screen.getByRole("heading", { level: 3 });
    expect(h).toHaveTextContent("Hello");
  });

  it("renders h4 / h5 for nested heading levels", () => {
    render(<Markdown source={`## Two\n\n### Three`} />);
    expect(screen.getByRole("heading", { level: 4 })).toHaveTextContent("Two");
    expect(screen.getByRole("heading", { level: 5 })).toHaveTextContent("Three");
  });

  it("renders a paragraph for plain text", () => {
    render(<Markdown source="Hello world." />);
    expect(screen.getByText("Hello world.").closest("p")).toBeInTheDocument();
  });

  it("joins consecutive non-blank lines into one paragraph", () => {
    render(<Markdown source={`first line\nsecond line`} />);
    expect(screen.getByText("first line second line")).toBeInTheDocument();
  });

  it("renders an unordered list for - / * lines", () => {
    render(<Markdown source={`- one\n- two\n* three`} />);
    const list = screen.getByRole("list");
    expect(list.tagName).toBe("UL");
    expect(list.children).toHaveLength(3);
  });

  it("renders inline **bold** as <strong>", () => {
    render(<Markdown source="This is **bold** text." />);
    const strong = screen.getByText("bold");
    expect(strong.tagName).toBe("STRONG");
  });

  it("renders inline `code` as <code>", () => {
    render(<Markdown source="Run `npm install` first." />);
    const code = screen.getByText("npm install");
    expect(code.tagName).toBe("CODE");
  });

  it("renders fenced code blocks inside a <pre>", () => {
    render(<Markdown source={"```ts\nconst x = 1;\n```"} />);
    const pre = screen.getByText("const x = 1;").closest("pre");
    expect(pre).toBeInTheDocument();
  });

  it("shows the language label when the fence specifies one", () => {
    render(<Markdown source={"```ts\nx\n```"} />);
    expect(screen.getByText("ts")).toBeInTheDocument();
  });

  it("renders nothing visible for an empty source", () => {
    const { container } = render(<Markdown source="" />);
    expect(container.firstChild).toBeEmptyDOMElement();
  });

  it("applies a custom className to the wrapper", () => {
    const { container } = render(<Markdown source="Hi" className="my-extra" />);
    expect(container.firstChild).toHaveClass("my-extra");
  });
});
