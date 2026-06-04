"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useHeroInView } from "@/components/HeroInView";

const links = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#portfolio" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { navScrim } = useHeroInView();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8, ease }}
        className="fixed inset-x-0 top-0 z-50 pt-[max(0.75rem,env(safe-area-inset-top))] pb-3 md:pb-4"
      >
        {navScrim > 0 && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 border-b border-white/[0.06] bg-black/40 backdrop-blur-md"
            style={{ opacity: navScrim }}
          />
        )}
        <div className="relative z-10 flex h-14 items-center justify-between px-4 sm:px-6 md:h-16 md:px-12">
          <a
            href="#"
            className="logo-wordmark shrink-0 text-lg font-semibold leading-none tracking-tight transition-opacity duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:opacity-80 md:text-xl"
            onClick={() => setOpen(false)}
          >
            SwiftSolve
          </a>

          <ul className="hidden items-center gap-8 sm:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="type-caption text-muted transition-colors hover:text-accent"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-muted transition hover:bg-white/5 hover:text-foreground sm:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm sm:hidden"
            onClick={() => setOpen(false)}
          >
            <motion.nav
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease }}
              className="flex min-h-full flex-col items-center justify-center gap-2 px-6 pb-[env(safe-area-inset-bottom)] pt-24"
              onClick={(event) => event.stopPropagation()}
            >
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="type-headline w-full max-w-xs rounded-2xl px-4 py-4 text-center text-foreground transition hover:bg-white/5"
                >
                  {link.label}
                </a>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
