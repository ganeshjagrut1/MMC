"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "motion/react";

/**
 * Counts up to a numeric value when it scrolls into view.
 * Preserves any non-numeric suffix/prefix (e.g. "100+", "24x7", "100%").
 */
export function Counter({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const match = String(value).match(/^(\D*)(\d+)(.*)$/);
  const prefix = match ? match[1] : "";
  const target = match ? parseInt(match[2], 10) : null;
  const suffix = match ? match[3] : "";

  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView || target === null) return;
    const controls = animate(0, target, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, target]);

  if (target === null) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    );
  }

  return (
    <span ref={ref} className={className}>
      {prefix}
      {n}
      {suffix}
    </span>
  );
}
