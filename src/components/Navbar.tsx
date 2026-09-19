"use client";

import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/resorts", label: "Resorts" },
  { href: "/map", label: "Map" },
  { href: "/accommodation", label: "Accommodation" },
  { href: "/planner", label: "Trip Planner" },
  { href: "/forums", label: "Forums" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink-soft bg-ink/95 backdrop-blur supports-[backdrop-filter]:bg-ink/85">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="flex items-baseline gap-2" onClick={() => setOpen(false)}>
          <span className="font-display text-xl tracking-wide text-paper">
            SUMMIT<span className="text-gold">HOUSE</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm tracking-wide text-paper/80 transition hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/planner"
            className="rounded-full border border-gold px-4 py-2 text-sm tracking-wide text-gold transition hover:bg-gold hover:text-ink"
          >
            Start Planning
          </Link>
        </nav>

        <button
          className="text-paper md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-ink-soft px-5 pb-4 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded px-2 py-3 text-sm text-paper/85 hover:bg-ink-soft hover:text-gold"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/planner"
            className="mt-2 rounded-full border border-gold px-4 py-2 text-center text-sm text-gold"
            onClick={() => setOpen(false)}
          >
            Start Planning
          </Link>
        </nav>
      )}
    </header>
  );
}
