import Link from "next/link";
import { Logo } from "./Logo";
import { footerColumns, site } from "@/data/site";

const socials = [
  {
    id: "facebook",
    label: "Facebook",
    path: "M14 8h2.5V4.5H14A3.5 3.5 0 0 0 10.5 8v2.5H8V14h2.5v6.5H14V14h2.5l.5-3.5H14V8.5A.5.5 0 0 1 14.5 8Z",
  },
  {
    id: "instagram",
    label: "Instagram",
    path: "M7.5 4h9A3.5 3.5 0 0 1 20 7.5v9a3.5 3.5 0 0 1-3.5 3.5h-9A3.5 3.5 0 0 1 4 16.5v-9A3.5 3.5 0 0 1 7.5 4Zm4.5 4.75a3.25 3.25 0 1 0 0 6.5 3.25 3.25 0 0 0 0-6.5ZM17 7h.01",
  },
  {
    id: "youtube",
    label: "YouTube",
    path: "M21 8.5a2.5 2.5 0 0 0-1.75-1.76C17.7 6.25 12 6.25 12 6.25s-5.7 0-7.25.49A2.5 2.5 0 0 0 3 8.5c-.49 1.55-.49 3.5-.49 3.5s0 1.95.49 3.5A2.5 2.5 0 0 0 4.75 17.25c1.55.49 7.25.49 7.25.49s5.7 0 7.25-.49A2.5 2.5 0 0 0 21 15.5c.49-1.55.49-3.5.49-3.5s0-1.95-.49-3.5ZM10.25 14.75v-5.5l4.5 2.75-4.5 2.75Z",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    path: "M6.94 8.5H4V20h2.94V8.5ZM5.47 4a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5ZM20 13.9c0-3.05-1.63-4.47-3.81-4.47-1.75 0-2.53.96-2.96 1.64V8.5H10.3V20h2.93v-6.1c0-1.55.29-3.05 2.21-3.05 1.9 0 1.92 1.77 1.92 3.15V20H20v-6.1Z",
  },
];

export function Footer() {
  return (
    <footer className="border-t border-navy-900 bg-navy-950 text-navy-200">
      <div className="shell pt-16 pb-10 lg:pt-20 lg:pb-12">
        {/* Main 4-column layout */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand info */}
          <div>
            <div className="[&_span]:!text-white">
              <Logo variant="onHero" />
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-navy-400">
              Sri Vasishta Constructions brings over 12+ years of excellence developing RERA-approved gated communities, luxury villas, approved plots, and commercial landmarks in Visakhapatnam.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <span className="rounded-full bg-navy-900 border border-navy-800 px-3 py-1 text-xs font-semibold text-brand-400">
                RERA: {site.rera}
              </span>
              <span className="rounded-full bg-navy-900 border border-navy-800 px-3 py-1 text-xs font-semibold text-navy-300">
                ISO Certified
              </span>
            </div>

            {/* Social icons */}
            <ul className="mt-6 flex gap-2.5">
              {socials.map((social) => (
                <li key={social.id}>
                  <a
                    href="#"
                    aria-label={social.label}
                    className="grid size-9 place-items-center rounded-lg border border-navy-800 bg-navy-900 text-navy-400 transition hover:border-brand-500 hover:text-white"
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-4"
                    >
                      <path d={social.path} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Nav column 1: Properties */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-400">
              Properties
            </h3>
            <ul className="mt-4 space-y-2.5">
              {footerColumns[0]?.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-navy-400 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Nav column 2: Services / Tools */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-400">
              Tools &amp; Services
            </h3>
            <ul className="mt-4 space-y-2.5">
              {footerColumns[1]?.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-navy-400 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info column */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-400">
              Corporate Office
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-navy-400">
              {site.phones.map((phone) => (
                <li key={phone}>
                  <a
                    href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                    className="flex items-center gap-2 font-medium text-white transition hover:text-brand-400"
                  >
                    <svg viewBox="0 0 20 20" fill="currentColor" className="size-4 text-brand-500">
                      <path d="M2 3a1 1 0 0 1 1-1h2.153a1 1 0 0 1 .986.836l.74 4.435a1 1 0 0 1-.54 1.06l-1.548.773a11.037 11.037 0 0 0 6.105 6.105l.774-1.548a1 1 0 0 1 1.059-.54l4.435.74a1 1 0 0 1 .836.986V17a1 1 0 0 1-1 1h-2C7.82 18 2 12.18 2 4V3Z"/>
                    </svg>
                    <span>{phone}</span>
                  </a>
                </li>
              ))}

              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-2 break-all text-navy-300 transition hover:text-white"
                >
                  <svg viewBox="0 0 20 20" fill="currentColor" className="size-4 shrink-0 text-navy-400">
                    <path d="M3 4a2 2 0 0 0-2 2v1.161l8.441 4.221a1.25 1.25 0 0 0 1.118 0L19 7.162V6a2 2 0 0 0-2-2H3Z"/>
                    <path d="m19 8.839-7.77 3.885a2.75 2.75 0 0 1-2.46 0L1 8.839V14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.839Z"/>
                  </svg>
                  <span>{site.email}</span>
                </a>
              </li>

              <li className="leading-relaxed text-xs text-navy-400 pt-1">
                {site.officeAddress.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </li>

              <li className="pt-2">
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-emerald-500"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
                    <path d="M12 4a8 8 0 0 0-6.9 12l-1 3.5 3.6-1A8 8 0 1 0 12 4Zm4.5 11.3c-.2.6-1.2 1.1-1.7 1.1-.5.1-1 .2-3.2-.7-2.7-1.1-4.4-4-4.5-4.1-.1-.2-1.1-1.4-1.1-2.7 0-1.3.7-1.9 1-2.2.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .5l-.3.4-.3.3c-.1.1-.3.3-.1.6.2.3.7 1.2 1.6 2 1.1.9 1.9 1.2 2.2 1.4.3.1.4.1.6-.1l.8-1c.2-.2.3-.2.6-.1l2.1 1c.3.2.5.2.6.4.1.1.1.6-.2 1.2Z" />
                  </svg>
                  Chat with Property Advisor
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="mt-14 flex flex-col gap-4 border-t border-navy-900 pt-6 text-xs text-navy-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p className="flex items-center gap-3">
            <Link href="/legal/privacy" className="hover:text-navy-300">Privacy Policy</Link>
            <span>•</span>
            <Link href="/legal/terms" className="hover:text-navy-300">Terms of Service</Link>
            <span>•</span>
            <span>RERA Registered AP00005123</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
