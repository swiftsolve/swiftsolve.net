"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ElementType,
  type ReactNode,
  type RefObject,
} from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

/** After this, hero elements follow scroll instead of timed entrance. */
const ENTRANCE_HANDOFF_MS = 2500;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function getHeroElement(targetRef: RefObject<HTMLElement | null>) {
  return targetRef.current ?? document.getElementById("hero");
}

const NAV_FADE_DISTANCE = 120;

function useNavScrim(targetRef: RefObject<HTMLElement | null>) {
  const [navScrim, setNavScrim] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = getHeroElement(targetRef);
      if (!el) return;

      const top = el.getBoundingClientRect().top;

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
  atHeroTop: boolean;
  navScrim: number;
  heroRef: RefObject<HTMLElement | null>;
  scrollYProgress: MotionValue<number>;
  /** Timed entrance on load; scroll-driven hide/reveal after handoff. */
  scrollLinked: boolean;
  reduceMotion: boolean;
};

const HeroInViewContext = createContext<HeroInViewValue | null>(null);

export function HeroInViewProvider({
  targetRef,
  children,
}: {
  targetRef: RefObject<HTMLElement | null>;
  children: ReactNode;
}) {
  const navScrim = useNavScrim(targetRef);
  const reduceMotion = useReducedMotion() ?? false;
  const [atHeroTop, setAtHeroTop] = useState(true);
  const [scrollLinked, setScrollLinked] = useState(reduceMotion);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (value > 0.015) {
      setScrollLinked(true);
    }
  });

  useEffect(() => {
    if (reduceMotion) {
      setScrollLinked(true);
      return;
    }

    const timeout = window.setTimeout(
      () => setScrollLinked(true),
      ENTRANCE_HANDOFF_MS,
    );

    return () => window.clearTimeout(timeout);
  }, [reduceMotion]);

  useEffect(() => {
    const update = () => {
      const el = getHeroElement(targetRef);
      if (!el) return;
      setAtHeroTop(el.getBoundingClientRect().top >= -6);
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
        atHeroTop,
        navScrim,
        heroRef: targetRef,
        scrollYProgress,
        scrollLinked,
        reduceMotion,
      }}
    >
      {children}
    </HeroInViewContext.Provider>
  );
}

export function useHeroInView() {
  const ctx = useContext(HeroInViewContext);
  if (!ctx) {
    throw new Error("useHeroInView must be used within HeroInViewProvider");
  }
  return ctx;
}

function HeroRevealEntrance({
  children,
  className,
  delay,
  duration,
  y,
  blur,
  as,
}: {
  children: ReactNode;
  className: string;
  delay: number;
  duration: number;
  y: number;
  blur: number;
  as: "div" | "h1" | "p";
}) {
  const Component = motion[as] as ElementType;

  return (
    <Component
      initial={{ opacity: 0, y, filter: `blur(${blur}px)` }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ delay, duration, ease }}
      className={className}
    >
      {children}
    </Component>
  );
}

function HeroRevealScroll({
  children,
  className,
  revealStart,
  revealEnd,
  as,
}: {
  children: ReactNode;
  className: string;
  revealStart: number;
  revealEnd: number;
  as: "div" | "h1" | "p";
}) {
  const { scrollYProgress } = useHeroInView();
  const Component = motion[as] as ElementType;

  const opacity = useTransform(scrollYProgress, [revealEnd, revealStart], [1, 0]);

  return (
    <Component className={className} style={{ opacity }}>
      {children}
    </Component>
  );
}

export function HeroReveal({
  children,
  className = "",
  revealStart,
  revealEnd,
  delay = 0,
  duration = 0.6,
  y = 12,
  blur = 8,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  revealStart: number;
  revealEnd: number;
  delay?: number;
  duration?: number;
  y?: number;
  blur?: number;
  as?: "div" | "h1" | "p";
}) {
  const { scrollLinked, reduceMotion } = useHeroInView();

  if (reduceMotion) {
    const Static = as as ElementType;
    return <Static className={className}>{children}</Static>;
  }

  if (!scrollLinked) {
    return (
      <HeroRevealEntrance
        className={className}
        delay={delay}
        duration={duration}
        y={y}
        blur={blur}
        as={as}
      >
        {children}
      </HeroRevealEntrance>
    );
  }

  return (
    <HeroRevealScroll
      className={className}
      revealStart={revealStart}
      revealEnd={revealEnd}
      as={as}
    >
      {children}
    </HeroRevealScroll>
  );
}
