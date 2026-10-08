import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `Rent a home in ${site.city} | ${site.name}`,
  description:
    "Tell us your rental requirement and our team will share verified rental homes, floors and commercial spaces across Visakhapatnam.",
};

const points = [
  {
    title: "Verified listings only",
    body: "Every rental option is checked with the owner or society before it reaches you.",
  },
  {
    title: "Matches within a day",
    body: "Share budget, locality and configuration and we send shortlists that actually fit.",
  },
  {
    title: "Help with paperwork",
    body: "Rental agreement, deposit norms and police verification guidance included.",
  },
];

export default function RentPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="For tenants"
          title="Rent a home in Visakhapatnam"
          description="Rental inventory moves fast and is shared directly with people who ask. Tell us what you need and our team sends matching homes, floors and commercial spaces."
        />

        <section className="shell py-10 lg:py-14">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl">
                How rental shortlists work
              </h2>
              <ol className="mt-6 space-y-5">
                {points.map((point, index) => (
                  <li
                    key={point.title}
                    className="flex gap-4 rounded-card border border-navy-100 bg-white p-5 shadow-card"
                  >
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand-500 text-sm font-bold text-navy-950">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-navy-900">
                        {point.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-navy-600">
                        {point.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="mt-6 rounded-card-lg bg-navy-950 p-6">
                <p className="text-sm font-semibold text-white">
                  Prefer to talk first?
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-navy-300">
                  Call{" "}
                  {site.phones.map((phone, index) => (
                    <span key={phone}>
                      {index > 0 ? " or " : ""}
                      <a
                        href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                        className="font-semibold text-white hover:underline"
                      >
                        {phone}
                      </a>
                    </span>
                  ))}{" "}
                  between 9:30 am and 7:00 pm, or chat on WhatsApp, and we
                  will note your requirement.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {site.phones.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                      className="btn-primary"
                    >
                      Call {phone}
                    </a>
                  ))}
                  <a
                    href={site.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-outline border-navy-700 bg-transparent text-white hover:border-brand-400 hover:bg-white/5"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>

            <div>
              <ContactForm
                topic="rent"
                title="Tell us your rental requirement"
                description="Locality, budget and configuration — we reply with shortlists on the same working day."
                submitLabel="Send requirement"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
