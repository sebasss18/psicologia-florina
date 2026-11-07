"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import BrainLogo from "./BrainLogo";
import NavLink from "./NavLinks";

const links = [
  { href: "/acerca", label: "Acerca de mí" },
  { href: "/servicios", label: "Servicios" },
  { href: "/emdr", label: "EMDR" },
];

const desktopLinks = links.slice(0, 3);

const ease = "ease-[cubic-bezier(0.22,1,0.36,1)]";

function CtaButton() {
  return (
    <Link
      href="/agendar"
      className="group relative inline-flex items-center overflow-hidden border border-brown/70 px-6 py-2.5 text-sm tracking-wide text-brown transition-colors duration-500 hover:text-cream"
    >
      <span
        className={`absolute inset-0 origin-bottom scale-y-0 bg-brown transition-transform duration-500 ${ease} group-hover:scale-y-100`}
      />
      <span className="relative">Agendar cita</span>
      <span
        className={`relative ml-0 max-w-0 overflow-hidden opacity-0 transition-all duration-500 ${ease} group-hover:ml-2 group-hover:max-w-4 group-hover:opacity-100`}
      >
        <svg
          viewBox="0 0 16 16"
          className="h-4 w-4 shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          aria-hidden="true"
        >
          <path d="M3 8h10M9 4l4 4-4 4" />
        </svg>
      </span>
    </Link>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 16);
  });

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${
        solid
          ? "border-brown/10 bg-cream/70 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between px-6 transition-all duration-500 md:grid md:grid-cols-[1fr_auto_1fr] ${
          scrolled ? "py-2" : "py-4"
        }`}
      >
        <nav className="hidden items-center gap-10 justify-self-start pl-3 md:flex">
          {desktopLinks.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} />
          ))}
        </nav>

        <Link
          href="/"
          className="flex items-center gap-3 md:justify-self-center"
        >
          <BrainLogo />
          <span className="font-serif text-xl text-brown">
            Psicóloga Florina
          </span>
        </Link>

        <div className="hidden justify-self-end md:block">
          <CtaButton />
        </div>

        <button
          type="button"
          aria-label="Menú"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="relative h-10 w-10 md:hidden"
        >
          <motion.span
            className="absolute left-2.5 top-[15px] h-px w-5 bg-brown"
            animate={{ y: open ? 4 : 0, rotate: open ? 45 : 0 }}
          />
          <motion.span
            className="absolute left-2.5 top-[23px] h-px w-5 bg-brown"
            animate={{ y: open ? -4 : 0, rotate: open ? -45 : 0 }}
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden md:hidden"
          >
            <div className="mx-auto flex max-w-6xl flex-col px-6 pb-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="border-t border-brown/10 py-3 text-brown"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/agendar"
                onClick={() => setOpen(false)}
                className="flex items-center justify-between border-t border-brown/10 py-3 text-accent"
              >
                Agendar cita
                <svg
                  viewBox="0 0 16 16"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  aria-hidden="true"
                >
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
