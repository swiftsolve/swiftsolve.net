"use client";

import {
  ScrollReveal,
  ScrollHeadline,
} from "@/components/ScrollReveal";

export default function ProblemSection() {
  return (
    <div className="max-w-3xl px-1 text-center sm:px-0">
      <ScrollReveal y={28}>
        <p className="type-label mb-4 text-accent">The challenge</p>
      </ScrollReveal>

      <ScrollHeadline className="type-headline mb-6">
        AI demos are easy. Production AI products are not.
      </ScrollHeadline>

      <ScrollReveal delay={0.1} y={32}>
        <p className="type-body mb-5 text-muted">
          The hard part is turning a promising model or workflow into software
          people can trust every day. That requires more than prompts and APIs.
          It takes clean data flows, reliable infrastructure, thoughtful UX,
          monitoring, and a clear understanding of the user&apos;s job.
        </p>
        <p className="type-body text-muted">
          SwiftSolve brings product design and AI engineering together so your
          product is useful, scalable, and ready for real-world use.
        </p>
      </ScrollReveal>
    </div>
  );
}
