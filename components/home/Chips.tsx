"use client";

import { motion, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Chips({ items }: { items: string[] }) {
  const reduce = useReducedMotion();

  return (
    <ul className="flex flex-wrap gap-3">
      {items.map((item, i) => (
        <motion.li
          key={item}
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease, delay: i * 0.08 }}
        >
          <motion.span
            whileHover={reduce ? undefined : { scale: 1.04 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="block cursor-default border border-brown/15 bg-cream/70 px-4 py-2 text-sm text-brown transition-colors duration-500 hover:border-accent/60 hover:bg-white/60"
          >
            {item}
          </motion.span>
        </motion.li>
      ))}
    </ul>
  );
}
