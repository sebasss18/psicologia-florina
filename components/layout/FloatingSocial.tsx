"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const WHATSAPP_URL = "https://wa.me/message/MNYVZ4KAUAZ5A1";
const INSTAGRAM_URL =
  "https://www.instagram.com/psicologaflorinasotelo?mdxt=NzNjcDI2cjNvam83";
const TIKTOK_URL =
  "https://www.tiktok.com/@psicologaflorinasotelo?_r=1&_t=ZS-9BDabWplDWe";

const ease = [0.22, 1, 0.36, 1] as const;

const bubble =
  "flex h-12 w-12 items-center justify-center rounded-full border border-brown/10 bg-cream/70 text-brown shadow-[0_8px_24px_-10px_rgba(74,55,40,0.35)] backdrop-blur-md transition-colors duration-300 hover:bg-cream hover:text-accent";

const iconProps = {
  viewBox: "0 0 24 24",
  className: "h-5 w-5",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

function WhatsAppIcon() {
  return (
    <svg {...iconProps}>
      <path d="M3.5 20.5l1.2-4.3A8.5 8.5 0 1 1 8 19.4L3.5 20.5Z" />
      <path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.5-2-1-1 .8c-1-.4-2-1.4-2.4-2.4l.8-1-1-2L9 8.5Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg {...iconProps}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg {...iconProps}>
      <path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5" />
      <path d="M14 3c.3 2.5 1.8 4 4.5 4.2" />
    </svg>
  );
}

const socials = [
  { label: "Instagram", href: INSTAGRAM_URL, Icon: InstagramIcon },
  { label: "TikTok", href: TIKTOK_URL, Icon: TikTokIcon },
];

export default function FloatingSocial() {
  const [hidden, setHidden] = useState(false);
  const [hover, setHover] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let lastT = performance.now();
    let burst = 0;
    let timer: ReturnType<typeof setTimeout>;

    const onScroll = () => {
      const y = window.scrollY;
      const t = performance.now();
      const dy = Math.abs(y - lastY);
      const dt = Math.max(t - lastT, 1);
      lastY = y;
      lastT = t;
      burst += dy;

      if (dy / dt > 1.2 || burst > 600) setHidden(true);

      clearTimeout(timer);
      timer = setTimeout(() => {
        burst = 0;
        setHidden(false);
      }, 120);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const show = !hidden || hover || open;

  return (
    <motion.div
      className={`fixed bottom-6 right-4 z-40 flex flex-col items-end gap-3 ${
        show ? "" : "pointer-events-none"
      }`}
      initial={false}
      animate={{ x: show ? 0 : 88, opacity: show ? 1 : 0 }}
      transition={{ duration: 0.7, ease }}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <motion.a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className={bubble}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
      >
        <WhatsAppIcon />
      </motion.a>

      <div className="flex items-center gap-3">
        <AnimatePresence>
          {open &&
            socials.map(({ label, href, Icon }, i) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={bubble}
                initial={{ opacity: 0, x: 28, scale: 0.4 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 320,
                    damping: 22,
                    delay: (socials.length - 1 - i) * 0.06,
                  },
                }}
                exit={{
                  opacity: 0,
                  x: 28,
                  scale: 0.4,
                  transition: { duration: 0.2, ease },
                }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
              >
                <Icon />
              </motion.a>
            ))}
        </AnimatePresence>

        <motion.button
          type="button"
          aria-label="Redes sociales"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className={bubble}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
        >
          <motion.svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            aria-hidden="true"
            animate={{ rotate: open ? 90 : 0 }}
            transition={{ duration: 0.4, ease }}
          >
            <circle cx="5.5" cy="12" r="1.6" fill="currentColor" />
            <circle cx="12" cy="12" r="1.6" fill="currentColor" />
            <circle cx="18.5" cy="12" r="1.6" fill="currentColor" />
          </motion.svg>
        </motion.button>
      </div>
    </motion.div>
  );
}
