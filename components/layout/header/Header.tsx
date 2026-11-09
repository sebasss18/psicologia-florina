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
import NavLink from "../navigation/NavLinks";
import { WHATSAPP_URL } from "@/lib/whatsapp";

const links = [
  { href: "/acerca", label: "Acerca de mí" },
  { href: "/servicios", label: "Servicios" },
  { href: "/emdr", label: "EMDR" },
];

const subServices = [
  {
    label: "Terapia individual",
    description: "Acompañamiento personal para adultos",
    hash: "",
  },
  {
    label: "Ansiedad y estrés",
    description: "Herramientas para recuperar la calma",
    hash: "",
  },
  {
    label: "Trauma y duelo",
    description: "Procesar y sanar experiencias difíciles",
    hash: "",
  },
];

const serviceHref = (hash: string) => `/servicios${hash}`;

const ease = "ease-[cubic-bezier(0.22,1,0.36,1)]";
const easeArr = [0.22, 1, 0.36, 1] as const;

const panelVariants = {
  hidden: { opacity: 0, scale: 0.8, y: -8 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 380,
      damping: 22,
      staggerChildren: 0.05,
      delayChildren: 0.06,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: -6,
    transition: { duration: 0.18, ease: easeArr },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.28, ease: easeArr } },
};

const mobileListVariants = {
  hidden: { height: 0, opacity: 0 },
  show: {
    height: "auto",
    opacity: 1,
    transition: { duration: 0.3, ease: easeArr, staggerChildren: 0.04 },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.2, ease: easeArr },
  },
};

function CtaButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
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
    </a>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      aria-hidden="true"
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: 0.45, ease: easeArr }}
    >
      <path
        d="M8.5 10.5L12 14l3.5-3.5"
        className="stroke-accent"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
}

function ServicesDropdown() {
  const [show, setShow] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onFocus={() => setShow(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setShow(false);
      }}
    >
      <NavLink href="/servicios" label="Servicios" />
      <AnimatePresence>
        {show && (
          <div className="absolute left-1/2 top-full z-50 w-80 -translate-x-1/2 pt-6">
            <motion.div
              variants={panelVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              style={{ transformOrigin: "top center" }}
              className="relative rounded-3xl border border-brown/10 bg-cream/90 px-3 py-2 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.18)] backdrop-blur-md"
            >
              <span
                aria-hidden="true"
                className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-l border-t border-brown/10 bg-cream"
              />
              {subServices.map((service, i) => (
                <motion.div key={service.label} variants={itemVariants}>
                  <Link
                    href={serviceHref(service.hash)}
                    onClick={() => setShow(false)}
                    className="group relative flex items-start gap-4 px-3 py-4"
                  >
                    <span
                      className={`absolute inset-0 rounded-2xl bg-brown/[0.04] opacity-0 transition-opacity duration-500 ${ease} group-hover:opacity-100`}
                    />
                    <span className="relative flex-1">
                      <span
                        className={`block font-serif text-lg text-brown transition-all duration-500 ${ease} group-hover:translate-x-1 group-hover:text-accent`}
                      >
                        {service.label}
                      </span>
                      <span
                        className={`mt-1 block text-xs tracking-wide text-brown/60 transition-transform duration-500 ${ease} group-hover:translate-x-1`}
                      >
                        {service.description}
                      </span>
                    </span>
                    <svg
                      viewBox="0 0 16 16"
                      className={`relative mt-1.5 h-4 w-4 shrink-0 -translate-x-2 text-accent opacity-0 transition-all duration-500 ${ease} group-hover:translate-x-0 group-hover:opacity-100`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      aria-hidden="true"
                    >
                      <path d="M3 8h10M9 4l4 4-4 4" />
                    </svg>
                    {i < subServices.length - 1 && (
                      <span className="absolute inset-x-3 bottom-0 h-px bg-brown/10" />
                    )}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 16);
  });

  const solid = scrolled || open;

  const closeMenu = () => {
    setOpen(false);
    setServicesOpen(false);
  };

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
          {links.map((link) =>
            link.href === "/servicios" ? (
              <ServicesDropdown key={link.href} />
            ) : (
              <NavLink key={link.href} href={link.href} label={link.label} />
            ),
          )}
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
          onClick={() => {
            setOpen((o) => !o);
            setServicesOpen(false);
          }}
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
            transition={{ duration: 0.3, ease: easeArr }}
            className="overflow-hidden md:hidden"
          >
            <div className="mx-auto flex max-w-6xl flex-col px-6 pb-4">
              {links.map((link) =>
                link.href === "/servicios" ? (
                  <div key={link.href} className="border-t border-brown/10">
                    <div className="flex items-center justify-between">
                      <Link
                        href={link.href}
                        onClick={closeMenu}
                        className="flex-1 py-3 text-brown"
                      >
                        {link.label}
                      </Link>
                      <button
                        type="button"
                        aria-label="Ver servicios"
                        aria-expanded={servicesOpen}
                        onClick={() => setServicesOpen((s) => !s)}
                        className="flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-300 active:bg-brown/5"
                      >
                        <ChevronIcon open={servicesOpen} />
                      </button>
                    </div>
                    <AnimatePresence initial={false}>
                      {servicesOpen && (
                        <motion.div
                          variants={mobileListVariants}
                          initial="hidden"
                          animate="show"
                          exit="exit"
                          className="overflow-hidden"
                        >
                          <div className="mb-3 ml-1 border-l border-brown/15 pl-4">
                            {subServices.map((service) => (
                              <motion.div
                                key={service.label}
                                variants={itemVariants}
                              >
                                <Link
                                  href={serviceHref(service.hash)}
                                  onClick={closeMenu}
                                  className="flex items-center justify-between rounded-md py-3 pr-2 transition-colors duration-300 active:bg-brown/[0.04]"
                                >
                                  <span>
                                    <span className="block font-serif text-base text-brown">
                                      {service.label}
                                    </span>
                                    <span className="mt-0.5 block text-xs tracking-wide text-brown/60">
                                      {service.description}
                                    </span>
                                  </span>
                                </Link>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className="border-t border-brown/10 py-3 text-brown"
                  >
                    {link.label}
                  </Link>
                ),
              )}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
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
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
