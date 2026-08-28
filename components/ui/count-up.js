"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useMotionValue, useTransform, motion } from "framer-motion";

export function CountUp({ to, duration = 1.6, decimals = 0, suffix = "", prefix = "", className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);
  const motValue = useMotionValue(0);
  const rounded = useTransform(motValue, (v) => v.toFixed(decimals));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(motValue, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return controls.stop;
  }, [inView, to, duration, motValue]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {decimals > 0 ? display.toFixed(decimals) : Math.round(display)}
      {suffix}
    </span>
  );
}
