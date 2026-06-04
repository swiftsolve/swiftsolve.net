"use client";

import { type ReactNode, type RefObject } from "react";

export default function HeroScrollLayer({
  sectionRef,
  background,
  children,
  footer,
}: {
  sectionRef: RefObject<HTMLElement | null>;
  background: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <section
      id="hero"
      ref={sectionRef}
      className="snap-section snap-section-hero relative flex items-center justify-center overflow-hidden px-4 pb-16 pt-24 sm:px-6 sm:pt-28"
    >
      <div className="absolute inset-0">{background}</div>

      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center justify-center gap-6 text-center sm:gap-8">
        {children}
      </div>

      {footer}
    </section>
  );
}
