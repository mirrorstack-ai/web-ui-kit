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

  it("renders card buttons with aria-labels", () => {
    render(<ImageCarousel images={images} />);
    expect(screen.getByLabelText("View First")).toBeInTheDocument();
    expect(screen.getByLabelText("View Second")).toBeInTheDocument();
  });
});
