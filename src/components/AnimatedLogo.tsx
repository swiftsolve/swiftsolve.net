"use client";

import { motion, useTransform } from "framer-motion";
import { useHeroInView } from "@/components/HeroInView";

const LOGO_HIDE_START = 0.58;
const LETTER_STAGGER = 0.045;
const LETTER_WINDOW = 0.12;

const letterSpring = {
  type: "spring" as const,
  damping: 26,
  stiffness: 170,
  mass: 0.9,
};

function letterThresholds(index: number) {
  const revealStart = LOGO_HIDE_START - index * LETTER_STAGGER;
  const revealEnd = Math.max(0.04, revealStart - LETTER_WINDOW);
  return { revealStart, revealEnd };
}

function letterEntranceDelay(index: number) {
  if (index < 5) return 0.3 + index * 0.055;
  return 0.72 + (index - 5) * 0.055;
}

function EntranceLetter({
  char,
  index,
  className,
}: {
  char: string;
  index: number;
  className?: string;
}) {
  return (
    <span className="inline-block overflow-hidden pb-[0.02em]">
      <motion.span
        initial={{ y: "120%", opacity: 0, filter: "blur(8px)" }}
        animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
        transition={{ ...letterSpring, delay: letterEntranceDelay(index) }}
        className={`inline-block will-change-transform ${className ?? ""}`}
      >
        {char}
      </motion.span>
    </span>
  );
}

function ScrollLetter({
  char,
  index,
  className,
}: {
  char: string;
  index: number;
  className?: string;
}) {
  const { scrollYProgress } = useHeroInView();
  const { revealStart, revealEnd } = letterThresholds(index);

  const opacity = useTransform(
    scrollYProgress,
    [revealEnd, revealStart],
    [1, 0],
  );
  const y = useTransform(
    scrollYProgress,
    [revealEnd, revealStart],
    ["0%", "120%"],
  );

  return (
    <span className="inline-block overflow-hidden pb-[0.02em]">
      <motion.span
        className={`inline-block will-change-transform ${className ?? ""}`}
        style={{ opacity, y }}
      >
        {char}
      </motion.span>
    </span>
  );
}

function Letter({
  char,
  index,
  className,
  scrollLinked,
}: {
  char: string;
  index: number;
  className?: string;
  scrollLinked: boolean;
}) {
  if (scrollLinked) {
    return <ScrollLetter char={char} index={index} className={className} />;
  }
  return <EntranceLetter char={char} index={index} className={className} />;
}

function Word({
  text,
  letterOffset,
  className,
  scrollLinked,
}: {
  text: string;
  letterOffset: number;
  className?: string;
  scrollLinked: boolean;
}) {
  return (
    <>
      {text.split("").map((char, i) => (
        <Letter
          key={`${text}-${i}`}
          char={char}
          index={letterOffset + i}
          className={className}
          scrollLinked={scrollLinked}
        />
      ))}
    </>
  );
}

export default function AnimatedLogo() {
  const { scrollLinked, reduceMotion } = useHeroInView();

  if (reduceMotion) {
    return (
      <div
        className="relative z-10 inline-block w-fit max-w-full text-[clamp(2.5rem,11vw,8rem)] font-semibold tracking-tight leading-none select-none logo-wordmark"
        aria-hidden="true"
      >
        SwiftSolve
      </div>
    );
  }

  if (!scrollLinked) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.94, filter: "blur(4px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 inline-block w-fit max-w-full text-[clamp(2.5rem,11vw,8rem)] font-semibold tracking-tight leading-none select-none"
        aria-hidden="true"
      >
        <Word
          text="Swift"
          letterOffset={0}
          className="logo-wordmark"
          scrollLinked={false}
        />
        <Word
          text="Solve"
          letterOffset={5}
          className="logo-wordmark"
          scrollLinked={false}
        />
      </motion.div>
    );
  }

  return (
    <div
      className="relative z-10 inline-block w-fit max-w-full text-[clamp(2.5rem,11vw,8rem)] font-semibold tracking-tight leading-none select-none"
      aria-hidden="true"
    >
      <Word
        text="Swift"
        letterOffset={0}
        className="logo-wordmark"
        scrollLinked
      />
      <Word
        text="Solve"
        letterOffset={5}
        className="logo-wordmark"
        scrollLinked
      />
    </div>
  );
}
