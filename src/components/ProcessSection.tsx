"use client";

import { Blocks, FlaskConical, Rocket, Target } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  ScrollReveal,
  ScrollStagger,
  ScrollStaggerItem,
  ScrollHeadline,
} from "@/components/ScrollReveal";

const steps: {
  title: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    title: "Define the use case",
    description:
      "We clarify the workflow, users, data, success criteria, and technical constraints before writing production code.",
    icon: Target,
  },
  {
    title: "Prototype with real data",
    description:
      "We validate the experience and AI behavior using realistic inputs, representative data, and clear success metrics.",
    icon: FlaskConical,
  },
  {
    title: "Build the production system",
    description:
      "We design the interface, integrate models, connect data sources, build APIs, and deploy the infrastructure for real use.",
    icon: Blocks,
  },
  {
    title: "Launch and improve",
    description:
      "We monitor performance, collect feedback, improve reliability, and iterate based on actual user behavior.",
    icon: Rocket,
  },
];

export default function ProcessSection() {
  return (
    <div className="w-full max-w-4xl">
      <ScrollReveal y={28}>
        <p className="type-label mb-4 text-center text-accent">How we work</p>
      </ScrollReveal>

      <ScrollHeadline className="type-headline mb-10 text-center sm:mb-12">
        From idea to production
      </ScrollHeadline>

      <ScrollStagger className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-10">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <ScrollStaggerItem key={step.title}>
              <div className="mb-3 flex items-center gap-2.5">
                <Icon
                  className="h-4 w-4 shrink-0 text-accent"
                  strokeWidth={1.5}
                />
                <p className="type-label text-accent/80">Step {index + 1}</p>
              </div>
              <h3 className="type-title mb-2">{step.title}</h3>
              <p className="type-body text-muted">{step.description}</p>
            </ScrollStaggerItem>
          );
        })}
      </ScrollStagger>
    </div>
  );
}
