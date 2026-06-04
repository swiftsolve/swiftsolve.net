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
  type LucideIcon,
} from "lucide-react";

type CardTheme = {
  base: string;
  glow: string;
  highlight: string;
  icon: string;
  iconHover: string;
};

type PortfolioItem = {
  title: string;
  description: string;
  detail: string;
  icon: LucideIcon;
  theme: CardTheme;
};

const pages: PortfolioItem[][] = [
  [
    {
      title: "SwiftWallet",
      description:
        "Intelligent personal finance platform with AI-driven insights and a polished dashboard experience.",
      detail:
        "Automated categorization, forecast modeling, and natural-language access wrapped in clear, privacy-conscious UI engineered for everyday use.",
      icon: Wallet,
      theme: {
        base: "#0a100f",
        glow: "rgba(52,211,153,0.14)",
        highlight: "rgba(234,179,8,0.06)",
        icon: "rgba(110,231,183,0.35)",
        iconHover: "rgba(110,231,183,0.65)",
      },
    },
    {
      title: "Automated Garment Measurement",
      description:
        "Vision-based measurement pipeline for apparel manufacturers and e-commerce fit workflows.",
      detail:
        "Delivers consistent body and garment dimensions from standard photos, replacing manual measurement with production-ready detection and grading logic.",
      icon: ScanLine,
      theme: {
        base: "#0f100a",
        glow: "rgba(190,242,100,0.12)",
        highlight: "rgba(250,204,21,0.05)",
        icon: "rgba(217,249,157,0.35)",
        iconHover: "rgba(217,249,157,0.65)",
      },
    },
    {
      title: "On-demand GPU Scaling",
      description:
        "Elastic GPU infrastructure for high-volume ML inference and training workloads.",
      detail:
        "Kubernetes-orchestrated scaling that responds to queue depth in real time, optimizing utilization and controlling cloud spend without sacrificing latency.",
      icon: Cpu,
      theme: {
        base: "#0a0c14",
        glow: "rgba(99,102,241,0.14)",
        highlight: "rgba(56,189,248,0.08)",
        icon: "rgba(129,140,248,0.35)",
        iconHover: "rgba(129,140,248,0.7)",
      },
    },
  ],
  [
    {
      title: "Bengali OCR + Triton",
      description:
        "Enterprise OCR service for Bengali script, built for mixed document types and high-throughput deployment.",
      detail:
        "GPU-accelerated inference via NVIDIA Triton delivers sub-second response times across digital and scanned inputs at production scale.",
      icon: Languages,
      theme: {
        base: "#0a1012",
        glow: "rgba(45,212,191,0.13)",
        highlight: "rgba(251,191,36,0.06)",
        icon: "rgba(94,234,212,0.35)",
        iconHover: "rgba(94,234,212,0.65)",
      },
    },
    {
      title: "Medical Image Processing",
      description:
        "Clinical imaging tooling with radiologist-first review interfaces for 3D volume analysis.",
      detail:
        "Processes DICOM data into actionable views with automated anomaly highlighting, designed to fit naturally into existing radiology workflows.",
      icon: ScanHeart,
      theme: {
        base: "#0a0f14",
        glow: "rgba(56,189,248,0.13)",
        highlight: "rgba(34,211,238,0.07)",
        icon: "rgba(125,211,252,0.35)",
        iconHover: "rgba(125,211,252,0.7)",
      },
    },
    {
      title: "Pavement Crack Detection",
      description:
        "Infrastructure intelligence for automated road condition assessment and maintenance planning.",
      detail:
        "Aerial imagery analysis that detects cracking, scores severity, and surfaces priority routes, giving municipal teams data-driven inputs for capital planning.",
      icon: Construction,
      theme: {
        base: "#100e0a",
        glow: "rgba(251,146,60,0.12)",
        highlight: "rgba(168,162,158,0.07)",
        icon: "rgba(253,186,116,0.35)",
        iconHover: "rgba(253,186,116,0.65)",
      },
    },
  ],
  [
    {
      title: "Data Stories",
      description:
        "Design-led analytics experiences with scroll-native reporting for decision-makers.",
      detail:
        "Interactive narratives connect live data to clear conclusions, giving executives and operators a beautiful way to explore trends without analyst dependency.",
      icon: BarChart3,
      theme: {
        base: "#100a0c",
        glow: "rgba(251,113,133,0.12)",
        highlight: "rgba(248,113,113,0.07)",
        icon: "rgba(253,164,175,0.35)",
        iconHover: "rgba(253,164,175,0.65)",
      },
    },
    {
      title: "Server Resource Monitoring",
      description:
        "Unified observability for distributed compute and application infrastructure at scale.",
      detail:
        "Real-time metrics, alert orchestration, and historical trend analysis across clusters, supporting proactive capacity planning and incident response.",
      icon: Server,
      theme: {
        base: "#0a100e",
        glow: "rgba(74,222,128,0.11)",
        highlight: "rgba(56,189,248,0.07)",
        icon: "rgba(134,239,172,0.35)",
        iconHover: "rgba(134,239,172,0.65)",
      },
    },
  ],
];

const AUTOPLAY_MS = 5000;

const slideEase = [0.22, 1, 0.36, 1] as const;

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
      className="w-full max-w-6xl"
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
      <div className="mb-8 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
        <ScrollHeadline className="type-headline">
          Portfolio
        </ScrollHeadline>
        <ScrollReveal delay={0.1} y={24} className="sm:max-w-xs sm:text-right">
          <p className="type-caption text-muted">
            Production AI across finance, healthcare, and infrastructure,
            built for real users.
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
          className={`grid items-stretch gap-5 sm:gap-7 ${
            pages[page].length === 2
              ? "grid-cols-1 sm:grid-cols-2"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {pages[page].map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] transition hover:border-white/[0.14]"
                style={
                  {
                    "--card-icon": item.theme.icon,
                    "--card-icon-hover": item.theme.iconHover,
                  } as CSSProperties
                }
              >
                <div
                  className="relative flex h-52 shrink-0 items-center justify-center overflow-hidden border-b border-white/[0.05] md:h-56"
                  style={{ backgroundColor: item.theme.base }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `radial-gradient(ellipse at 50% 115%, ${item.theme.glow}, transparent 70%)`,
                    }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `radial-gradient(ellipse at 50% -10%, ${item.theme.highlight}, transparent 55%)`,
                    }}
                  />
                  <div
                    className="absolute inset-0 opacity-35"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
                      backgroundSize: "32px 32px",
                    }}
                  />
                  <Icon
                    className="relative h-14 w-14 text-[var(--card-icon)] transition duration-300 group-hover:scale-[1.04] group-hover:text-[var(--card-icon-hover)] md:h-16 md:w-16"
                    strokeWidth={1.25}
                  />
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6 md:p-7">
                  <h3 className="type-title mb-2 sm:mb-3">{item.title}</h3>
                  <p className="type-caption text-pretty text-muted">
                    {item.description} {item.detail}
                  </p>
                </div>
              </article>
            );
          })}
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
