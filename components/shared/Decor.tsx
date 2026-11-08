"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const grainImage =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

export function Grain() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-multiply"
      style={{ backgroundImage: grainImage }}
    />
  );
}

export function Glow({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full blur-3xl ${className ?? ""}`}
    />
  );
}

export function Rings({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute h-0 w-0 ${className ?? ""}`}
    >
      {[0, 1, 2].map((n) => (
        <div
          key={n}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/15"
          style={{
            width: `${14 + n * 8}rem`,
            height: `${14 + n * 8}rem`,
            borderStyle: n === 1 ? "dashed" : "solid",
          }}
        />
      ))}
    </div>
  );
}

export function Leaf({
  className,
  flip,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <motion.svg
      viewBox="0 0 200 320"
      fill="none"
      aria-hidden="true"
      className={`pointer-events-none absolute ${className ?? ""}`}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <motion.path
        d="M100 310 C100 220 100 140 100 20"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 2, ease }}
      />
      {[
        "M100 260 C60 250 40 220 38 190 C70 196 94 222 100 260Z",
        "M100 220 C140 210 162 180 164 150 C130 156 106 182 100 220Z",
        "M100 175 C62 165 44 138 42 110 C72 116 94 140 100 175Z",
        "M100 135 C136 125 154 100 156 74 C128 80 106 102 100 135Z",
        "M100 95 C70 86 56 66 54 46 C76 50 94 68 100 95Z",
      ].map((d, i) => (
        <motion.path
          key={i}
          d={d}
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
          initial={{ pathLength: 0, fillOpacity: 0 }}
          whileInView={{ pathLength: 1, fillOpacity: 0.1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.4, ease, delay: 0.4 + i * 0.2 }}
        />
      ))}
    </motion.svg>
  );
}

const branchLeaves = [
  { x: 60, y: 126, r: -38 },
  { x: 60, y: 126, r: 42 },
  { x: 130, y: 114, r: -44 },
  { x: 130, y: 114, r: 36 },
  { x: 200, y: 98, r: -48 },
  { x: 200, y: 98, r: 30 },
  { x: 270, y: 80, r: -52 },
  { x: 270, y: 80, r: 24 },
  { x: 335, y: 58, r: -56 },
  { x: 335, y: 58, r: 18 },
];

export function Branch({
  className,
  flip,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <motion.svg
      viewBox="0 0 400 180"
      fill="none"
      aria-hidden="true"
      className={`pointer-events-none absolute ${className ?? ""}`}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <motion.path
        d="M0 136 C100 140 200 104 400 40"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 2.4, ease }}
      />
      {branchLeaves.map((l, i) => (
        <motion.path
          key={i}
          d="M0 0 C10 -14 32 -14 44 0 C32 14 10 14 0 0Z"
          transform={`translate(${l.x} ${l.y}) rotate(${l.r})`}
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinejoin="round"
          initial={{ pathLength: 0, fillOpacity: 0 }}
          whileInView={{ pathLength: 1, fillOpacity: 0.1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.2, ease, delay: 0.6 + i * 0.15 }}
        />
      ))}
    </motion.svg>
  );
}

export function Wave({ className }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 1200 120"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 hidden h-24 w-full text-accent/20 md:block ${className ?? ""}`}
    >
      <motion.path
        d="M0 60 C150 10 300 110 450 60 S750 10 900 60 S1100 100 1200 60"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 3, ease }}
      />
    </motion.svg>
  );
}

export function SoftArch({ className }: { className?: string }) {
  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1.6, ease }}
      className={`pointer-events-none absolute hidden lg:block ${className ?? ""}`}
    >
      <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-t-full bg-sand-strong/50" />
      <div className="absolute inset-0 rounded-t-full bg-accent-soft/25" />
    </motion.div>
  );
}

export function Dots({ className }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 140 140"
      aria-hidden="true"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.6, ease }}
      className={`pointer-events-none absolute hidden text-accent/40 md:block ${className ?? ""}`}
    >
      <circle cx="14" cy="22" r="2.5" fill="currentColor" />
      <circle cx="52" cy="10" r="1.5" fill="currentColor" />
      <circle cx="96" cy="30" r="3" fill="currentColor" />
      <circle cx="126" cy="70" r="1.8" fill="currentColor" />
      <circle cx="70" cy="62" r="2" fill="currentColor" />
      <circle cx="30" cy="84" r="1.6" fill="currentColor" />
      <circle cx="104" cy="112" r="2.6" fill="currentColor" />
      <circle cx="58" cy="124" r="1.4" fill="currentColor" />
    </motion.svg>
  );
}
