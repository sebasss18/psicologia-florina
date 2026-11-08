"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export default function FocusList({ items }: { items: string[] }) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <ul
      className="grid border-b border-brown/10 md:grid-cols-2 md:gap-x-20"
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") setActive(null);
      }}
    >
      {items.map((item, i) => {
        const dim = active !== null && active !== i;
        return (
          <motion.li
            key={item}
            tabIndex={0}
            onPointerEnter={(e) => {
              if (e.pointerType === "mouse") setActive(i);
            }}
            onFocus={(e) => {
              if (e.currentTarget.matches(":focus-visible")) setActive(i);
            }}
            onBlur={() => setActive(null)}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, ease, delay: (i % 2) * 0.1 }}
            className="relative border-t border-brown/10 outline-none"
          >
            <motion.div
              className="flex items-baseline gap-5 py-7"
              animate={{ opacity: dim ? 0.28 : 1, x: active === i ? 12 : 0 }}
              transition={{ duration: 0.5, ease }}
            >
              <span className="text-xs tracking-[0.2em] text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-serif text-2xl text-brown sm:text-3xl">
                {item}
              </span>
            </motion.div>
          </motion.li>
        );
      })}
    </ul>
  );
}
