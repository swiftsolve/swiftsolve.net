"use client";

import {
  Bot,
  Workflow,
  Network,
  ScanEye,
  BrainCircuit,
  Database,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  ScrollReveal,
  ScrollStagger,
  ScrollStaggerItem,
  ScrollHeadline,
} from "@/components/ScrollReveal";

const services: {
  title: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    title: "AI Products",
    description:
      "End-to-end development for AI-native applications: product discovery, UX and interface design, model integration, and launch, with every screen tested against real user workflows.",
    icon: Bot,
  },
  {
    title: "Automation",
    description:
      "Intelligent process automation with clear operator interfaces, reducing manual overhead while keeping humans in control through thoughtful, transparent UX.",
    icon: Workflow,
  },
  {
    title: "Integration",
    description:
      "Architecture that unifies models, APIs, and data sources into cohesive systems with dashboards and touchpoints people can trust and navigate.",
    icon: Network,
  },
  {
    title: "Computer Vision",
    description:
      "Perception systems with review interfaces built for operators: detection, recognition, and visual understanding engineered for real environments and daily use.",
    icon: ScanEye,
  },
  {
    title: "LLM Systems",
    description:
      "Domain-specific language intelligence with copilot experiences designed for your workflows: RAG pipelines, agents, and interfaces grounded in your content and policies.",
    icon: BrainCircuit,
  },
  {
    title: "Data Platforms",
    description:
      "Ingestion, warehousing, and analytics foundations, plus reporting and exploration UI, so every AI initiative runs on timely, governed, analysis-ready data.",
    icon: Database,
  },
];

export default function Services() {
  return (
    <div className="max-w-5xl w-full">
      <ScrollReveal y={28}>
        <p className="type-label mb-4 text-center text-accent">
          Services
        </p>
      </ScrollReveal>

      <ScrollHeadline className="type-headline mb-5 text-center">
        Built for production. Designed for people.
      </ScrollHeadline>

      <ScrollReveal y={24} className="mb-12 text-center md:mb-14">
        <p className="type-body mx-auto max-w-2xl text-muted">
          Full-stack AI capabilities paired with product design discipline, so
          what you ship looks as refined as it performs.
        </p>
      </ScrollReveal>

      <ScrollStagger
        className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 md:gap-x-8 md:gap-y-12"
        stagger={0.1}
      >
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <ScrollStaggerItem key={service.title} className="text-center md:text-left">
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-accent">
                <Icon className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <h3 className="type-title mb-3">{service.title}</h3>
              <p className="type-body text-muted">{service.description}</p>
            </ScrollStaggerItem>
          );
        })}
      </ScrollStagger>
    </div>
  );
}
