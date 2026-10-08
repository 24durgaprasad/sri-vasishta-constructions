"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";
import { NavDropdown } from "./NavDropdown";
import { navGroups } from "@/data/nav";
import { site } from "@/data/site";

export function Header({ forceSolid = false }: { forceSolid?: boolean }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(forceSolid);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (forceSolid) {
      setScrolled(true);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [forceSolid]);

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

  const solid = scrolled || mobileOpen || forceSolid;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          solid
            ? "border-b border-navy-100 bg-white/95 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="shell flex h-18 items-center justify-between gap-4 py-3">
          <a
            href="/"
            aria-label={site.name}
            className="flex min-h-11 shrink-0 items-center sm:min-h-0"
          >
            <Logo variant={solid ? "solid" : "onHero"} />
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
                    onHero={!solid}
                  />
                </li>
              ))}
              <li>
                <a
                  href="/projects"
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    solid
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
                    solid
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
            <div
              className="relative"
              onPointerEnter={() => openGroup("phones")}
              onPointerLeave={scheduleClose}
            >
              <button
                type="button"
                aria-haspopup="true"
                aria-expanded={openId === "phones"}
                aria-label={`Call us: ${site.phones.join(" or ")}`}
                onClick={() =>
                  openId === "phones" ? scheduleClose() : openGroup("phones")
                }
                onKeyDown={(event) => {
                  if (event.key === "ArrowDown" || event.key === "Enter") {
                    event.preventDefault();
                    openGroup("phones");
                  }
                  if (event.key === "Escape") {
                    scheduleClose();
                  }
                }}
                className={`flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold transition ${
                  solid
                    ? "text-navy-800 hover:bg-navy-50 hover:text-brand-600"
                    : "text-white hover:bg-white/10 hover:text-brand-300"
                }`}
              >
                <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="size-4">
                  <path
                    d="M4 4h3l1.5 4-2 1.5a9 9 0 0 0 4 4l1.5-2 4 1.5v3a1 1 0 0 1-1.1 1A12 12 0 0 1 3 5.1 1 1 0 0 1 4 4Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>
                {site.phone}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  fill="none"
                  className={`size-4 transition-transform duration-200 ${
                    openId === "phones" ? "rotate-180" : ""
                  }`}
                >
                  <path
                    d="m5 7.5 5 5 5-5"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {openId === "phones" ? (
                <div
                  role="menu"
                  aria-label="Call us"
                  className="absolute right-0 top-full z-50 w-72 pt-3"
                >
                  <div className="overflow-hidden rounded-2xl border border-navy-100 bg-white p-2 shadow-card-hover">
                    <ul className="space-y-0.5">
                      {site.phones.map((phone) => (
                        <li key={phone}>
                          <a
                            href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                            role="menuitem"
                            onClick={() => setOpenId(null)}
                            className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition hover:bg-navy-50"
                          >
                            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-navy-900 text-white transition group-hover:bg-brand-500 group-hover:text-navy-950">
                              <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="size-4">
                                <path
                                  d="M4 4h3l1.5 4-2 1.5a9 9 0 0 0 4 4l1.5-2 4 1.5v3a1 1 0 0 1-1.1 1A12 12 0 0 1 3 5.1 1 1 0 0 1 4 4Z"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                            <span className="min-w-0">
                              <span className="block text-sm font-semibold text-navy-900">
                                {phone}
                              </span>
                              <span className="block text-xs text-navy-500">
                                9:30 am – 7:00 pm, all days
                              </span>
                            </span>
                          </a>
                        </li>
                      ))}
                      <li>
                        <a
                          href={site.whatsapp}
                          target="_blank"
                          rel="noreferrer"
                          role="menuitem"
                          onClick={() => setOpenId(null)}
                          className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition hover:bg-navy-50"
                        >
                          <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-navy-900 text-white transition group-hover:bg-brand-500 group-hover:text-navy-950">
                            <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="size-4">
                              <path d="M12 4a8 8 0 0 0-6.9 12l-1 3.5 3.6-1A8 8 0 1 0 12 4Zm4.5 11.3c-.2.6-1.2 1.1-1.7 1.1-.5.1-1 .2-3.2-.7-2.7-1.1-4.4-4-4.5-4.1-.1-.2-1.1-1.4-1.1-2.7 0-1.3.7-1.9 1-2.2.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .5l-.3.4-.3.3c-.1.1-.3.3-.1.6.2.3.7 1.2 1.6 2 1.1.9 1.9 1.2 2.2 1.4.3.1.4.1.6-.1l.8-1c.2-.2.3-.2.6-.1l2.1 1c.3.2.5.2.6.4.1.1.1.6-.2 1.2Z" />
                            </svg>
                          </span>
                          <span className="min-w-0">
                            <span className="block text-sm font-semibold text-navy-900">
                              Chat on WhatsApp
                            </span>
                            <span className="block text-xs text-navy-500">
                              Replies during office hours
                            </span>
                          </span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              ) : null}
            </div>
            <a
              href="/contact"
              className={
                solid
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
              solid
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
              {site.phones.map((phone) => (
                <a
                  key={phone}
                  href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                  onClick={() => setMobileOpen(false)}
                  className="btn-outline w-full"
                >
                  {phone}
                </a>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}