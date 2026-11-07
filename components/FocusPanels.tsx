"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export default function FocusPanels({ items }: { items: string[] }) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const dur = (s: number) => (reduce ? 0 : s);

  return (
    <div className="flex flex-col gap-3 md:h-96 md:flex-row">
      {items.map((item, i) => {
        const on = active === i;
        return (
          <motion.button
            key={item}
            type="button"
            aria-pressed={on}
            onPointerEnter={(e) => {
              if (e.pointerType === "mouse") setActive(i);
            }}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            animate={{ flexGrow: on ? 2.4 : 1 }}
            transition={{
              flexGrow: { duration: dur(0.7), ease },
              opacity: { duration: 0.8, ease, delay: i * 0.1 },
              y: { duration: 0.8, ease, delay: i * 0.1 },
            }}
            className="relative flex min-h-40 flex-1 flex-col justify-between overflow-hidden border border-brown/10 bg-cream/60 p-8 text-left outline-none focus-visible:ring-1 focus-visible:ring-accent md:basis-0"
          >
            <motion.span
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-br from-accent-soft/60 to-sand-strong/40"
              animate={{ opacity: on ? 1 : 0, scale: on ? 1 : 1.08 }}
              transition={{ duration: dur(0.8), ease }}
            />

            <span className="relative flex items-start justify-between">
              <motion.span
                className="text-xs tracking-[0.2em] text-accent"
                animate={{ opacity: on ? 1 : 0.6 }}
                transition={{ duration: dur(0.5) }}
              >
                {String(i + 1).padStart(2, "0")}
              </motion.span>

              <motion.span
                aria-hidden="true"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-accent/40 text-sm text-accent"
                animate={{
                  opacity: on ? 1 : 0,
                  scale: on ? 1 : 0.6,
                  rotate: on ? 0 : -45,
                }}
                transition={{ duration: dur(0.6), ease }}
              >
                →
              </motion.span>
            </span>

            <motion.span
              className="relative block font-serif text-3xl text-brown"
              animate={{ x: on ? 8 : 0, opacity: on ? 1 : 0.55 }}
              transition={{ duration: dur(0.6), ease }}
            >
              {item}
            </motion.span>
          </motion.button>
        );
      })}
    </div>
  );
}
