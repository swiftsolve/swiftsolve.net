"use client";

import type { SVGProps } from "react";
import {
  ScrollReveal,
  ScrollStagger,
  ScrollStaggerItem,
  ScrollHeadline,
} from "@/components/ScrollReveal";

function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

function GithubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.08-.74.08-.73.08-.73 1.2.08 1.83 1.23 1.83 1.23 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.96 0-1.32.47-2.39 1.24-3.23-.12-.31-.54-1.53.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.18.77.84 1.23 1.91 1.23 3.23 0 4.63-2.81 5.65-5.49 5.95.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z" />
    </svg>
  );
}

function MapPinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

// PLACEHOLDER CONTENT: replace the names, roles, bios, and links below with
// the real team. Set unused social links to undefined to hide that icon.
type Member = {
  name: string;
  role: string;
  bio: string;
  initials: string;
  linkedin?: string;
  github?: string;
};

const team: Member[] = [
  {
    name: "Founder name",
    role: "Founder & AI Engineering Lead",
    bio: "Add a 1–2 sentence bio: background, the kinds of AI products shipped, and what they focus on at SwiftSolve.",
    initials: "SS",
    linkedin: "#",
    github: "#",
  },
  {
    name: "Team member name",
    role: "Product & UX Lead",
    bio: "Add a short bio covering product design experience and the role they play turning AI workflows into usable software.",
    initials: "SS",
    linkedin: "#",
  },
  {
    name: "Team member name",
    role: "ML & Infrastructure Engineer",
    bio: "Add a short bio covering ML, data, and infrastructure experience: deployment, scaling, and production reliability.",
    initials: "SS",
    linkedin: "#",
    github: "#",
  },
];

// PLACEHOLDER: update to the real company location.
const location = "Remote · Add your location";

export default function TeamSection() {
  return (
    <div className="w-full max-w-5xl">
      <ScrollReveal y={28}>
        <p className="type-label mb-4 text-center text-accent">
          Who&apos;s behind SwiftSolve
        </p>
      </ScrollReveal>

      <ScrollHeadline className="type-headline mb-5 text-center">
        A small team that ships production AI
      </ScrollHeadline>

      <ScrollReveal y={24} className="mb-10 text-center sm:mb-12">
        <p className="type-body mx-auto max-w-2xl px-1 text-pretty text-muted sm:px-0">
          You work directly with the people building your product, no handoffs
          to a separate delivery team. Here is who you&apos;ll be talking to.
        </p>
      </ScrollReveal>

      <ScrollStagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 md:gap-7">
        {team.map((member, index) => (
          <ScrollStaggerItem
            key={`${member.name}-${index}`}
            className="flex flex-col rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 text-center sm:text-left"
          >
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.04] text-sm font-semibold tracking-wide text-accent sm:mx-0">
              {member.initials}
            </div>
            <h3 className="type-title mb-1">{member.name}</h3>
            <p className="type-caption mb-4 text-accent/80">{member.role}</p>
            <p className="type-caption mb-6 text-pretty text-muted">
              {member.bio}
            </p>
            <div className="mt-auto flex justify-center gap-2 sm:justify-start">
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  aria-label={`${member.name} on LinkedIn`}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] text-muted transition hover:border-white/20 hover:text-foreground"
                >
                  <LinkedinIcon className="h-4 w-4" />
                </a>
              )}
              {member.github && (
                <a
                  href={member.github}
                  aria-label={`${member.name} on GitHub`}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] text-muted transition hover:border-white/20 hover:text-foreground"
                >
                  <GithubIcon className="h-4 w-4" />
                </a>
              )}
            </div>
          </ScrollStaggerItem>
        ))}
      </ScrollStagger>

      <ScrollReveal y={20} className="mt-10 text-center sm:mt-12">
        <p className="type-caption inline-flex items-center gap-2 text-white/40">
          <MapPinIcon className="h-4 w-4 text-accent/70" />
          {location}
        </p>
      </ScrollReveal>
    </div>
  );
}
