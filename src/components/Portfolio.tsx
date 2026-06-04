"use client";

import { useState, useEffect, useRef, type CSSProperties } from "react";
import {
  ScrollReveal,
  ScrollHeadline,
} from "@/components/ScrollReveal";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wallet,
  ScanLine,
  Cpu,
  Languages,
  ScanHeart,
  Construction,
  BarChart3,
  Server,
  ChevronLeft,
  ChevronRight,
  Check,
  type LucideIcon,
} from "lucide-react";

type PortfolioItem = {
  title: string;
  tagline: string;
  solution: string;
  outcome: string;
  stack: string[];
  delivered: string[];
  status: string;
  domain: string;
  icon: LucideIcon;
  accent: string;
};

const pages: PortfolioItem[][] = [
  [
    {
      title: "SwiftWallet",
      tagline:
        "AI personal finance dashboard for cash-flow forecasting and natural-language insights.",
      solution:
        "Privacy-first finance UI with categorized spending, forecast models, and plain-English answers about transaction data.",
      outcome:
        "Turned raw transaction data into plain-English answers users could act on, without spreadsheets or manual tagging.",
      stack: ["React", "TypeScript", "FastAPI", "Postgres", "LLM APIs"],
      delivered: [
        "Transaction ingestion & categorization",
        "Forecast modeling & trend analysis",
        "Conversational query interface",
        "Dashboard UX & app architecture",
      ],
      status: "Shipped product",
      domain: "Finance",
      icon: Wallet,
      accent: "#6ee7b7",
    },
    {
      title: "Automated Garment Measurement",
      tagline:
        "Computer vision pipeline for consistent apparel measurements from standard photos.",
      solution:
        "Landmark detection from standard photos, measurement estimates, and an operator review UI for apparel and e-commerce fit teams.",
      outcome:
        "Replaced manual tape-measure workflows with consistent, repeatable measurements from a single standard photo.",
      stack: ["PyTorch", "OpenCV", "FastAPI", "React", "Docker"],
      delivered: [
        "Image capture & detection pipeline",
        "Measurement & grading logic",
        "Operator QA review interface",
        "API integration & deployment",
      ],
      status: "Client project",
      domain: "Apparel",
      icon: ScanLine,
      accent: "#bef264",
    },
  ],
  [
    {
      title: "On-demand GPU Scaling",
      tagline:
        "Queue-driven GPU autoscaling for ML inference and training workloads.",
      solution:
        "Queue-driven Kubernetes GPU scaling that cuts idle compute spend while preserving latency for inference and training workloads.",
      outcome:
        "Scaled GPU compute to live queue demand instead of peak provisioning, reducing idle spend without hurting latency.",
      stack: ["Kubernetes", "Python", "Prometheus", "Terraform", "CUDA"],
      delivered: [
        "Kubernetes & GPU scheduling",
        "Queue-depth autoscaling",
        "Monitoring & deploy automation",
        "Cost-control architecture",
      ],
      status: "Production deployment",
      domain: "ML Infrastructure",
      icon: Cpu,
      accent: "#a5b4fc",
    },
    {
      title: "Bengali OCR + Triton",
      tagline:
        "Enterprise OCR service for Bengali script at production throughput.",
      solution:
        "GPU-accelerated Bengali OCR on NVIDIA Triton for mixed documents at sub-second throughput in production.",
      outcome:
        "Delivered reliable Bengali OCR on real, mixed-quality documents at production throughput, not just clean samples.",
      stack: ["NVIDIA Triton", "PyTorch", "FastAPI", "Redis", "Docker"],
      delivered: [
        "Document preprocessing & OCR serving",
        "NVIDIA Triton deployment",
        "Production throughput tuning",
        "Document workflow APIs",
      ],
      status: "Production deployment",
      domain: "Document AI",
      icon: Languages,
      accent: "#5eead4",
    },
  ],
  [
    {
      title: "Medical Image Processing",
      tagline:
        "Clinical imaging tooling with radiologist-first review for 3D volumes.",
      solution:
        "DICOM-to-insight pipeline with anomaly highlighting and a radiologist-first review UI for existing clinical workflows.",
      outcome:
        "Gave radiologists a faster review path by surfacing anomalies inside the workflow they already use.",
      stack: ["Python", "MONAI", "DICOM", "React", "Postgres"],
      delivered: [
        "DICOM ingestion & 3D processing",
        "Anomaly detection & highlighting",
        "Radiologist review interface",
        "Clinical workflow integration",
      ],
      status: "Client project",
      domain: "Healthcare",
      icon: ScanHeart,
      accent: "#7dd3fc",
    },
    {
      title: "Pavement Crack Detection",
      tagline:
        "Aerial imagery analysis for road condition assessment and maintenance planning.",
      solution:
        "Aerial crack detection, severity scoring, and route prioritization for municipal maintenance and capital planning teams.",
      outcome:
        "Helped maintenance teams prioritize repairs from aerial imagery instead of slow, manual road surveys.",
      stack: ["PyTorch", "GIS", "FastAPI", "React", "PostGIS"],
      delivered: [
        "Aerial imagery ingestion",
        "Crack detection & severity scoring",
        "Operator review dashboard",
        "Maintenance planning reports",
      ],
      status: "Client project",
      domain: "Infrastructure",
      icon: Construction,
      accent: "#fdba74",
    },
  ],
  [
    {
      title: "Data Stories",
      tagline:
        "Scroll-native analytics experiences for executive and operational teams.",
      solution:
        "Scroll-native reporting that connects live data to conclusions, so teams explore trends without analyst bottlenecks.",
      outcome:
        "Let non-analysts explore live trends and reach conclusions without waiting on the data team.",
      stack: ["Next.js", "TypeScript", "D3", "DuckDB", "Python"],
      delivered: [
        "Live data integration",
        "Scroll-native reporting UX",
        "Executive & operator views",
        "Self-serve trend exploration",
      ],
      status: "Shipped product",
      domain: "Analytics",
      icon: BarChart3,
      accent: "#fda4af",
    },
    {
      title: "Server Resource Monitoring",
      tagline:
        "Unified observability for distributed compute and application infrastructure.",
      solution:
        "Real-time cluster metrics, alert orchestration, and trend analysis for proactive capacity planning and incident response.",
      outcome:
        "Surfaced capacity and incident signals in real time so teams could act before users noticed problems.",
      stack: ["Go", "Prometheus", "Grafana", "Kubernetes", "TimescaleDB"],
      delivered: [
        "Distributed metrics collection",
        "Alert orchestration & escalation",
        "Historical trend dashboards",
        "Capacity planning views",
      ],
      status: "Production deployment",
      domain: "Platform Ops",
      icon: Server,
      accent: "#86efac",
    },
  ],
];

const AUTOPLAY_MS = 5000;

const slideEase = [0.22, 1, 0.36, 1] as const;

function PortfolioCard({ item }: { item: PortfolioItem }) {
  const Icon = item.icon;

  return (
    <article
      className="portfolio-card group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.07]"
      style={{ "--card-accent": item.accent } as CSSProperties}
    >
      <div className="relative flex flex-1 flex-col p-7 sm:p-8">
        <div className="flex items-center gap-4 sm:gap-5">
          <div
            className="portfolio-card-icon-tile relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl sm:h-[3.25rem] sm:w-[3.25rem]"
            aria-hidden
          >
            <Icon
              className="relative h-[1.35rem] w-[1.35rem] transition duration-300 group-hover:scale-105 sm:h-6 sm:w-6"
              strokeWidth={1.5}
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="type-label flex flex-wrap items-center gap-x-2 gap-y-1 text-white/35">
              <span style={{ color: item.accent, opacity: 0.9 }}>
                {item.domain}
              </span>
              <span className="text-white/20" aria-hidden>
                ·
              </span>
              <span>{item.status}</span>
            </p>
            <h3 className="type-card-title mt-1.5 text-balance text-white">
              {item.title}
            </h3>
          </div>
        </div>

        <p className="type-card-lead mt-6 text-pretty text-white/65 sm:mt-7">
          {item.tagline}
        </p>

        <div className="portfolio-card-outcome mt-6 rounded-r-lg py-3 pl-4 pr-4">
          <p
            className="type-label mb-1.5"
            style={{ color: item.accent, opacity: 0.85 }}
          >
            Outcome
          </p>
          <p className="type-card-body text-pretty text-white/70">
            {item.outcome}
          </p>
        </div>

        <div className="mt-auto pt-7 sm:pt-8">
          <p className="type-label mb-4 text-white/30">What we delivered</p>
          <ul className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
            {item.delivered.map((entry) => (
              <li
                key={entry}
                className="type-card-body flex items-start gap-2.5 text-white/55"
              >
                <Check
                  className="mt-[0.3rem] h-3.5 w-3.5 shrink-0 opacity-70"
                  style={{ color: item.accent }}
                  strokeWidth={2.25}
                />
                <span>{entry}</span>
              </li>
            ))}
          </ul>

          <ul className="mt-6 flex flex-wrap gap-1.5 border-t border-white/[0.06] pt-6">
            {item.stack.map((tech) => (
              <li
                key={tech}
                className="portfolio-card-tag rounded-full px-2.5 py-1 text-[0.6875rem] font-medium tracking-tight text-white/50"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

export default function Portfolio() {
  const [page, setPage] = useState(0);
  const pausedRef = useRef(false);
  const totalPages = pages.length;

  const go = (next: number) => {
    setPage((next + totalPages) % totalPages);
  };

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion) return;

    const timer = window.setInterval(() => {
      if (!pausedRef.current) {
        setPage((p) => (p + 1) % totalPages);
      }
    }, AUTOPLAY_MS);

    return () => window.clearInterval(timer);
  }, [totalPages]);

  return (
    <div
      className="w-full max-w-7xl"
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
      }}
      onTouchStart={() => {
        pausedRef.current = true;
      }}
      onTouchEnd={() => {
        pausedRef.current = false;
      }}
    >
      <div className="mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
        <ScrollHeadline className="type-headline">
          Selected work
        </ScrollHeadline>
        <ScrollReveal delay={0.1} y={24} className="sm:max-w-md sm:text-right">
          <p className="type-body text-sm leading-relaxed text-muted sm:text-[0.9375rem]">
            Case studies across finance, healthcare, apparel, infrastructure,
            and ML infrastructure.
          </p>
        </ScrollReveal>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.35, ease: slideEase }}
          className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 sm:gap-7 lg:gap-10"
        >
          {pages[page].map((item) => (
            <PortfolioCard key={item.title} item={item} />
          ))}
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 flex items-center justify-center gap-1 sm:mt-10 sm:justify-end">
        <button
          type="button"
          onClick={() => go(page - 1)}
          aria-label="Previous page"
          className="type-caption flex h-11 w-11 items-center justify-center rounded-full text-muted transition hover:bg-white/5 hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => go(i)}
            aria-label={`Page ${i + 1}`}
            className={`type-caption flex h-11 w-11 items-center justify-center rounded-full transition ${
              page === i
                ? "bg-white/10 text-foreground"
                : "text-muted hover:bg-white/5 hover:text-foreground"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          type="button"
          onClick={() => go(page + 1)}
          aria-label="Next page"
          className="type-caption flex h-11 w-11 items-center justify-center rounded-full text-muted transition hover:bg-white/5 hover:text-foreground"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
