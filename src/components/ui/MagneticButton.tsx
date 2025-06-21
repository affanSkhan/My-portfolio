"use client";
import { useRef, useState, forwardRef } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  className?: string;
}

const MagneticButton = forwardRef<HTMLButtonElement, MagneticButtonProps>(
  ({ children, className = "", ...props }, ref) => {
    const btnRef = useRef<HTMLButtonElement>(null);
    const [ripple, setRipple] = useState<{ x: number; y: number } | null>(null);

    // Magnetic effect
    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      const btn = btnRef.current;
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    };
    const handleMouseLeave = () => {
      if (btnRef.current) btnRef.current.style.transform = "";
    };

    // Ripple effect
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const btn = btnRef.current;
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setRipple({ x, y });
      setTimeout(() => setRipple(null), 500);
      if (props.onClick) props.onClick(e);
    };

    const motionProps = props as HTMLMotionProps<'button'>;

    return (
      <motion.button
        ref={(node) => {
          btnRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
        }}
        className={`relative overflow-hidden ${className}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        {...motionProps}
      >
        {children}
        {ripple && (
          <span
            className="absolute pointer-events-none rounded-full bg-white/40 animate-ripple"
            style={{
              left: ripple.x - 50,
              top: ripple.y - 50,
              width: 100,
              height: 100,
            }}
          />
        )}
        <style jsx>{`
          .animate-ripple {
            animation: ripple 0.5s linear;
          }
          @keyframes ripple {
            0% {
              opacity: 0.7;
              transform: scale(0.2);
            }
            100% {
              opacity: 0;
              transform: scale(2.5);
            }
          }
        `}</style>
      </motion.button>
    );
  }
);

MagneticButton.displayName = "MagneticButton";

export default MagneticButton; 