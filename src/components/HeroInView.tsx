"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  createContext,
  useContext,
  type ElementType,
  type ReactNode,
  type RefObject,
} from "react";

const ease = [0.22, 1, 0.36, 1] as const;

type HeroInViewValue = {
  visible: boolean;
  reduceMotion: boolean;
};

const HeroInViewContext = createContext<HeroInViewValue>({
  visible: true,
  reduceMotion: false,
});

export function HeroInViewProvider({
  targetRef,
  children,
}: {
  targetRef: RefObject<HTMLElement | null>;
  children: ReactNode;
}) {
  const inView = useInView(targetRef, { once: false, margin: "-10% 0px" });
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <HeroInViewContext.Provider
      value={{ visible: reduceMotion || inView, reduceMotion }}
    >
      {children}
    </HeroInViewContext.Provider>
  );
}

export function useHeroInView() {
  return useContext(HeroInViewContext);
}

export function HeroReveal({
  children,
  className = "",
  delay = 0,
  y = 12,
  duration = 0.6,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  as?: "div" | "h1" | "p";
}) {
  const { visible, reduceMotion } = useHeroInView();
  const Component = motion[as] as ElementType;

  return (
    <Component
      initial={{ opacity: 0, y }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={
        reduceMotion ? { duration: 0 } : { delay, duration, ease }
      }
      className={className}
    >
      {children}
    </Component>
  );
}
