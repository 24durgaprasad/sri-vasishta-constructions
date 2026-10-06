import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `Careers at ${site.name} | Visakhapatnam`,
  description:
    "Open roles and applications at Sri Vasishta Constructions — sales, approvals, site engineering and customer experience.",
};

const tracks = [
  {
    title: "Sales and advisory",
    body: "Site visits, customer follow-up and honest advice on configurations. Comfort with data and a steady follow-through matter more than years in real estate.",
  },
  {
    title: "Site engineering",
    body: "Day-to-day execution with our contractors, quality checks and progress reporting from the site office.",
  },
  {
    title: "Approvals and documentation",
    body: "RERA filings, municipal approvals and buyer documentation — detail-oriented work that keeps projects on schedule.",
  },
  {
    title: "Customer experience",
    body: "Handover coordination, snag tracking and post-possession support for owners who buy from us.",
  },
];

const process = [
  "Send an application with a short note on what you have worked on.",
  "A call with the team lead for the track you applied to.",
  "A work sample or site walk-through, depending on the role.",
  "Offer, with location, timings and CTC confirmed in writing.",
];

export default function CareersPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="Careers"
          title="Work with us in Visakhapatnam"
          description="We hire in small teams and promote from within. There are no open roles listed at the moment — send an application and we will keep it on file."
        />

        <section className="shell py-10 lg:py-14">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl">
                Where we hire
              </h2>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {tracks.map((track) => (
                  <li
                    key={track.title}
                    className="rounded-card border border-navy-100 bg-white p-5 shadow-card"
                  >
                    <h3 className="text-base font-semibold text-navy-900">
                      {track.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-navy-600">
                      {track.body}
                    </p>
                  </li>
                ))}
              </ul>

              <div className="mt-8 rounded-card-lg border border-navy-100 bg-navy-50 p-6 sm:p-8">
                <h2 className="text-lg font-bold text-navy-900">
                  How hiring works
                </h2>
                <ol className="mt-4 space-y-3">
                  {process.map((step, index) => (
                    <li key={step} className="flex gap-3 text-sm text-navy-700">
                      <span className="grid size-6 shrink-0 place-items-center rounded-full bg-navy-900 text-xs font-bold text-white">
                        {index + 1}
                      </span>
                      <span className="leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-6 rounded-card-lg bg-navy-950 p-6">
                <p className="text-sm leading-relaxed text-navy-300">
                  Questions about a role? Write to{" "}
                  <a
                    href={`mailto:${site.email}`}
                    className="font-semibold text-brand-400 hover:underline"
                  >
                    {site.email}
                  </a>{" "}
                  or call {site.phone}.
                </p>
              </div>
            </div>

            <div>
              <ContactForm
                topic="career"
                title="Send an application"
                description="Tell us which track interests you and what you have worked on before. We reply to every serious application."
                submitLabel="Apply"
                messageLabel="About you"
                messagePlaceholder="The track you want, what you have worked on, and how to reach you."
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
