"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const stem: Variants = {
  rest: { scaleY: 0, opacity: 0, transition: { duration: 0.45, ease } },
  hover: { scaleY: 1, opacity: 0.8, transition: { duration: 0.9, ease } },
};

const label: Variants = {
  rest: { x: 0, transition: { duration: 0.7, ease } },
  hover: { x: 12, transition: { duration: 0.8, delay: 0.08, ease } },
};

const still: Variants = {
  rest: { x: 0 },
  hover: { x: 0 },
};

export default function NavLinkStem({
  href,
  label: text,
  onClick,
}: {
  href: string;
  label: string;
  onClick?: () => void;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.span
      className="relative inline-flex"
      initial="rest"
      animate="rest"
      whileHover="hover"
      whileFocus="hover"
    >
      <Link
        href={href}
        onClick={onClick}
        className="relative inline-flex items-center py-1 text-sm tracking-wide text-muted transition-colors duration-700 hover:text-brown focus-visible:text-brown focus-visible:outline-none"
      >
        <motion.span
          aria-hidden
          variants={reduce ? undefined : stem}
          style={{ transformOrigin: "50% 50%" }}
          className="absolute -left-1 top-1/2 -mt-3 h-6 w-px bg-accent"
        />
        <motion.span variants={reduce ? still : label}>{text}</motion.span>
      </Link>
    </motion.span>
  );
}
