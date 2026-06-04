"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useHeroInView } from "@/components/HeroInView";

const links = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#portfolio" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { visible: isHeroInView } = useHeroInView();
  const wasHeroInView = useRef(false);
  const hasLeftHero = useRef(false);
  const [entranceKey, setEntranceKey] = useState(0);

  const navHidden = { opacity: 0, y: -16 };
  const navVisible = { opacity: 1, y: 0 };

  useEffect(() => {
    if (!isHeroInView && wasHeroInView.current) {
      hasLeftHero.current = true;
    }
    if (isHeroInView && hasLeftHero.current) {
      setEntranceKey((key) => key + 1);
    }
    wasHeroInView.current = isHeroInView;
  }, [isHeroInView]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.nav
        key={entranceKey}
        initial={navHidden}
        animate={navVisible}
        transition={{ duration: 0.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-black/40 backdrop-blur-md pt-[max(0.75rem,env(safe-area-inset-top))]"
      >
        <div className="flex items-center justify-between px-4 py-3 sm:px-6 md:px-12 md:py-4">
          <a
            href="#"
            className="type-caption font-semibold tracking-tight transition-opacity hover:opacity-80 logo-wordmark"
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
            className="flex h-11 w-11 items-center justify-center rounded-full text-muted transition hover:bg-white/5 hover:text-foreground sm:hidden"
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
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
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
