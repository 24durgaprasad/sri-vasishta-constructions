import Link from "next/link";
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
    <footer className="bg-navy-950 text-navy-200">
      <div className="shell pt-20 pb-8 lg:pt-28 lg:pb-10">
        {/* Main grid: company name + nav columns */}
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1.6fr]">
          {/* Left: Large editorial company name */}
          <div>
            <p className="eyebrow mb-4 text-brand-400">Since 2012</p>
            <h2
              className="font-display font-bold italic text-white"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
              }}
            >
              Sri Vasishta<br />Constructions
            </h2>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-navy-400">
              {site.tagline}. RERA-approved properties across Visakhapatnam.
            </p>

            {/* Social icons */}
            <ul className="mt-8 flex gap-3">
              {socials.map((social) => (
                <li key={social.id}>
                  <a
                    href="#"
                    aria-label={social.label}
                    className="grid size-10 place-items-center rounded-lg border border-navy-800 bg-navy-900 text-navy-200 transition hover:border-brand-500 hover:text-brand-400"
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-5"
                    >
                      <path d={social.path} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: nav columns grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {footerColumns.map((col) => (
              <div key={col.id}>
                <h3 className="eyebrow mb-5 text-brand-400">{col.title}</h3>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-navy-400 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Get in touch */}
            <div>
              <h3 className="eyebrow mb-5 text-brand-400">Get in touch</h3>
              <ul className="space-y-3 text-sm text-navy-400">
                {site.phones.map((phone) => (
                  <li key={phone}>
                    <a
                      href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                      className="transition-colors hover:text-white"
                    >
                      {phone}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="break-all transition-colors hover:text-white"
                  >
                    {site.email}
                  </a>
                </li>
                <li className="leading-relaxed">
                  {site.officeAddress.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </li>
                <li>
                  <a
                    href={site.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 transition-colors hover:text-white"
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-4 shrink-0"
                    >
                      <path d="M12 4a8 8 0 0 0-6.9 12l-1 3.5 3.6-1A8 8 0 1 0 12 4Zm4.5 11.3c-.2.6-1.2 1.1-1.7 1.1-.5.1-1 .2-3.2-.7-2.7-1.1-4.4-4-4.5-4.1-.1-.2-1.1-1.4-1.1-2.7 0-1.3.7-1.9 1-2.2.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .5l-.3.4-.3.3c-.1.1-.3.3-.1.6.2.3.7 1.2 1.6 2 1.1.9 1.9 1.2 2.2 1.4.3.1.4.1.6-.1l.8-1c.2-.2.3-.2.6-.1l2.1 1c.3.2.5.2.6.4.1.1.1.6-.2 1.2Z" />
                    </svg>
                    Chat on WhatsApp
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col gap-3 border-t border-navy-800 pt-6 text-xs text-navy-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>RERA No. {site.rera} · Designed and built in Visakhapatnam</p>
        </div>
      </div>
    </footer>
  );
}
