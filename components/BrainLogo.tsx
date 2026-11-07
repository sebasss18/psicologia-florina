"use client";

import { useId } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const box = { transformBox: "fill-box", transformOrigin: "center" } as const;

const leftHemisphere: Variants = {
  hidden: { opacity: 0, x: 4, scale: 0.94 },
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 1, ease },
  },
  hover: { x: -1.5, transition: { duration: 0.6, ease } },
};

const rightHemisphere: Variants = {
  hidden: { opacity: 0, x: -4, scale: 0.94 },
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 1, ease, delay: 0.2 },
  },
  hover: { x: 1.5, transition: { duration: 0.6, ease } },
};

const fold: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: (i: number) => ({
    pathLength: 1,
    opacity: 0.65,
    transition: { duration: 1.1, delay: 0.7 + i * 0.18, ease: "easeInOut" },
  }),
  hover: { pathLength: 1, opacity: 1, transition: { duration: 0.5 } },
};

const leftFolds = [
  "M12 26C17 24 20 28 25 26",
  "M11 39C16 37 20 41 26 38",
  "M20 14C21 18 24 19 27 17",
];

const rightFolds = [
  "M52 26C47 24 44 28 39 26",
  "M53 39C48 37 44 41 38 38",
  "M44 14C43 18 40 19 37 17",
];

export default function BrainLogo({
  className = "h-11 w-11",
}: {
  className?: string;
}) {
  const reduce = useReducedMotion();
  const gradId = `brain-${useId().replace(/:/g, "")}`;

  return (
    <motion.svg
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
      initial={reduce ? false : "hidden"}
      animate="show"
      whileHover={reduce ? undefined : "hover"}
      style={box}
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" style={{ stopColor: "var(--color-accent-soft)" }} />
          <stop offset="100%" style={{ stopColor: "var(--color-accent)" }} />
        </linearGradient>
      </defs>

      <motion.g variants={leftHemisphere} style={box}>
        <path
          d="M30 11C22 7 13 10 11 18C5 20 3 29 8 34C5 41 10 49 17 48C20 54 28 54 30 49Z"
          fill={`url(#${gradId})`}
          fillOpacity="0.9"
        />
        <g
          fill="none"
          strokeLinecap="round"
          strokeWidth="1.6"
          className="stroke-cream"
        >
          {leftFolds.map((d, i) => (
            <motion.path key={d} d={d} custom={i} variants={fold} />
          ))}
        </g>
      </motion.g>

      <motion.g variants={rightHemisphere} style={box}>
        <path
          d="M34 11C42 7 51 10 53 18C59 20 61 29 56 34C59 41 54 49 47 48C44 54 36 54 34 49Z"
          fill={`url(#${gradId})`}
          fillOpacity="0.75"
        />
        <g
          fill="none"
          strokeLinecap="round"
          strokeWidth="1.6"
          className="stroke-cream"
        >
          {rightFolds.map((d, i) => (
            <motion.path key={d} d={d} custom={i} variants={fold} />
          ))}
        </g>
      </motion.g>
    </motion.svg>
  );
}
