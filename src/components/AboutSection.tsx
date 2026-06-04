"use client";

import {
  ScrollReveal,
  ScrollHeadline,
} from "@/components/ScrollReveal";
import SkillsMarquee from "@/components/SkillsMarquee";

export default function AboutSection() {
  return (
    <div className="max-w-4xl px-1 text-center sm:px-0">
      <ScrollReveal delay={0} y={32}>
        <p className="type-label mb-4 text-accent">
          About
        </p>
      </ScrollReveal>

      <ScrollHeadline className="type-headline mb-6">
        Where great design meets production AI.
      </ScrollHeadline>

      <ScrollReveal delay={0.15} y={40}>
        <p className="type-body mb-5 text-muted">
          SwiftSolve is an AI product studio that treats interface craft as
          seriously as model performance. We partner with teams to design, build,
          and deploy intelligent products, from conversational LLM platforms and
          document AI to computer vision tools and cloud-native ML infrastructure.
        </p>
        <p className="type-body mb-10 text-muted">
          Every layer gets the same attention: robust data pipelines and inference
          at scale on one side, polished UX and interaction design on the other,
          so the intelligence is obvious to the people who use it every day.
        </p>
      </ScrollReveal>

      <SkillsMarquee />
    </div>
  );
}
