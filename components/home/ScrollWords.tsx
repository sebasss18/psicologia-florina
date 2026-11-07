"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

const WINDOW = 5;

function Word({
  children,
  range,
  progress,
}: {
  children: string;
  range: [number, number];
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);

  return (
    <motion.span
      style={{
        opacity,
        display: "inline-block",
        willChange: "opacity",
        transform: "translateZ(0)", // fuerza capa estable en iOS
        backfaceVisibility: "hidden",
        marginRight: "0.25em", // en lugar de {" "} fuera del span
      }}
    >
      {children}
    </motion.span>
  );
}

export default function ScrollWords({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);

  // Sin useSpring: el scroll táctil ya tiene su propia inercia
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.4"],
  });

  const words = text.split(" ");
  const total = words.length - 1 + WINDOW;

  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <Word
          key={i}
          range={[i / total, (i + WINDOW) / total]}
          progress={scrollYProgress}
        >
          {w}
        </Word>
      ))}
    </p>
  );
}
