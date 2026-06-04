"use client";

import { motion, useTransform } from "framer-motion";
import { useHeroInView } from "@/components/HeroInView";

const INDICATOR_REVEAL = { start: 0.34, end: 0.18 };

const linkClassName =
  "absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 pb-[env(safe-area-inset-bottom)] text-white/30 transition-colors hover:text-white/60 sm:bottom-10";

function ScrollIndicatorEntrance() {
  return (
    <motion.a
      href="#about"
      className={linkClassName}
      aria-label="Scroll to learn more"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="type-label">Scroll</span>
      <motion.span
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        className="block h-8 w-px bg-gradient-to-b from-white/40 to-transparent"
      />
    </motion.a>
  );
}

function ScrollIndicatorScroll() {
  const { atHeroTop, scrollYProgress } = useHeroInView();

  const opacity = useTransform(
    scrollYProgress,
    [INDICATOR_REVEAL.end, INDICATOR_REVEAL.start],
    [1, 0],
  );

  return (
    <motion.a
      href="#about"
      className={linkClassName}
      aria-label="Scroll to learn more"
      style={{ opacity }}
    >
      <span className="type-label">Scroll</span>
      <motion.span
        animate={atHeroTop ? { y: [0, 6, 0] } : { y: 0 }}
        transition={{
          duration: 1.6,
          repeat: atHeroTop ? Infinity : 0,
          ease: "easeInOut",
        }}
        className="block h-8 w-px bg-gradient-to-b from-white/40 to-transparent"
      />
    </motion.a>
  );
}

export default function ScrollIndicator() {
  const { scrollLinked, reduceMotion } = useHeroInView();

  if (reduceMotion) {
    return (
      <a href="#about" className={linkClassName} aria-label="Scroll to learn more">
        <span className="type-label">Scroll</span>
        <span className="block h-8 w-px bg-gradient-to-b from-white/40 to-transparent" />
      </a>
    );
  }

  if (!scrollLinked) {
    return <ScrollIndicatorEntrance />;
  }

  return <ScrollIndicatorScroll />;
}
