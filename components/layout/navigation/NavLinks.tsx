"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const drop: Variants = {
  rest: {
    opacity: 0,
    x: 16,
    scaleX: 0.6,
    scaleY: 0.6,
    transition: { duration: 0.2 },
  },
  hover: {
    opacity: [0, 1, 1, 1, 1],
    x: [16, 0, 0, 1, 0],
    scaleX: [0.6, 1, 0.65, 1.15, 1],
    scaleY: [0.6, 1, 1.4, 0.9, 1],
    transition: {
      duration: 0.9,
      times: [0, 0.5, 0.62, 0.78, 1],
      ease: "easeOut",
    },
  },
};

const ripple: Variants = {
  rest: { opacity: 0, scale: 0.6, transition: { duration: 0.2 } },
  hover: {
    opacity: [0, 0.5, 0],
    scale: [0.6, 0.6, 3.2],
    transition: { duration: 0.9, times: [0, 0.55, 1], ease: "easeOut" },
  },
};

const label: Variants = {
  rest: { x: 0, transition: { duration: 0.5, ease } },
  hover: { x: 6, transition: { duration: 0.5, ease } },
};

export default function NavLink({
  href,
  label: text,
  onClick,
}: {
  href: string;
  label: string;
  onClick?: () => void;
}) {
  return (
    <motion.span
      className="relative inline-flex"
      initial="rest"
      animate="rest"
      whileHover="hover"
    >
      <Link
        href={href}
        onClick={onClick}
        className="relative inline-flex items-center py-1 text-sm tracking-wide text-muted transition-colors duration-500 hover:text-brown"
      >
        <motion.span
          variants={drop}
          style={{ transformOrigin: "0% 50%" }}
          className="absolute -left-3 top-1/2 -mt-[3px] h-1.5 w-1.5 rounded-full bg-accent"
        />
        <motion.span
          variants={ripple}
          className="absolute -left-3 top-1/2 -mt-[3px] h-1.5 w-1.5 rounded-full border border-accent"
        />
        <motion.span variants={label}>{text}</motion.span>
      </Link>
    </motion.span>
  );
}
