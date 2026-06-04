"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ElementType,
  type ReactNode,
  type RefObject,
} from "react";

const ease = [0.22, 1, 0.36, 1] as const;

/** Hero bottom above this (px) => navbar uses compact / glass styles. */
const NAV_PAST_HERO_THRESHOLD = 80;
const NAV_SCROLL_THRESHOLD = 80;

type HeroInViewValue = {
  /** Hero reveal animations (intersection-based). */
  visible: boolean;
  /** Navbar glass background (scroll / hero bottom). */
  pastHero: boolean;
  reduceMotion: boolean;
};

const HeroInViewContext = createContext<HeroInViewValue>({
  visible: true,
  pastHero: false,
  reduceMotion: false,
});

function usePastHero(targetRef: RefObject<HTMLElement | null>) {
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const el = targetRef.current;
    if (!el) return;

    const update = () => {
      const bottom = el.getBoundingClientRect().bottom;
      setPastHero(
        window.scrollY > NAV_SCROLL_THRESHOLD ||
          bottom <= NAV_PAST_HERO_THRESHOLD,
      );
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [targetRef]);

  return pastHero;
}

export function HeroInViewProvider({
  targetRef,
  children,
}: {
  targetRef: RefObject<HTMLElement | null>;
  children: ReactNode;
}) {
  const inView = useInView(targetRef, { once: false, margin: "-10% 0px" });
  const pastHero = usePastHero(targetRef);
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <HeroInViewContext.Provider
      value={{
        visible: reduceMotion || inView,
        pastHero,
        reduceMotion,
      }}
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
