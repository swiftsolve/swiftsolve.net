"use client";

import { Activity, Layers, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  ScrollReveal,
  ScrollStagger,
  ScrollStaggerItem,
  ScrollHeadline,
} from "@/components/ScrollReveal";

const pillars: {
  title: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    title: "Production-minded",
    description:
      "Infrastructure, observability, APIs, deployment, and scaling are part of the build from the start, not an afterthought.",
    icon: Activity,
  },
  {
    title: "User-centered",
    description:
      "Every AI workflow is designed around the people who need to understand, review, and act on the output.",
    icon: Users,
  },
  {
    title: "Full-stack delivery",
    description:
      "Strategy, UX, engineering, ML integration, data pipelines, and cloud deployment under one roof.",
    icon: Layers,
  },
];

export default function TrustSection() {
  return (
    <div className="w-full max-w-5xl">
      <ScrollReveal y={28}>
        <p className="type-label mb-4 text-center text-accent">
          Why teams choose us
        </p>
      </ScrollReveal>

      <ScrollHeadline className="type-headline mb-5 text-center">
        Built for teams that need AI to work in the real world
      </ScrollHeadline>

      <ScrollReveal y={24} className="mb-10 text-center sm:mb-12">
        <p className="type-body mx-auto max-w-2xl px-1 text-pretty text-muted sm:px-0">
          Production AI is not just a model call. It requires clean data flows,
          reliable infrastructure, thoughtful UX, monitoring, security, and user
          trust. SwiftSolve brings these pieces together so your product is useful
          on day one and maintainable after launch.
        </p>
      </ScrollReveal>

      <ScrollStagger className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
        {pillars.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <ScrollStaggerItem
              key={pillar.title}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 text-center md:text-left"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-accent">
                <Icon className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <h3 className="type-title mb-2">{pillar.title}</h3>
              <p className="type-body text-muted">{pillar.description}</p>
            </ScrollStaggerItem>
          );
        })}
      </ScrollStagger>
    </div>
  );
}
