"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import AnimatedLogo from "@/components/AnimatedLogo";
import AboutSection from "@/components/AboutSection";
import HeroScrollLayer from "@/components/HeroScrollLayer";
import Navbar from "@/components/Navbar";
import Portfolio from "@/components/Portfolio";
import ScrollIndicator from "@/components/ScrollIndicator";
import Section from "@/components/Section";
import Services from "@/components/Services";
import HeroBackground from "@/components/HeroBackground";
import {
  ScrollStagger,
  ScrollStaggerItem,
} from "@/components/ScrollReveal";

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
        <div className="flex flex-col items-center gap-2">
          <AnimatedLogo />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="type-body max-w-xl px-1 text-pretty text-center font-light text-white/50 sm:px-0"
          >
            We design and ship intelligent products, pairing production-grade AI
            with interfaces people actually want to use.
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.35, duration: 0.6 }}
          className="flex w-full max-w-sm flex-col gap-3 px-2 sm:max-w-none sm:w-auto sm:flex-row sm:gap-4 sm:px-0"
        >
          <a
            href="#contact"
            className="type-caption flex min-h-11 items-center justify-center rounded-full bg-white px-6 py-2.5 font-medium text-black transition hover:bg-white/90"
          >
            Start a project
          </a>
          <a
            href="#portfolio"
            className="type-caption flex min-h-11 items-center justify-center rounded-full border border-white/15 px-6 py-2.5 font-medium text-white/70 transition hover:border-white/30 hover:text-white"
          >
            View our work
          </a>
        </motion.div>
      </HeroScrollLayer>

      <Section
        id="about"
        className="snap-section dark-gradient-alt flex flex-col items-center justify-center px-4 py-14 md:px-12 md:py-0"
      >
        <AboutSection />
      </Section>

      <Section
        id="portfolio"
        className="snap-section dark-gradient-portfolio flex flex-col items-center justify-center px-4 py-14 md:px-12 md:py-0"
      >
        <Portfolio />
      </Section>

      <Section
        id="services"
        className="snap-section dark-gradient-alt flex flex-col items-center justify-center px-4 py-14 md:px-12 md:py-0"
      >
        <Services />
      </Section>

      <Section
        id="contact"
        className="snap-section dark-gradient flex flex-col justify-center px-4 py-14 pb-[max(4rem,env(safe-area-inset-bottom))] md:min-h-[100dvh] md:px-12 md:py-0"
      >
        <div className="flex w-full flex-col items-center md:flex-1 md:justify-center">
          <div className="max-w-2xl text-center">
            <ScrollStagger stagger={0.12}>
              <ScrollStaggerItem>
                <p className="type-label mb-4 text-accent">
                  Contact
                </p>
              </ScrollStaggerItem>
              <ScrollStaggerItem>
                <h2 className="type-headline mb-6">
                  Tell us what you&apos;re building.
                </h2>
              </ScrollStaggerItem>
              <ScrollStaggerItem>
                <p className="type-body mb-4 text-muted">
                  Whether you&apos;re validating a concept, refining an AI product
                  experience, or scaling technical infrastructure, we&apos;re ready
                  to discuss scope, approach, and timeline.
                </p>
                <p className="type-body mb-10 text-muted">
                  Typical engagements span product UI, intelligent application
                  design, and end-to-end ML systems.
                </p>
              </ScrollStaggerItem>
              <ScrollStaggerItem>
                <a
                  href="mailto:hello@swiftsolve.com"
                  className="type-caption inline-flex min-h-11 w-full max-w-xs items-center justify-center gap-2 rounded-full bg-accent px-8 py-3.5 font-medium text-black transition-all hover:brightness-110 sm:w-auto"
                >
                  <Mail className="h-4 w-4" strokeWidth={2} />
                  Get in touch
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
