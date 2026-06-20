"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { NAV_LINKS, SITE } from "@/lib/site";
import { Container, ButtonLink } from "@/components/ui/primitives";
import { Logo } from "@/components/layout/logo";
import { AISearch } from "@/components/ai-search/ai-search";

export function SiteHeader({
  brand,
  phone,
  email,
}: {
  brand: string;
  phone: string;
  email: string;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50">
      {/* Top utility bar */}
      <div className="hidden bg-secondary text-white md:block">
        <Container className="flex h-9 items-center justify-between text-xs">
          <div className="flex items-center gap-5">
            <a href={`tel:${phone}`} className="hover:text-accent">
              ☎ {phone}
            </a>
            <a href={`mailto:${email}`} className="hover:text-accent">
              ✉ {email}
            </a>
          </div>
          <div className="flex items-center gap-5">
            <span className="hidden text-white/80 lg:inline">
              {SITE.tagline}
            </span>
            <Link href="/admin" className="hover:text-accent">
              Admin
            </Link>
          </div>
        </Container>
      </div>

      {/* Brand row */}
      <div className="border-b border-border bg-surface">
        <Container className="flex h-20 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <Logo size={52} priority />
            <span className="max-w-[18rem] text-sm font-bold leading-tight text-secondary sm:text-base">
              {brand}
            </span>
          </Link>

          <div className="hidden items-center gap-3 lg:flex">
            <AISearch />
            <ButtonLink href="/contact" variant="accent">
              Contact Us
            </ButtonLink>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-md text-secondary lg:hidden"
          >
            <div className="space-y-1.5">
              <span
                className={`block h-0.5 w-6 bg-current transition-transform ${
                  open ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-current transition-opacity ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-current transition-transform ${
                  open ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </Container>
      </div>

      {/* Desktop nav bar */}
      <nav className="hidden bg-primary text-white shadow-sm lg:block">
        <Container className="flex flex-wrap items-center">
          {NAV_LINKS.map((link) =>
            link.children ? (
              <div key={link.href} className="group relative">
                <Link
                  href={link.href}
                  className={`flex items-center gap-1 px-3.5 py-3 text-sm font-medium transition-colors hover:bg-primary-dark ${
                    isActive(link.href) ? "bg-primary-dark" : ""
                  }`}
                >
                  {link.label}
                  <span aria-hidden className="text-[0.6rem]">
                    ▾
                  </span>
                </Link>
                <div className="invisible absolute left-0 top-full z-50 min-w-[16rem] -translate-y-1 rounded-b-[var(--radius)] border border-border bg-surface py-2 opacity-0 shadow-lg transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={`block px-4 py-2 text-sm font-medium text-text transition-colors hover:bg-bg hover:text-primary ${
                        isActive(child.href) ? "text-primary" : ""
                      }`}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-3 text-sm font-medium transition-colors hover:bg-primary-dark ${
                  isActive(link.href) ? "bg-primary-dark" : ""
                }`}
              >
                {link.label}
              </Link>
            ),
          )}
        </Container>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-b border-border bg-surface lg:hidden"
          >
            <div className="space-y-1 px-4 py-3">
              {NAV_LINKS.map((link) => (
                <div key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`block rounded-md px-3 py-2 text-sm font-medium ${
                      isActive(link.href)
                        ? "bg-primary text-white"
                        : "text-text hover:bg-bg"
                    }`}
                  >
                    {link.label}
                  </Link>
                  {link.children && (
                    <div className="ml-3 space-y-1 border-l border-border pl-3">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setOpen(false)}
                          className={`block rounded-md px-3 py-2 text-sm ${
                            isActive(child.href)
                              ? "text-primary"
                              : "text-muted hover:bg-bg hover:text-primary"
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="mt-2">
                <AISearch className="w-full justify-center" />
              </div>
              <ButtonLink
                href="/contact"
                variant="accent"
                className="mt-2 w-full"
                onClick={() => setOpen(false)}
              >
                Contact Us
              </ButtonLink>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
