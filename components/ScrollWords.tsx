"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

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
    <span className="mr-[0.25em] inline-block">
      <motion.span className="inline-block" style={{ opacity }}>
        {children}
      </motion.span>
    </span>
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
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.45"],
  });
  const words = text.split(" ");

  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <Word
          key={i}
          range={[i / words.length, (i + 1) / words.length]}
          progress={scrollYProgress}
        >
          {w}
        </Word>
      ))}
    </p>
  );
}
