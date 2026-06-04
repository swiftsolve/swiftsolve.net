"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import AnimatedLogo from "@/components/AnimatedLogo";
import AboutSection from "@/components/AboutSection";
import HeroScrollLayer from "@/components/HeroScrollLayer";
import Navbar from "@/components/Navbar";
import Portfolio from "@/components/Portfolio";
import ProblemSection from "@/components/ProblemSection";
import ProcessSection from "@/components/ProcessSection";
import ScrollIndicator from "@/components/ScrollIndicator";
import Section from "@/components/Section";
import Services from "@/components/Services";
import TrustSection from "@/components/TrustSection";
import HeroBackground from "@/components/HeroBackground";
import {
  ScrollStagger,
  ScrollStaggerItem,
} from "@/components/ScrollReveal";

const consultationMailto =
  "mailto:hello@swiftsolve.com?subject=Project%20consultation%20request&body=Name:%0D%0ACompany:%0D%0AWhat%20you%27re%20building:%0D%0AData%20or%20systems%20involved:%0D%0ATarget%20timeline:%0D%0AProject%20stage%20or%20budget%20range:";

export default function Home() {
  return (
    <div className="bg-black">
      <Navbar />

      <HeroScrollLayer
        background={<HeroBackground />}
        footer={<ScrollIndicator />}
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="type-label rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-white/60 backdrop-blur-sm"
        >
          AI Product Studio
        </motion.div>

        <div className="flex flex-col items-center gap-4 sm:gap-5">
          <AnimatedLogo />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="type-headline max-w-3xl px-1 text-pretty text-white sm:px-0"
          >
            Ship production AI products people actually use.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="type-body max-w-2xl px-1 text-pretty text-center font-light text-white/50 sm:px-0"
          >
            SwiftSolve designs, builds, and deploys AI applications that combine
            reliable model infrastructure with polished product UX. From LLM
            copilots and RAG systems to computer vision tools, automation
            platforms, and ML infrastructure, we help teams move from AI concept
            to production-ready software.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.35, duration: 0.6 }}
          className="flex w-full max-w-sm flex-col gap-3 px-2 sm:max-w-none sm:w-auto sm:flex-row sm:gap-4 sm:px-0"
        >
          <a
            href={consultationMailto}
            className="type-caption flex min-h-11 items-center justify-center rounded-full bg-white px-6 py-2.5 font-medium text-black transition hover:bg-white/90"
          >
            Book a project consultation
          </a>
          <a
            href="#portfolio"
            className="type-caption flex min-h-11 items-center justify-center rounded-full border border-white/15 px-6 py-2.5 font-medium text-white/70 transition hover:border-white/30 hover:text-white"
          >
            View selected work
          </a>
        </motion.div>
      </HeroScrollLayer>

      <Section
        id="problem"
        className="snap-section dark-gradient-alt flex flex-col items-center justify-center px-4 py-14 md:px-12 md:py-0"
      >
        <ProblemSection />
      </Section>

      <Section
        id="about"
        className="snap-section dark-gradient-alt flex flex-col items-center justify-center px-4 py-14 md:px-12 md:py-0"
      >
        <AboutSection />
      </Section>

      <Section
        id="portfolio"
        className="snap-section snap-section-loose dark-gradient-portfolio flex flex-col items-center justify-center px-4 py-14 md:px-12 md:py-0"
      >
        <Portfolio />
      </Section>

      <Section
        id="services"
        className="snap-section snap-section-loose dark-gradient-alt flex flex-col items-center justify-center px-4 py-14 md:px-12 md:py-0"
      >
        <Services />
      </Section>

      <Section
        id="process"
        className="snap-section dark-gradient-alt flex flex-col items-center justify-center px-4 py-14 md:px-12 md:py-0"
      >
        <ProcessSection />
      </Section>

      <Section
        id="trust"
        className="snap-section dark-gradient-portfolio flex flex-col items-center justify-center px-4 py-14 md:px-12 md:py-0"
      >
        <TrustSection />
      </Section>

      <Section
        id="contact"
        className="snap-section dark-gradient flex flex-col justify-center px-4 py-14 pb-[max(4rem,env(safe-area-inset-bottom))] md:min-h-[100dvh] md:px-12 md:py-0"
      >
        <div className="flex w-full flex-col items-center md:flex-1 md:justify-center">
          <div className="max-w-2xl text-center">
            <ScrollStagger stagger={0.12}>
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
                  Tell us what you&apos;re trying to launch, automate, or
                  improve. We&apos;ll help you clarify the use case, technical
                  path, product scope, and what it would take to move from
                  concept to production.
                </p>
                <p className="type-body mb-3 text-muted">
                  In your message, include your company, what you&apos;re
                  building, the data or systems involved, timeline, and project
                  stage. We typically respond within two business days with next
                  steps for a scoping conversation.
                </p>
                <p className="type-caption mb-10 text-white/40">
                  Best fit: AI product builds, LLM/RAG systems, computer vision
                  workflows, automation platforms, and ML infrastructure.
                </p>
              </ScrollStaggerItem>
              <ScrollStaggerItem>
                <a
                  href={consultationMailto}
                  className="type-caption inline-flex min-h-11 w-full max-w-xs items-center justify-center gap-2 rounded-full bg-accent px-8 py-3.5 font-medium text-black transition-all hover:brightness-110 sm:w-auto"
                >
                  <Mail className="h-4 w-4" strokeWidth={2} />
                  Book a project consultation
                </a>
              </ScrollStaggerItem>
            </ScrollStagger>
          </div>
        </div>
        <footer className="type-label shrink-0 pt-8 text-center text-muted">
          © {new Date().getFullYear()} SwiftSolve. All rights reserved.
        </footer>
      </Section>
    </div>
  );
}
