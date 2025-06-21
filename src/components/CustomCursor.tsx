"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const INTERACTIVE_SELECTORS = "button, a, input, textarea, [role='button'], [tabindex]:not([tabindex='-1'])";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };
    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as Element)?.closest(INTERACTIVE_SELECTORS)) {
        setActive(true);
      }
    };
    const handleMouseOut = (e: MouseEvent) => {
      if ((e.target as Element)?.closest(INTERACTIVE_SELECTORS)) {
        setActive(false);
      }
    };
    document.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    return () => {
      document.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  if (typeof window === "undefined") return null;

  return createPortal(
    <div
      ref={cursorRef}
      className={`custom-cursor${active ? " custom-cursor--active" : ""}`}
    />,
    document.body
  );
} 