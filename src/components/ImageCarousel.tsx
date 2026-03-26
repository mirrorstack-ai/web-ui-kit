"use client";

import { useState, useEffect, useLayoutEffect, useCallback, useRef } from "react";

export interface CarouselImage {
  src: string;
  alt: string;
  title: string;
  description: string;
}

export interface ImageCarouselProps {
  images: CarouselImage[];
}

const positionsLarge = [
  { translateX: "35%", translateY: "-35%", rotate: "0deg", scale: 1 },
  { translateX: "20%", translateY: "-28%", rotate: "-3deg", scale: 0.97 },
  { translateX: "5%", translateY: "-21%", rotate: "-6deg", scale: 0.94 },
  { translateX: "-10%", translateY: "-14%", rotate: "-9deg", scale: 0.91 },
];

const positionsSmall = [
  { translateX: "35%", translateY: "-30%", rotate: "0deg", scale: 1 },
  { translateX: "20%", translateY: "-23%", rotate: "-3deg", scale: 0.97 },
  { translateX: "5%", translateY: "-16%", rotate: "-6deg", scale: 0.94 },
  { translateX: "-10%", translateY: "-9%", rotate: "-9deg", scale: 0.91 },
];

export function ImageCarousel({ images: rawImages }: ImageCarouselProps) {
  const images = rawImages.filter((img) => img.src);
  const [activeIndex, setActiveIndex] = useState(0);
  const [ready, setReady] = useState(false);
  const [animated, setAnimated] = useState(false);
  const windowWidthRef = useRef(0);
  const intervalRef = useRef<number | null>(null);
  const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isTransitioningRef = useRef(false);
  const activeIndexRef = useRef(activeIndex);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const cardColors = ["#9c27b0", "#f44336", "#2196f3", "#4caf50"];
  const positions = windowWidthRef.current > 1180 ? positionsLarge : positionsSmall;

  // Phase 1: measure width and show cards at correct position before paint
  useLayoutEffect(() => {
    windowWidthRef.current = window.innerWidth;
    setReady(true);
  }, []);

  // Phase 2: enable transitions after first correct paint
  useEffect(() => {
    if (!ready) return;
    requestAnimationFrame(() => setAnimated(true));
    const handleResize = () => {
      windowWidthRef.current = window.innerWidth;
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [ready]);

  const doTransition = useCallback((nextIndex: number) => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setActiveIndex(nextIndex);
    transitionTimerRef.current = setTimeout(() => {
      isTransitioningRef.current = false;
      transitionTimerRef.current = null;
    }, 1000);
  }, []);

  const startInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(() => {
      if (!isTransitioningRef.current) {
        doTransition((activeIndexRef.current + 1) % images.length);
      }
    }, 5000);
  }, [doTransition, images.length]);

  useEffect(() => {
    startInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
    };
  }, [startInterval]);

  const handleClick = (index: number) => {
    if (index === activeIndex || isTransitioningRef.current) return;
    doTransition(index);
    startInterval();
  };

  const getRelativePosition = useCallback(
    (index: number): number => {
      return (index - activeIndex + images.length) % images.length;
    },
    [activeIndex, images.length]
  );

  const getCardStyle = (index: number): React.CSSProperties => {
    const relativePosition = getRelativePosition(index);

    if (relativePosition >= 0 && relativePosition < positions.length) {
      const pos = positions[relativePosition];
      return {
        transform: `translateX(${pos.translateX}) translateY(${pos.translateY}) rotate(${pos.rotate}) scale(${pos.scale})`,
        opacity: 1,
        zIndex: positions.length - relativePosition,
      };
    }

    const backPos = positions[positions.length - 1];
    return {
      transform: `translateX(${backPos.translateX}) translateY(${backPos.translateY}) rotate(${backPos.rotate}) scale(${backPos.scale * 0.95})`,
      opacity: 0,
      zIndex: 0,
    };
  };

  return (
    <div className="relative h-full overflow-visible">
      <div className="relative w-full h-full flex">
        {images.map((image, index) => {
          const style = getCardStyle(index);
          return (
            <div
              key={image.src}
              role="button"
              tabIndex={index === activeIndex ? -1 : 0}
              aria-label={`View ${image.title}`}
              onClick={() => handleClick(index)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleClick(index);
                }
              }}
              className="absolute top-[30%] left-0 overflow-hidden rounded-[20px] border-4 border-[#1b2122] cursor-pointer"
              style={{
                ...style,
                visibility: ready ? "visible" : "hidden",
                backgroundColor: cardColors[index % cardColors.length],
                width: "75%",
                paddingTop: "calc(75% * 4 / 3)",
                willChange: "transform, opacity",
                transformOrigin: "center center",
                transition: animated
                  ? "transform 1s ease-in-out, opacity 1s ease-in-out"
                  : "none",
              }}
            >
              <img
                src={image.src}
                alt={image.alt}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "16px",
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white">
                <h3 className="text-lg font-bold mb-1">{image.title}</h3>
                <p className="text-sm">{image.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
