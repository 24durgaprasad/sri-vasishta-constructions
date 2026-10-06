import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `Contact ${site.name} | Visakhapatnam`,
  description:
    `Call, WhatsApp or write to ${site.name} in ${site.address} for flats, villas, plots and commercial properties.`,
};

const channels = [
  {
    label: "Phone",
    value: site.phone,
    href: `tel:${site.phone.replace(/[^\d+]/g, "")}`,
    note: "9:30 am – 7:00 pm, all days",
  },
  {
    label: "WhatsApp",
    value: "Chat with our sales team",
    href: site.whatsapp,
    note: "Replies during office hours",
  },
  {
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    note: "For documentation and approvals",
  },
];

const offices = [
  {
    title: "Sales office",
    lines: [site.address, "RERA No. " + site.rera],
  },
  {
    title: "Site visits",
    lines: [
      "Every project, by appointment",
      "Weekdays 10 am – 6 pm · Weekends 10 am – 7 pm",
    ],
  },
];

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="Contact"
          title="Talk to our team"
          description="Questions about pricing, availability, loans or a site visit — reach us on any channel below and we will get back the same working day."
        />

        <section className="shell py-10 lg:py-14">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
            <div>
              <ul className="grid gap-4 sm:grid-cols-2">
                {channels.map((channel) => (
                  <li
                    key={channel.label}
                    className="rounded-card border border-navy-100 bg-white p-5 shadow-card"
                  >
                    <p className="text-xs font-semibold uppercase tracking-wider text-brand-800">
                      {channel.label}
                    </p>
                    <a
                      href={channel.href}
                      {...(channel.href.startsWith("http")
                        ? { target: "_blank", rel: "noreferrer" }
                        : {})}
                      className="mt-2 block text-base font-semibold text-navy-900 transition hover:text-brand-600"
                    >
                      {channel.value}
                    </a>
                    <p className="mt-1 text-sm text-navy-500">{channel.note}</p>
                  </li>
                ))}

                {offices.map((office) => (
                  <li
                    key={office.title}
                    className="rounded-card border border-navy-100 bg-navy-50 p-5"
                  >
                    <p className="text-xs font-semibold uppercase tracking-wider text-navy-500">
                      {office.title}
                    </p>
                    <ul className="mt-2 space-y-1">
                      {office.lines.map((line) => (
                        <li key={line} className="text-sm text-navy-700">
                          {line}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>

              <div className="mt-6 rounded-card-lg bg-navy-950 p-6">
                <h2 className="text-lg font-bold text-white">
                  Before you visit
                </h2>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-navy-300">
                  <li>
                    &middot; Carry a photo ID for site entry registration.
                  </li>
                  <li>
                    &middot; Rate sheet, approval copies and RERA certificate are
                    shown on request.
                  </li>
                  <li>
                    &middot; EMI and eligibility estimates are available on the
                    spot.
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <ContactForm
                topic="contact"
                title="Send us a message"
                description="Tell us the project, configuration and budget you have in mind and we will send current availability."
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
