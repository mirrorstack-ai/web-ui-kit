import { cleanup, render, screen } from "@testing-library/react";
import { describe, expect, it, afterEach } from "vitest";
import { ImageCarousel } from "./ImageCarousel";

afterEach(cleanup);

const images = [
  { src: "https://example.com/1.jpg", alt: "Image 1", title: "First", description: "Desc 1" },
  { src: "https://example.com/2.jpg", alt: "Image 2", title: "Second", description: "Desc 2" },
];

describe("ImageCarousel", () => {
  it("renders all images", () => {
    render(<ImageCarousel images={images} />);
    expect(screen.getByText("First")).toBeInTheDocument();
    expect(screen.getByText("Second")).toBeInTheDocument();
  });

  it("filters out images with empty src", () => {
    const withEmpty = [...images, { src: "", alt: "", title: "Empty", description: "" }];
    render(<ImageCarousel images={withEmpty} />);
    expect(screen.queryByText("Empty")).not.toBeInTheDocument();
  });

  /**
   * 🔴 The caption is prose someone TYPED. HTML collapses newlines into single
   * spaces, so an org that wrote a multi-line caption for its login page saw
   * one run-on line — in the console's own preview and in production alike,
   * with nothing on screen to explain why.
   *
   * Asserted on the CLASS, not on `getComputedStyle`: these tests run in jsdom
   * with no Tailwind compiled, so every computed `white-space` is `normal` and
   * a style assertion would fail whether the fix were present or not. The class
   * is the mechanism, and it is the part that can actually be observed here.
   *
   * The text assertion below is deliberately NOT the check — the DOM keeps the
   * "\n" either way, so a test reading textContent would have passed before the
   * fix and proved nothing.
   */
  it("preserves line breaks the author typed into a description", () => {
    render(
      <ImageCarousel
        images={[
          {
            src: "https://example.com/1.jpg",
            alt: "Image 1",
            title: "First",
            description: "line one\nline two\nline three",
          },
        ]}
      />,
    );
    expect(screen.getByText(/line one/)).toHaveClass("whitespace-pre-line");
  });

  // The title is one line by design; the two are not the same kind of text.
  it("leaves the title collapsing", () => {
    render(<ImageCarousel images={images} />);
    expect(screen.getByText("First")).not.toHaveClass("whitespace-pre-line");
  });

  it("renders card buttons with aria-labels", () => {
    render(<ImageCarousel images={images} />);
    expect(screen.getByLabelText("View First")).toBeInTheDocument();
    expect(screen.getByLabelText("View Second")).toBeInTheDocument();
  });
});
