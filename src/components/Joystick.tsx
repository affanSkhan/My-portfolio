"use client";
import { useRef, useState } from "react";

interface JoystickProps {
  onMove: (x: number, y: number) => void;
  size?: number;
  baseColor?: string;
  stickColor?: string;
}

export default function Joystick({ onMove, size = 100, baseColor = "#222", stickColor = "#4f46e5" }: JoystickProps) {
  const baseRef = useRef<HTMLDivElement>(null);
  const [stick, setStick] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

  const handlePointerDown = (e: React.PointerEvent) => {
    setDragging(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging || !baseRef.current) return;
    const rect = baseRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const r = size / 2 - 20;
    const dist = Math.sqrt(dx * dx + dy * dy);
    let nx = dx, ny = dy;
    if (dist > r) {
      nx = (dx / dist) * r;
      ny = (dy / dist) * r;
    }
    setStick({ x: nx, y: ny });
    onMove(clamp(nx / r, -1, 1), clamp(ny / r, -1, 1));
  };

  const handlePointerUp = () => {
    setDragging(false);
    setStick({ x: 0, y: 0 });
    onMove(0, 0);
  };

  return (
    <div
      ref={baseRef}
      style={{
        position: "fixed",
        left: 32,
        bottom: 32,
        width: size,
        height: size,
        background: baseColor,
        borderRadius: "50%",
        opacity: 0.85,
        zIndex: 1000,
        touchAction: "none",
        boxShadow: "0 2px 16px #0006",
        userSelect: "none",
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <div
        style={{
          position: "absolute",
          left: `calc(50% + ${stick.x}px - 25px)`,
          top: `calc(50% + ${stick.y}px - 25px)`,
          width: 50,
          height: 50,
          background: stickColor,
          borderRadius: "50%",
          boxShadow: dragging ? "0 0 0 8px #6366f155" : "0 2px 8px #0007",
          transition: dragging ? "none" : "box-shadow 0.2s",
          pointerEvents: "none",
        }}
      />
    </div>
  );
} 