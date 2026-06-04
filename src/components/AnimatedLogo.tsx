"use client";

import { motion } from "framer-motion";
import { useHeroInView } from "@/components/HeroInView";

const spring = {
  type: "spring" as const,
  damping: 26,
  stiffness: 170,
  mass: 0.9,
};

const letterHidden = { y: "120%", opacity: 0, filter: "blur(8px)" };
const letterVisible = { y: "0%", opacity: 1, filter: "blur(0px)" };

function Letter({
  char,
  delay,
  className,
  visible,
  reduceMotion,
}: {
  char: string;
  delay: number;
  className?: string;
  visible: boolean;
  reduceMotion: boolean;
}) {
  return (
    <span className="inline-block overflow-hidden pb-[0.02em]">
      <motion.span
        initial={letterHidden}
        animate={visible ? letterVisible : letterHidden}
        transition={reduceMotion ? { duration: 0 } : { ...spring, delay }}
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
  visible,
  reduceMotion,
}: {
  text: string;
  baseDelay: number;
  className?: string;
  visible: boolean;
  reduceMotion: boolean;
}) {
  return (
    <>
      {text.split("").map((char, i) => (
        <Letter
          key={`${text}-${i}`}
          char={char}
          delay={baseDelay + i * 0.055}
          className={className}
          visible={visible}
          reduceMotion={reduceMotion}
        />
      ))}
    </>
  );
}

export default function AnimatedLogo() {
  const { visible, reduceMotion } = useHeroInView();

  const hidden = { opacity: 0, scale: 0.94, filter: "blur(4px)" };
  const shown = { opacity: 1, scale: 1, filter: "blur(0px)" };

  return (
    <motion.div
      initial={hidden}
      animate={visible ? shown : hidden}
      transition={
        reduceMotion ? { duration: 0 } : { duration: 0.9, ease: [0.22, 1, 0.36, 1] }
      }
      className="relative z-10 inline-block w-fit max-w-full text-[clamp(2.5rem,11vw,8rem)] font-semibold tracking-tight leading-none select-none"
      aria-hidden="true"
    >
      <Word
        text="Swift"
        baseDelay={0.3}
        className="logo-wordmark"
        visible={visible}
        reduceMotion={reduceMotion}
      />
      <Word
        text="Solve"
        baseDelay={0.72}
        className="logo-wordmark"
        visible={visible}
        reduceMotion={reduceMotion}
      />
    </motion.div>
  );
}
