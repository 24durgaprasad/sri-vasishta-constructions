"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";
import { NavDropdown } from "./NavDropdown";
import { navGroups } from "@/data/nav";
import { site } from "@/data/site";

export function Header() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenId(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const openGroup = useCallback(
    (id: string) => {
      cancelClose();
      setOpenId(id);
    },
    [cancelClose],
  );

  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpenId(null), 150);
  }, [cancelClose]);

  useEffect(() => cancelClose, [cancelClose]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-navy-100 bg-white/95 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="shell flex h-18 items-center justify-between gap-4 py-3">
          <a href="/" aria-label={site.name} className="shrink-0">
            <Logo variant={scrolled ? "solid" : "onHero"} />
          </a>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navGroups.map((group) => (
                <li key={group.id}>
                  <NavDropdown
                    group={group}
                    isOpen={openId === group.id}
                    onOpen={() => openGroup(group.id)}
                    onClose={scheduleClose}
                    onItemClick={() => setOpenId(null)}
                    onHero={!scrolled}
                  />
                </li>
              ))}
              <li>
                <a
                  href="/projects"
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    scrolled
                      ? "text-navy-700 hover:bg-navy-50 hover:text-navy-900"
                      : "text-white/85 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    scrolled
                      ? "text-navy-700 hover:bg-navy-50 hover:text-navy-900"
                      : "text-white/85 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  About
                </a>
              </li>
            </ul>
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={`tel:${site.phone.replace(/[^\d+]/g, "")}`}
              className={`text-sm font-semibold transition ${
                scrolled
                  ? "text-navy-800 hover:text-brand-600"
                  : "text-white hover:text-brand-300"
              }`}
            >
              {site.phone}
            </a>
            <a
              href="/contact"
              className={
                scrolled
                  ? "btn-primary"
                  : "inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-navy-900 transition hover:bg-brand-400"
              }
            >
              Book a visit
            </a>
          </div>

          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((value) => !value)}
            className={`grid size-11 place-items-center rounded-xl border transition lg:hidden ${
              scrolled
                ? "border-navy-200 bg-white text-navy-900"
                : "border-white/30 bg-navy-950/40 text-white backdrop-blur-sm"
            }`}
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-6">
              {mobileOpen ? (
                <path
                  d="M6 6l12 12M18 6 6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </header>

      {mobileOpen ? (
        <div className="fixed inset-0 z-40 overflow-y-auto bg-white pt-24 lg:hidden">
          <div className="shell space-y-6 pb-10">
            <ul className="space-y-1 border-b border-navy-100 pb-4">
              {[
                { label: "All projects", href: "/projects" },
                { label: "Buy", href: "/buy" },
                { label: "Rent", href: "/rent" },
                { label: "About us", href: "/about" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-base font-semibold text-navy-900 transition hover:bg-navy-50"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {navGroups.map((group) => (
              <details key={group.id} className="border-b border-navy-100 pb-4">
                <summary className="flex cursor-pointer items-center justify-between py-3 text-base font-semibold text-navy-900">
                  {group.label}
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="size-5 text-navy-500"
                  >
                    <path
                      d="m5 7.5 5 5 5-5"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </summary>
                <ul className="mt-2 space-y-1">
                  {group.items.map((item) => (
                    <li key={`${group.id}-${item.href}`}>
                      <a
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="block rounded-lg px-3 py-2.5 text-sm font-medium text-navy-700 transition hover:bg-navy-50"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </details>
            ))}

            <div className="space-y-3 pt-2">
              <a
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="btn-primary w-full"
              >
                Book a visit
              </a>
              <a
                href={`tel:${site.phone.replace(/[^\d+]/g, "")}`}
                className="btn-outline w-full"
              >
                {site.phone}
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}