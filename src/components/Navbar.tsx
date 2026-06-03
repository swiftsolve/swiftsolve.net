"use client";

import { motion } from "framer-motion";

const links = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#portfolio" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 border-b border-white/[0.06] bg-black/20 backdrop-blur-md"
    >
      <a
        href="#"
        className="type-caption font-semibold tracking-tight transition-opacity hover:opacity-80 logo-wordmark"
      >
        SwiftSolve
      </a>
      <ul className="hidden sm:flex items-center gap-8">
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
    </motion.nav>
  );
}
