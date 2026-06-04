"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { type RefObject, type ReactNode } from "react";

export default function HeroScrollLayer({
  sectionRef,
  background,
  children,
  footer,
}: {
  sectionRef: RefObject<HTMLElement | null>;
  background: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
}) {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 0.7], [1, 0.9]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.35]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="snap-section snap-section-hero relative flex items-center justify-center overflow-hidden px-4 pb-16 pt-24 sm:px-6 sm:pt-28"
    >
      <motion.div
        style={{ y: bgY, opacity: bgOpacity }}
        className="absolute inset-0 will-change-transform"
      >
        {background}
      </motion.div>

      <motion.div
        style={{ opacity: contentOpacity, scale: contentScale, y: contentY }}
        className="relative z-10 flex w-full max-w-4xl flex-col items-center justify-center gap-6 text-center will-change-transform sm:gap-8"
      >
        {children}
      </motion.div>

      {footer}
    </section>
  );
}
