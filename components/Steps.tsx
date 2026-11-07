"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

function Step({
  index,
  text,
  progress,
}: {
  index: number;
  text: string;
  progress: MotionValue<number>;
}) {
  const start = index * 0.32;
  const fill = useTransform(progress, [start, start + 0.14], [0, 1]);
  const textOpacity = useTransform(fill, [0, 1], [0.25, 1]);

  return (
    <li className="relative py-10 pl-14">
      <span className="absolute left-0 top-12 flex h-4 w-4 items-center justify-center rounded-full border border-accent bg-sand">
        <motion.span
          className="h-2 w-2 rounded-full bg-accent"
          style={{ scale: fill }}
        />
      </span>
      <motion.p
        style={{ opacity: textOpacity }}
        className="font-serif text-2xl leading-snug text-brown sm:text-4xl"
      >
        {text}
      </motion.p>
    </li>
  );
}

export default function Steps({ items }: { items: string[] }) {
  const ref = useRef<HTMLUListElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.65", "end 0.75"],
  });
  const line = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  return (
    <ul ref={ref} className="relative">
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-[7px] top-0 w-px bg-brown/10"
      />
      <motion.span
        aria-hidden="true"
        className="absolute bottom-0 left-[7px] top-0 w-px origin-top bg-accent"
        style={{ scaleY: line }}
      />
      {items.map((text, i) => (
        <Step key={text} index={i} text={text} progress={scrollYProgress} />
      ))}
    </ul>
  );
}
