"use client";

import { motion } from "framer-motion";

export default function ScrollIndicator() {
  return (
    <motion.a
      href="#about"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.4, duration: 0.8 }}
      className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 hover:text-white/60 transition-colors"
      aria-label="Scroll to learn more"
    >
      <span className="type-label">
        Scroll
      </span>
      <motion.span
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        className="block w-px h-8 bg-gradient-to-b from-white/40 to-transparent"
      />
    </motion.a>
  );
}
