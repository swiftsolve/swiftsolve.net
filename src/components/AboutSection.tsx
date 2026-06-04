"use client";

import {
  ScrollReveal,
  ScrollHeadline,
} from "@/components/ScrollReveal";
import SkillsMarquee from "@/components/SkillsMarquee";

export default function AboutSection() {
  return (
    <div className="w-full min-w-0 max-w-4xl px-1 text-center sm:px-0">
      <ScrollReveal delay={0} y={32}>
        <p className="type-label mb-4 text-accent">What we do</p>
      </ScrollReveal>

      <ScrollHeadline className="type-headline mb-6">
        More than a prototype. Software your team can rely on.
      </ScrollHeadline>

      <ScrollReveal delay={0.15} y={40}>
        <p className="type-body mb-5 text-muted">
          SwiftSolve is an AI product studio for teams that need more than a
          demo. We combine product strategy, UX design, model integration, data
          engineering, and cloud infrastructure to turn AI concepts into
          reliable software people can use every day.
        </p>
        <p className="type-body mb-4 text-muted">
          We work with funded startups, enterprise innovation teams, and product
          companies shipping AI in finance, healthcare, apparel, infrastructure,
          and SaaS.
        </p>
        <p className="type-caption mb-10 text-white/40">
          LLM copilots, RAG systems, computer vision, document AI, automation
          platforms, and ML infrastructure.
        </p>
      </ScrollReveal>

      <SkillsMarquee />
    </div>
  );
}
