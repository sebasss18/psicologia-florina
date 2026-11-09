"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;
const interactive =
  "a, button, [role='button'], input, textarea, select, label, [data-cursor]";

export default function CustomCursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 260, damping: 26, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 260, damping: 26, mass: 0.5 });

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setEnabled(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const target = e.target as Element | null;
      setHovering(!!target?.closest(interactive));
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);
    const leave = () => setVisible(false);
    const enter = () => setVisible(true);

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    document.documentElement.addEventListener("mouseleave", leave);
    document.documentElement.addEventListener("mouseenter", enter);

    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      document.documentElement.removeEventListener("mouseleave", leave);
      document.documentElement.removeEventListener("mouseenter", enter);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      <style>{`html, html * { cursor: none !important; }`}</style>

      <motion.div
        aria-hidden
        style={{ x: reduce ? x : sx, y: reduce ? y : sy }}
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
      >
        <motion.div
          animate={{
            opacity: visible ? 1 : 0,
            scale: pressed ? 0.8 : hovering ? 0.6 : 1,
          }}
          transition={{ duration: 0.45, ease }}
          className="-ml-4 -mt-4 h-8 w-8 rounded-full border border-accent/60"
        />
      </motion.div>

      <motion.div
        aria-hidden
        style={{ x, y }}
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
      >
        <motion.div
          animate={{
            opacity: visible ? 1 : 0,
            scale: hovering ? 0 : pressed ? 0.6 : 1,
          }}
          transition={{ duration: 0.3, ease }}
          className="-ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-accent"
        />
      </motion.div>
    </>
  );
}
