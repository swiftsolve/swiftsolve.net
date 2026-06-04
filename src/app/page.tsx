"use client";

import { useRef } from "react";
import { Mail } from "lucide-react";
import AnimatedLogo from "@/components/AnimatedLogo";
import AboutSection from "@/components/AboutSection";
import HeroScrollLayer from "@/components/HeroScrollLayer";
import { HeroInViewProvider, HeroReveal } from "@/components/HeroInView";
import Navbar from "@/components/Navbar";
import Portfolio from "@/components/Portfolio";
import ProblemSection from "@/components/ProblemSection";
import ProcessSection from "@/components/ProcessSection";
import ScrollIndicator from "@/components/ScrollIndicator";
import Section from "@/components/Section";
import Services from "@/components/Services";
import TeamSection from "@/components/TeamSection";
import TrustSection from "@/components/TrustSection";
import GoToTop from "@/components/GoToTop";
import HeroBackground from "@/components/HeroBackground";
import {
  ScrollStagger,
  ScrollStaggerItem,
} from "@/components/ScrollReveal";

const contactEmail = "hello@swiftsolve.com";
const consultationMailto =
  "mailto:hello@swiftsolve.com?subject=15-minute%20fit%20call%20request&body=Name:%0D%0ACompany:%0D%0AWhat%20you%27re%20building:%0D%0AData%20or%20systems%20involved:%0D%0ATarget%20timeline:%0D%0AProject%20stage%20or%20budget%20range:";

function HeroContent() {
  return (
    <>
      <HeroReveal
        delay={0.1}
        className="type-label rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-white/60 backdrop-blur-sm"
      >
        AI Product Studio
      </HeroReveal>

      <div className="flex flex-col items-center gap-4 sm:gap-5">
        <AnimatedLogo />
        <HeroReveal
          as="h1"
          delay={0.95}
          y={20}
          duration={0.7}
          className="type-headline max-w-3xl px-1 text-pretty text-white sm:px-0"
        >
          Build production AI software, not just demos.
        </HeroReveal>
        <HeroReveal
          as="p"
          delay={1.1}
          y={20}
          duration={0.7}
          className="type-body max-w-2xl px-1 text-pretty text-center font-light text-white/50 sm:px-0"
        >
          SwiftSolve helps startups and product teams design, build, and deploy
          LLM, computer vision, automation, and ML infrastructure products that
          real users can trust, taking validated AI ideas all the way to secure,
          reliable software in production.
        </HeroReveal>
      </div>

      <HeroReveal
        delay={1.35}
        y={16}
        className="flex w-full max-w-sm flex-col gap-3 px-2 sm:max-w-none sm:w-auto sm:flex-row sm:gap-4 sm:px-0"
      >
        <a
          href={consultationMailto}
          className="type-caption flex min-h-11 items-center justify-center rounded-full bg-white px-6 py-2.5 font-medium text-black transition hover:bg-white/90"
        >
          Book a 15-minute fit call
        </a>
        <a
          href="#portfolio"
          className="type-caption flex min-h-11 items-center justify-center rounded-full border border-white/15 px-6 py-2.5 font-medium text-white/70 transition hover:border-white/30 hover:text-white"
        >
          View selected work
        </a>
      </HeroReveal>
    </>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);

  return (
    <HeroInViewProvider targetRef={heroRef}>
      <div className="bg-black">
        <Navbar />
        <GoToTop />

        <HeroScrollLayer
          sectionRef={heroRef}
          background={<HeroBackground />}
          footer={<ScrollIndicator />}
        >
          <HeroContent />
        </HeroScrollLayer>

        <Section
          id="problem"
          className="snap-section flex flex-col items-center justify-center px-4 py-14 md:px-12 md:py-0"
        >
          <ProblemSection />
        </Section>

        <Section
          id="about"
          className="snap-section section-surface flex flex-col items-center justify-center px-4 py-14 md:px-12 md:py-0"
        >
          <AboutSection />
        </Section>

        <Section
          id="portfolio"
          className="snap-section snap-section-loose section-glow flex flex-col items-center justify-center px-4 py-14 md:px-12 md:py-0"
        >
          <Portfolio />
        </Section>

        <Section
          id="services"
          className="snap-section snap-section-loose section-surface flex flex-col items-center justify-center px-4 py-14 md:px-12 md:py-0"
        >
          <Services />
        </Section>

        <Section
          id="process"
          className="snap-section flex flex-col items-center justify-center px-4 py-14 md:px-12 md:py-0"
        >
          <ProcessSection />
        </Section>

        <Section
          id="trust"
          className="snap-section section-glow flex flex-col items-center justify-center px-4 py-14 md:px-12 md:py-0"
        >
          <TrustSection />
        </Section>

        <Section
          id="team"
          className="snap-section snap-section-loose flex flex-col items-center justify-center px-4 py-14 md:px-12 md:py-0"
        >
          <TeamSection />
        </Section>

        <Section
          id="contact"
          className="snap-section section-surface flex flex-col py-14 md:min-h-[100dvh] md:py-0"
        >
          <div className="flex w-full flex-1 flex-col items-center justify-center px-4 py-6 md:px-12 md:py-12">
            <div className="max-w-2xl text-center">
              <ScrollStagger stagger={0.12} once>
                <ScrollStaggerItem>
                  <p className="type-label mb-4 text-accent">Contact</p>
                </ScrollStaggerItem>
                <ScrollStaggerItem>
                  <h2 className="type-headline mb-6">
                    Have an AI product to build?
                  </h2>
                </ScrollStaggerItem>
                <ScrollStaggerItem>
                  <p className="type-body mb-4 text-muted">
                    Start with a free 15-minute fit call. We&apos;ll clarify your
                    use case, the technical path, and what it would take to move
                    from a validated idea to production, with no obligation to
                    continue.
                  </p>
                  <p className="type-body mb-8 text-muted">
                    Include your company, what you&apos;re building, the data or
                    systems involved, your timeline, and project stage. We reply
                    within two business days to schedule the call.
                  </p>
                </ScrollStaggerItem>
                <ScrollStaggerItem>
                  <div className="flex flex-col items-center gap-4">
                    <a
                      href={consultationMailto}
                      className="type-caption inline-flex min-h-11 w-full max-w-xs items-center justify-center gap-2 rounded-full bg-accent px-8 py-3.5 font-medium text-black transition-all hover:brightness-110 sm:w-auto"
                    >
                      <Mail className="h-4 w-4" strokeWidth={2} />
                      Book a 15-minute fit call
                    </a>
                    <p className="type-caption text-white/40">
                      Or email us directly at{" "}
                      <a
                        href={`mailto:${contactEmail}`}
                        className="text-white/70 underline decoration-white/20 underline-offset-4 transition hover:text-white hover:decoration-white/50"
                      >
                        {contactEmail}
                      </a>
                    </p>
                  </div>
                </ScrollStaggerItem>
              </ScrollStagger>
            </div>
          </div>
          <footer className="type-caption w-full shrink-0 border-t border-white/[0.06] pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-center text-white/35">
            © {new Date().getFullYear()} SwiftSolve. All rights reserved.
          </footer>
        </Section>
      </div>
    </HeroInViewProvider>
  );
}
