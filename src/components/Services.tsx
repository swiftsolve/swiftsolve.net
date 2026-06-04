"use client";

import {
  Bot,
  Workflow,
  ScanEye,
  BrainCircuit,
  Database,
  Layout,
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
    title: "AI Product Builds",
    description:
      "End-to-end design and development for AI-native applications, from product discovery and UX to model integration, backend systems, deployment, and launch.",
    icon: Bot,
  },
  {
    title: "LLM, RAG & Agent Systems",
    description:
      "Custom copilots, retrieval-augmented generation, workflow agents, document intelligence, and domain-specific language systems grounded in your data and policies.",
    icon: BrainCircuit,
  },
  {
    title: "Computer Vision Products",
    description:
      "Detection, measurement, recognition, visual QA, and operator review tools built for real-world environments and production workflows.",
    icon: ScanEye,
  },
  {
    title: "AI Automation Platforms",
    description:
      "Human-in-the-loop automation for repetitive, document-heavy, or decision-heavy processes, with clear interfaces for review, approval, and exception handling.",
    icon: Workflow,
  },
  {
    title: "Data & ML Infrastructure",
    description:
      "Data pipelines, APIs, analytics foundations, MLOps, inference infrastructure, GPU scaling, monitoring, and cloud-native deployment.",
    icon: Database,
  },
  {
    title: "Product UX for AI Systems",
    description:
      "Interfaces that make AI understandable, controllable, and useful, including dashboards, review queues, prompt workflows, feedback loops, and admin tools.",
    icon: Layout,
  },
];

const startingPoints = [
  "Build an AI product from concept to launch",
  "Automate a document-heavy workflow",
  "Add an LLM copilot to your SaaS",
  "Deploy computer vision into an operational workflow",
  "Scale inference and ML infrastructure",
];

export default function Services() {
  return (
    <div className="max-w-5xl w-full">
      <ScrollReveal y={28}>
        <p className="type-label mb-4 text-center text-accent">
          How we help
        </p>
      </ScrollReveal>

      <ScrollHeadline className="type-headline mb-5 text-center">
        Engagements mapped to real buying needs
      </ScrollHeadline>

      <ScrollReveal y={24} className="mb-10 text-center sm:mb-12">
        <p className="type-body mx-auto max-w-2xl px-1 text-pretty text-muted sm:px-0">
          Whether you need a full product build, a production LLM workflow, or
          the infrastructure to scale inference, each engagement is scoped around
          an outcome your team can ship and measure.
        </p>
      </ScrollReveal>

      <ScrollReveal y={24} className="mb-12 sm:mb-16">
        <p className="type-label mb-5 text-center text-white/35">
          Common starting points
        </p>
        <ul className="mx-auto flex max-w-3xl flex-wrap justify-center gap-2.5">
          {startingPoints.map((point) => (
            <li
              key={point}
              className="type-caption inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-white/70"
            >
              <span
                aria-hidden
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent/80 shadow-[0_0_6px_rgba(112,255,216,0.35)]"
              />
              {point}
            </li>
          ))}
        </ul>
      </ScrollReveal>

      <ScrollStagger
        className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 md:gap-x-8 md:gap-y-12 lg:grid-cols-3"
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
