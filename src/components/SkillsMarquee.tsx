"use client";

import { useAnimationFrame, useReducedMotion } from "framer-motion";
import { useLayoutEffect, useMemo, useRef } from "react";
import {
  ScanEye,
  BrainCircuit,
  Workflow,
  Database,
  Languages,
  ScanText,
  Cpu,
  Cloud,
  Activity,
  Network,
  BarChart3,
  Bot,
  FileSearch,
  Boxes,
  FileText,
  Gauge,
  Layers,
  Layout,
  MousePointer2,
  Code2,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

type Skill = { label: string; icon: LucideIcon };

const skillRows: Skill[][] = [
  [
    { label: "Computer Vision", icon: ScanEye },
    { label: "LLM Systems", icon: BrainCircuit },
    { label: "Agent Systems", icon: Bot },
    { label: "Generative AI", icon: Sparkles },
    { label: "NLP", icon: Languages },
    { label: "Deep Learning", icon: Network },
    { label: "RAG Pipelines", icon: FileSearch },
  ],
  [
    { label: "MLOps", icon: Workflow },
    { label: "Data Platforms", icon: Database },
    { label: "Kubernetes", icon: Boxes },
    { label: "Cloud Infrastructure", icon: Cloud },
    { label: "GPU Computing", icon: Cpu },
    { label: "Inference at Scale", icon: Gauge },
    { label: "Production APIs", icon: Code2 },
  ],
  [
    { label: "OCR", icon: ScanText },
    { label: "Document AI", icon: FileText },
    { label: "Vector Search", icon: Layers },
    { label: "Real-time Systems", icon: Activity },
    { label: "Analytics", icon: BarChart3 },
    { label: "Product UI", icon: Layout },
    { label: "Interaction Design", icon: MousePointer2 },
  ],
];

const marqueeDuration = 40;
const COPY_COUNT = 4;

function SkillTag({ label, icon: Icon }: Skill) {
  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1.5 text-white/50">
      <Icon className="h-3.5 w-3.5 shrink-0 text-accent/80" strokeWidth={1.5} />
      {label}
    </span>
  );
}

function MarqueeRow({
  row,
  direction,
}: {
  row: Skill[];
  direction: "left" | "right";
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const setWidthRef = useRef(0);
  const readyRef = useRef(false);

  const track = useMemo(
    () => Array.from({ length: COPY_COUNT }, () => row).flat(),
    [row],
  );

  useLayoutEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const measure = () => {
      const setWidth = el.scrollWidth / COPY_COUNT;
      if (setWidth <= 0) return;

      setWidthRef.current = setWidth;
      if (!readyRef.current) {
        offsetRef.current = -setWidth / 2;
        readyRef.current = true;
      }
      el.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [track]);

  useAnimationFrame((_, delta) => {
    const el = trackRef.current;
    const setWidth = setWidthRef.current;
    if (!el || !readyRef.current || setWidth <= 0) return;

    const pxPerMs = setWidth / (marqueeDuration * 1000);
    const step = pxPerMs * delta * (direction === "right" ? 1 : -1);

    offsetRef.current += step;

    if (direction === "right") {
      while (offsetRef.current >= 0) offsetRef.current -= setWidth;
    } else {
      while (offsetRef.current <= -setWidth) offsetRef.current += setWidth;
    }

    el.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
  });

  return (
    <div className="overflow-hidden">
      <div
        ref={trackRef}
        className="type-caption flex w-max gap-3 will-change-transform"
      >
        {track.map(({ label, icon }, index) => (
          <SkillTag key={`${label}-${index}`} label={label} icon={icon} />
        ))}
      </div>
    </div>
  );
}

export default function SkillsMarquee() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div className="type-caption flex flex-wrap justify-center gap-2.5 text-white/50">
        {skillRows.flat().map((skill) => (
          <SkillTag key={skill.label} label={skill.label} icon={skill.icon} />
        ))}
      </div>
    );
  }

  return (
    <div className="relative left-1/2 w-screen -translate-x-1/2">
      <div className="skills-marquee-fade overflow-hidden py-1">
        <div className="flex flex-col gap-3">
          {skillRows.map((row, rowIndex) => (
            <MarqueeRow
              key={rowIndex}
              row={row}
              direction={rowIndex % 2 === 0 ? "right" : "left"}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
