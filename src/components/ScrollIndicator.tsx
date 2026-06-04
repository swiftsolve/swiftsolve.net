"use client";

import { motion } from "framer-motion";
import { useHeroInView } from "@/components/HeroInView";

export default function ScrollIndicator() {
  const { visible, reduceMotion } = useHeroInView();

  return (
    <motion.a
      href="#about"
      initial={{ opacity: 0 }}
      animate={visible ? { opacity: 1 } : { opacity: 0 }}
      transition={reduceMotion ? { duration: 0 } : { delay: 1.4, duration: 0.8 }}
      className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 pb-[env(safe-area-inset-bottom)] text-white/30 transition-colors hover:text-white/60 sm:bottom-10"
      aria-label="Scroll to learn more"
    >
      <span className="type-label">Scroll</span>
      <motion.span
        animate={visible && !reduceMotion ? { y: [0, 6, 0] } : { y: 0 }}
        transition={{
          duration: 1.6,
          repeat: visible && !reduceMotion ? Infinity : 0,
          ease: "easeInOut",
        }}
        className="block h-8 w-px bg-gradient-to-b from-white/40 to-transparent"
      />
    </motion.a>
  );
}
