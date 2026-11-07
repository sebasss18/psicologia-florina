"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

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
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.9, ease, delay: delay + i * 0.035 }}
        >
          {c === " " ? "\u00A0" : c}
        </motion.span>
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
          initial={{ y: 24, opacity: 0, filter: "blur(4px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -24, opacity: 0, filter: "blur(4px)" }}
          transition={{ duration: 0.6, ease }}
          className="text-lg tracking-wide text-muted"
        >
          {roles[i]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

type Drift = {
  x: number[];
  y: number[];
  scale: number[];
  duration: number;
};

function Blob({
  px,
  py,
  outer,
  inner,
  drift,
}: {
  px: MotionValue<number>;
  py: MotionValue<number>;
  outer: string;
  inner: string;
  drift: Drift;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      style={reduce ? undefined : { x: px, y: py }}
      className={`absolute ${outer}`}
    >
      <motion.div
        className={`rounded-full blur-3xl ${inner}`}
        animate={
          reduce ? undefined : { x: drift.x, y: drift.y, scale: drift.scale }
        }
        transition={{
          duration: drift.duration,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />
    </motion.div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

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

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="inicio"
      ref={ref}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-sand to-cream"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]"
      >
        <Blob
          px={aX}
          py={aY}
          outer="-left-24 top-24"
          inner="h-96 w-96 bg-accent-soft/60"
          drift={{
            x: [0, 180, -120, 80, -180, 0],
            y: [0, -140, 120, 200, -80, 0],
            scale: [1, 1.3, 0.8, 1.2, 0.9, 1],
            duration: 18,
          }}
        />
        <Blob
          px={bX}
          py={bY}
          outer="-right-20 top-10"
          inner="h-[30rem] w-[30rem] bg-sand-strong/90"
          drift={{
            x: [0, -160, 100, -60, 140, 0],
            y: [0, 160, -100, -180, 80, 0],
            scale: [1, 0.85, 1.25, 1, 1.15, 1],
            duration: 24,
          }}
        />
        <Blob
          px={cX}
          py={cY}
          outer="bottom-10 left-1/3"
          inner="h-80 w-80 bg-accent-soft/40"
          drift={{
            x: [0, 120, -200, 60, -80, 0],
            y: [0, -120, -40, 100, -160, 0],
            scale: [1, 1.2, 0.85, 1.3, 0.8, 1],
            duration: 30,
          }}
        />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-cream via-cream/70 to-transparent"
      />

      <motion.div
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative px-6 pb-24 pt-24 text-center"
      >
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
            href="/agendar"
            className="flex items-center gap-3 border border-brown/20 bg-cream/70 px-8 py-3.5 text-xs uppercase tracking-[0.25em] text-brown backdrop-blur transition duration-500 active:scale-[0.98] active:border-accent/60 active:bg-white/60"
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
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-brown/50"
      >
        Desliza
        <span className="relative block h-10 w-px bg-brown/15">
          <motion.span
            className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-accent"
            animate={{ y: [0, 34, 0] }}
            transition={{ duration: 2.4, ease: "easeInOut", repeat: Infinity }}
          />
        </span>
      </motion.div>
    </section>
  );
}
