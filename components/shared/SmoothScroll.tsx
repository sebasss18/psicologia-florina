"use client";

import { useEffect } from "react";

type SmoothScrollProps = {
  /** 0.01–1. Menor = más suave/flotado, mayor = más directo. */
  ease?: number;
  /** Multiplicador de la distancia por cada tick de la rueda. */
  speed?: number;
};

/**
 * Scroll suave con inercia (lerp) para rueda/trackpad.
 * Montar una sola vez, por ejemplo en app/page.tsx o en el layout.
 *
 * - Respeta prefers-reduced-motion.
 * - No toca zoom (Ctrl + rueda), touch, teclado ni barra de scroll.
 * - Si el cursor está sobre un contenedor con scroll propio, ese scrollea normal.
 */
export default function SmoothScroll({
  ease = 0.1,
  speed = 1,
}: SmoothScrollProps) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = (document.scrollingElement ||
      document.documentElement) as HTMLElement;

    const maxScroll = () => root.scrollHeight - window.innerHeight;
    const clamp = (v: number) => Math.max(0, Math.min(v, maxScroll()));
    const setScroll = (v: number) =>
      // "instant" evita que un `scroll-behavior: smooth` en CSS pelee con el lerp
      root.scrollTo({ top: v, behavior: "instant" as ScrollBehavior });

    let target = root.scrollTop;
    let current = root.scrollTop;
    let rafId: number | null = null;
    let animating = false;

    const stop = () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = null;
      animating = false;
    };

    const hasScrollableAncestor = (start: EventTarget | null, deltaY: number) => {
      let el = start instanceof HTMLElement ? start : null;
      while (el && el !== document.body && el !== document.documentElement) {
        const { overflowY } = getComputedStyle(el);
        if (/(auto|scroll)/.test(overflowY) && el.scrollHeight > el.clientHeight) {
          const atTop = el.scrollTop <= 0;
          const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
          if ((deltaY < 0 && !atTop) || (deltaY > 0 && !atBottom)) return true;
        }
        el = el.parentElement;
      }
      return false;
    };

    const tick = () => {
      const diff = target - current;
      if (Math.abs(diff) < 0.1) {
        current = target;
        setScroll(current);
        stop();
        return;
      }
      current += diff * ease;
      setScroll(current);
      rafId = requestAnimationFrame(tick);
    };

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.defaultPrevented) return;
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      if (hasScrollableAncestor(e.target, e.deltaY)) return;

      e.preventDefault();

      let delta = e.deltaY;
      if (e.deltaMode === 1) delta *= 16;
      else if (e.deltaMode === 2) delta *= window.innerHeight;

      if (!animating) {
        current = root.scrollTop;
        target = current;
      }
      target = clamp(target + delta * speed);

      if (!animating) {
        animating = true;
        rafId = requestAnimationFrame(tick);
      }
    };

    // Cambios externos (teclado, barra de scroll, anclas #acerca, etc.)
    const onScroll = () => {
      if (!animating) {
        current = root.scrollTop;
        target = current;
      } else if (Math.abs(root.scrollTop - current) > 2) {
        // Algo más movió el scroll mientras animábamos: cedemos el control
        stop();
        current = root.scrollTop;
        target = current;
      }
    };

    const onResize = () => {
      target = clamp(target);
      current = clamp(current);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      stop();
    };
  }, [ease, speed]);

  return null;
}
