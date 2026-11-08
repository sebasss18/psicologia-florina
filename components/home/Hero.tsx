"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  useScroll,
  type MotionValue,
} from "framer-motion";
import { WHATSAPP_URL } from "@/lib/whatsapp";
const ease = [0.22, 1, 0.36, 1] as const;

const roles = [
  "Psicóloga clínica",
  "Enfoque integrativo",
  "Especialista en Psicotrauma",
  "Terapeuta EMDR",
];

function SplitLine({
  text,
  delay,
  className,
}: {
  text: string;
  delay: number;
  className: string;
}) {
  return (
    <span
      className={`block overflow-hidden pb-2 ${className}`}
      aria-hidden="true"
    >
      {text.split("").map((c, i) => (
        <span
          key={i}
          className="split-char inline-block"
          style={{ animationDelay: `${delay + i * 0.035}s` }}
        >
          {c === " " ? "\u00A0" : c}
        </span>
      ))}
    </span>
  );
}

function RoleCycler() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setI((n) => (n + 1) % roles.length), 2600);
    return () => clearInterval(t);
  }, [reduce]);

  return (
    <div className="mt-8 h-8 overflow-hidden text-center" aria-live="polite">
      <AnimatePresence mode="wait">
        <motion.p
          key={roles[i]}
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -24, opacity: 0 }}
          transition={{ duration: 0.6, ease }}
          className="text-lg tracking-wide text-muted"
        >
          {roles[i]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

function Blob({
  px,
  py,
  outer,
  inner,
  variant,
  paused,
}: {
  px: MotionValue<number>;
  py: MotionValue<number>;
  outer: string;
  inner: string;
  variant: "blob-a" | "blob-b" | "blob-c";
  paused: boolean;
}) {
  return (
    <motion.div style={{ x: px, y: py }} className={`absolute ${outer}`}>
      <div
        className={`will-change-transform ${variant} ${inner} ${
          paused ? "[animation-play-state:paused]" : ""
        }`}
      />
    </motion.div>
  );
}

function Leaf({ className, flip }: { className?: string; flip?: boolean }) {
  return (
    <motion.svg
      viewBox="0 0 200 320"
      fill="none"
      aria-hidden="true"
      className={className}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <motion.path
        d="M100 310 C100 220 100 140 100 20"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.2, ease, delay: 0.6 }}
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
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
          initial={{ pathLength: 0, fillOpacity: 0 }}
          animate={{ pathLength: 1, fillOpacity: 0.12 }}
          fill="currentColor"
          transition={{ duration: 1.6, ease, delay: 1 + i * 0.25 }}
        />
      ))}
    </motion.svg>
  );
}

function Rings({ paused }: { paused: boolean }) {
  const reduce = useReducedMotion();
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      {[0, 1, 2].map((n) => (
        <motion.div
          key={n}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, ease, delay: 0.3 + n * 0.2 }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <div
            className="rounded-full border border-accent/20"
            style={{
              width: `${22 + n * 12}rem`,
              height: `${22 + n * 12}rem`,
              animation:
                reduce || paused
                  ? undefined
                  : `spin ${60 + n * 30}s linear infinite ${
                      n % 2 ? "reverse" : ""
                    }`,
              borderStyle: n === 1 ? "dashed" : "solid",
            }}
          />
        </motion.div>
      ))}
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const hintOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const hintY = useTransform(scrollYProgress, [0, 0.12], [0, 48]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });

  const aX = useTransform(sx, (v) => v * 160);
  const aY = useTransform(sy, (v) => v * 160);
  const bX = useTransform(sx, (v) => v * -220);
  const bY = useTransform(sy, (v) => v * -220);
  const cX = useTransform(sx, (v) => v * 100);
  const cY = useTransform(sy, (v) => v * -120);

  return (
    <section
      id="inicio"
      ref={ref}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-gradient-to-b from-sand to-cream"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <Blob
          variant="blob-a"
          paused={!inView}
          px={aX}
          py={aY}
          outer="-left-24 top-24"
          inner="h-80 w-80 bg-[radial-gradient(closest-side,theme(colors.accent-soft),theme(colors.accent-soft/0))] opacity-90 sm:h-[28rem] sm:w-[28rem]"
        />
        <Blob
          variant="blob-b"
          paused={!inView}
          px={bX}
          py={bY}
          outer="-right-20 top-10"
          inner="h-96 w-96 bg-[radial-gradient(closest-side,theme(colors.sand-strong),theme(colors.sand-strong/0))] sm:h-[34rem] sm:w-[34rem]"
        />
        <Blob
          variant="blob-c"
          paused={!inView}
          px={cX}
          py={cY}
          outer="bottom-10 left-1/3"
          inner="h-72 w-72 bg-[radial-gradient(closest-side,theme(colors.accent-soft),theme(colors.accent-soft/0))] opacity-60 sm:h-96 sm:w-96"
        />
        <div
          className="absolute inset-0 opacity-[0.07] mix-blend-multiply"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          }}
        />
      </div>

      <Rings paused={!inView} />

      <Leaf className="pointer-events-none absolute -left-6 bottom-0 h-56 w-36 text-accent/50 sm:left-10 sm:h-96 sm:w-60" />
      <Leaf
        flip
        className="pointer-events-none absolute -right-6 top-16 hidden h-72 w-44 text-accent/40 sm:block sm:right-10 sm:h-96 sm:w-60"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-cream via-cream/70 to-transparent"
      />

      <div className="hero-content relative px-6 pb-24 pt-24 text-center">
        <h1 aria-label="Psic. Florina Sotelo Mendoza">
          <motion.span
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="mb-4 block text-sm uppercase tracking-[0.4em] text-brown/60"
          >
            Psic.
          </motion.span>
          <SplitLine
            text="Florina"
            delay={0.2}
            className="font-serif text-7xl leading-[1.05] text-brown sm:text-9xl"
          />
          <SplitLine
            text="Sotelo Mendoza"
            delay={0.55}
            className="font-serif text-4xl italic leading-[1.1] text-accent sm:text-6xl"
          />
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
        >
          <RoleCycler />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 1.7 }}
          className="mx-auto mt-6 max-w-xs text-base leading-relaxed text-brown/70 sm:max-w-xl sm:text-lg"
        >
          Un espacio tranquilo para escucharte y acompañarte en tu proceso.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease, delay: 1.9 }}
          className="mt-10 flex flex-col items-center gap-6 sm:hidden"
        >
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 border border-brown/20 bg-cream/90 px-8 py-3.5 text-xs uppercase tracking-[0.25em] text-brown transition duration-500 active:scale-[0.98] active:border-accent/60 active:bg-white/60"
          >
            Agendar cita
            <span aria-hidden="true" className="text-accent">
              →
            </span>
          </a>
          <a
            href="/acerca"
            className="font-serif text-base italic text-brown/60 underline decoration-brown/20 underline-offset-4 transition-colors duration-500 active:text-accent"
          >
            Acerca De Mi
          </a>
        </motion.div>
      </div>

      <motion.div
        style={{ opacity: hintOpacity, y: hintY }}
        className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-brown/50"
        >
          Desliza
          <span className="relative block h-10 w-px bg-brown/15">
            <span className="scroll-dot absolute left-1/2 top-0 h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
