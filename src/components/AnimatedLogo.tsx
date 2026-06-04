"use client";

import { motion } from "framer-motion";

const spring = {
  type: "spring" as const,
  damping: 26,
  stiffness: 170,
  mass: 0.9,
};

function Letter({
  char,
  delay,
  className,
}: {
  char: string;
  delay: number;
  className?: string;
}) {
  return (
    <span className="inline-block overflow-hidden pb-[0.02em]">
      <motion.span
        initial={{ y: "120%", opacity: 0, filter: "blur(8px)" }}
        animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
        transition={{ ...spring, delay }}
        className={`inline-block will-change-transform ${className ?? ""}`}
      >
        {char}
      </motion.span>
    </span>
  );
}

function Word({
  text,
  baseDelay,
  className,
}: {
  text: string;
  baseDelay: number;
  className?: string;
}) {
  return (
    <>
      {text.split("").map((char, i) => (
        <Letter
          key={`${text}-${i}`}
          char={char}
          delay={baseDelay + i * 0.055}
          className={className}
        />
      ))}
    </>
  );
}

export default function AnimatedLogo() {
  return (
    <motion.h1
      initial={{ opacity: 0, scale: 0.94, filter: "blur(4px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 inline-block w-fit max-w-full text-[clamp(2.5rem,11vw,8rem)] font-semibold tracking-tight leading-none select-none"
      aria-label="SwiftSolve"
    >
      <Word text="Swift" baseDelay={0.3} className="logo-wordmark" />
      <Word text="Solve" baseDelay={0.72} className="logo-wordmark" />
    </motion.h1>
  );
}
