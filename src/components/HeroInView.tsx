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

/** Hero bottom above this (px) => navbar glass fully applied. */
const NAV_PAST_HERO_THRESHOLD = 80;
const NAV_SCROLL_FADE_DISTANCE = 140;
const NAV_HERO_FADE_DISTANCE = 120;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

type HeroInViewValue = {
  /** Hero reveal animations (intersection-based). */
  visible: boolean;
  /** Navbar glass intensity from 0 (transparent) to 1 (full glass). */
  navScrim: number;
  reduceMotion: boolean;
};

const HeroInViewContext = createContext<HeroInViewValue>({
  visible: true,
  navScrim: 0,
  reduceMotion: false,
});

function useNavScrim(targetRef: RefObject<HTMLElement | null>) {
  const [navScrim, setNavScrim] = useState(0);

  useEffect(() => {
    const el = targetRef.current;
    if (!el) return;

    const update = () => {
      const bottom = el.getBoundingClientRect().bottom;
      const fromScroll = clamp(
        window.scrollY / NAV_SCROLL_FADE_DISTANCE,
        0,
        1,
      );
      const fromHero = clamp(
        (NAV_PAST_HERO_THRESHOLD + NAV_HERO_FADE_DISTANCE - bottom) /
          NAV_HERO_FADE_DISTANCE,
        0,
        1,
      );
      setNavScrim(Math.max(fromScroll, fromHero));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [targetRef]);

  return navScrim;
}

export function HeroInViewProvider({
  targetRef,
  children,
}: {
  targetRef: RefObject<HTMLElement | null>;
  children: ReactNode;
}) {
  const inView = useInView(targetRef, { once: false, margin: "-10% 0px" });
  const navScrim = useNavScrim(targetRef);
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <HeroInViewContext.Provider
      value={{
        visible: reduceMotion || inView,
        navScrim,
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
