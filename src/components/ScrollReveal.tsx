"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Scroll reveal on a plain DOM node so nested motion children (e.g. carousels)
 * can run their own opacity/transform animations without Framer Motion conflicts.
 */
export function ScrollRevealShell({
  children,
  className = "",
  y = 56,
  blur = true,
  scale = true,
  once = false,
  margin = "-12% 0px",
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  blur?: boolean;
  scale?: boolean;
  once?: boolean;
  margin?: `${number}% ${number}px` | `${number}px`;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin });
  const reduceMotion = useReducedMotion() ?? false;
  const visible = reduceMotion || isInView;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reduceMotion) {
      el.style.opacity = "1";
      el.style.transform = "none";
      el.style.filter = "none";
      return;
    }

    el.style.transition =
      "opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1), transform 0.9s cubic-bezier(0.22, 1, 0.36, 1), filter 0.9s cubic-bezier(0.22, 1, 0.36, 1)";

    if (visible) {
      el.style.opacity = "1";
      el.style.transform = "none";
      el.style.filter = "none";
    } else {
      el.style.opacity = "0";
      el.style.transform = `translate3d(0, ${y}px, 0) scale(${scale ? 0.95 : 1})`;
      el.style.filter = blur ? "blur(10px)" : "none";
    }
  }, [visible, reduceMotion, y, blur, scale]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  y = 56,
  blur = true,
  scale = true,
  once = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  blur?: boolean;
  scale?: boolean;
  once?: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-14% 0px" });

  const hidden = {
    opacity: 0,
    y,
    filter: blur ? "blur(12px)" : "blur(0px)",
    scale: scale ? 0.94 : 1,
  };
  const visible = { opacity: 1, y: 0, filter: "blur(0px)", scale: 1 };

  return (
    <motion.div
      ref={ref}
      initial={hidden}
      animate={isInView ? visible : hidden}
      transition={{ duration: 1, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScrollStagger({
  children,
  className = "",
  stagger = 0.09,
  once = false,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  once?: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-12% 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: 0.05 } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function ScrollStaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          y: 44,
          filter: "blur(10px)",
          scale: 0.95,
        },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          scale: 1,
          transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScrollHeadline({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-18% 0px" });

  const hidden = { opacity: 0, y: 72, scale: 0.92, filter: "blur(14px)" };
  const visible = { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" };

  return (
    <motion.h2
      ref={ref}
      initial={hidden}
      animate={isInView ? visible : hidden}
      transition={{ duration: 1.1, ease }}
      className={className}
    >
      {children}
    </motion.h2>
  );
}
