"use client";

import type { CSSProperties, ReactNode } from "react";
import { useParallaxTransform, type ParallaxMode } from "@/hooks/useParallaxTransform";

interface Props {
  speed?: number;
  mode?: ParallaxMode;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  ariaHidden?: boolean;
}

export default function ParallaxLayer({
  speed = 0.12,
  mode = "float",
  className = "",
  style,
  children,
  ariaHidden = false,
}: Props) {
  const { ref, transform } = useParallaxTransform(speed, mode);

  return (
    <div
      ref={ref}
      className={`parallax-layer will-change-transform ${className}`}
      style={{ ...style, transform }}
      aria-hidden={ariaHidden || undefined}
    >
      {children}
    </div>
  );
}
