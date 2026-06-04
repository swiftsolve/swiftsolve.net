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

/** Pixels of scroll before nav glass reaches full opacity. */
const NAV_FADE_DISTANCE = 120;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function getHeroElement(targetRef: RefObject<HTMLElement | null>) {
  return targetRef.current ?? document.getElementById("hero");
}

function useNavScrim(targetRef: RefObject<HTMLElement | null>) {
  const [navScrim, setNavScrim] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = getHeroElement(targetRef);
      if (!el) return;

      const top = el.getBoundingClientRect().top;

      // Transparent while the hero is flush with the top of the viewport.
      if (top >= -1) {
        setNavScrim(0);
        return;
      }

      setNavScrim(clamp(-top / NAV_FADE_DISTANCE, 0, 1));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });

    const raf = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [targetRef]);

  return navScrim;
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

export function HeroInViewProvider({
  targetRef,
  children,
}: {
  targetRef: RefObject<HTMLElement | null>;
  children: ReactNode;
}) {
  const inView = useInView(targetRef, { once: true, margin: "-10% 0px" });
  const navScrim = useNavScrim(targetRef);
  const reduceMotion = useReducedMotion() ?? false;
  const [heroActive, setHeroActive] = useState(true);

  useEffect(() => {
    const update = () => {
      const el = getHeroElement(targetRef);
      if (!el) return;

      const { top, bottom, height } = el.getBoundingClientRect();
      const inHeroByScroll = window.scrollY <= height * 0.9;
      const inHeroByRect =
        top < window.innerHeight * 0.25 && bottom > window.innerHeight * 0.4;
      setHeroActive(inHeroByScroll || inHeroByRect);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });

    const raf = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [targetRef]);

  return (
    <HeroInViewContext.Provider
      value={{
        visible: reduceMotion || inView || heroActive,
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
