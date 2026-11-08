"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

type Item = {
  title: string;
  description: string;
};

export default function FocusPanels({ items }: { items: Item[] }) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const dur = (s: number) => (reduce ? 0 : s);

  return (
    <div className="flex flex-col gap-3 md:h-96 md:flex-row">
      {items.map((item, i) => {
        const on = active === i;
        return (
          <motion.button
            key={item.title}
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

            <span className="relative flex items-start">
              <motion.span
                className="font-serif text-2xl italic text-accent"
                animate={{ opacity: on ? 1 : 0.6 }}
                transition={{ duration: dur(0.5) }}
              >
                {String(i + 1).padStart(2, "0")}
              </motion.span>
            </span>

            <span className="relative block md:w-72 md:shrink-0">
              <motion.span
                className="block font-serif text-3xl text-brown"
                animate={{ x: on ? 8 : 0, opacity: on ? 1 : 0.55 }}
                transition={{ duration: dur(0.6), ease }}
              >
                {item.title}
              </motion.span>

              <motion.span
                className="block overflow-hidden"
                initial={false}
                animate={{
                  height: on ? "auto" : 0,
                  opacity: on ? 1 : 0,
                }}
                transition={{
                  height: { duration: dur(0.6), ease },
                  opacity: {
                    duration: dur(0.5),
                    ease,
                    delay: on ? dur(0.15) : 0,
                  },
                }}
              >
                <motion.span
                  className="mt-3 block text-sm leading-relaxed text-brown/70"
                  animate={{ y: on ? 0 : 12 }}
                  transition={{ duration: dur(0.6), ease }}
                >
                  {item.description}
                </motion.span>
              </motion.span>
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
