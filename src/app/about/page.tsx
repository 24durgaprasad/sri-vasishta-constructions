import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { projects } from "@/data/projects";
import { localities } from "@/data/localities";
import { banks, interiorPartners } from "@/data/partners";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `About ${site.name} | Build Your Dreams`,
  description: `${site.name} builds RERA-approved apartments, villas, plots and commercial spaces across Visakhapatnam.`,
};

const facts = [
  { label: "Projects delivered and ongoing", value: `${projects.length}` },
  { label: "Localities we build in", value: `${localities.length}` },
  { label: "Lending partners", value: `${banks.length}` },
  { label: "Interior partners", value: `${interiorPartners.length}` },
];

const values = [
  {
    title: "Pricing you can verify",
    body: "The price on this site is the price in the rate sheet. No festival-discount theatre, no hidden floor-rise surprises at the last counter.",
  },
  {
    title: "Approvals before marketing",
    body: "We launch a project only after RERA registration and the approvals are in place, and we show them to you before asking for a rupee.",
  },
  {
    title: "Handover we stand behind",
    body: "Construction updates, snag lists and possession timelines are shared openly, and our team stays on the file after handover too.",
  },
];

const milestones = [
  {
    period: "Early years",
    title: "Built on referred homes",
    body: "Started with independent houses and row homes for families who came back with neighbours.",
  },
  {
    period: "Expansion",
    title: "Apartments across the city",
    body: "Gated apartment communities followed in Madhurawada, MVP Colony, Yendada and Gajuwaka.",
  },
  {
    period: "Today",
    title: "Residential and commercial",
    body: `Now ${projects.length} projects spanning homes, approved plots and commercial floors, with ${banks.length} lending partners for buyers.`,
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="About us"
          title={`${site.name} — ${site.tagline}`}
          description="A Visakhapatnam builder that grew on referred homes: RERA-approved apartments, villas, plots and commercial spaces, delivered with paperwork in order."
        >
          <div className="flex flex-wrap gap-3">
            <Link href="/projects" className="btn-primary">
              See our projects
            </Link>
            <Link
              href="/contact"
              className="btn-outline border-white/30 bg-transparent text-white hover:border-white/60 hover:bg-white/10"
            >
              Meet the team
            </Link>
          </div>
        </PageHero>

        <section className="shell py-10 lg:py-14">
          <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {facts.map((fact) => (
              <div
                key={fact.label}
                className="rounded-card border border-navy-100 bg-white p-5 shadow-card"
              >
                <dt className="text-xs font-semibold uppercase tracking-wider text-navy-500">
                  {fact.label}
                </dt>
                <dd className="mt-2 text-3xl font-bold text-navy-900">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl">
                How we work
              </h2>
              <p className="mt-4 text-base leading-relaxed text-navy-600">
                {site.name} is based in {site.address}. Every project listed on
                this site carries a RERA number and a rate sheet you can ask for
                before you visit, so the first conversation is about the home
                rather than the discount.
              </p>
              <p className="mt-4 text-base leading-relaxed text-navy-600">
                Sales, approvals and construction sit in one team, which is why
                answers about possession dates and specifications come from the
                people actually building it. Buyers who need a loan are
                introduced to our {banks.length} lending partners, and owners who
                want interiors are connected to {interiorPartners.length} studios
                we work with regularly.
              </p>

              <div className="mt-8 rounded-card-lg bg-navy-950 p-6 sm:p-8">
                <h2 className="text-lg font-bold text-white">
                  RERA registered
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-navy-300">
                  RERA No. {site.rera}. Approval copies, the sanctioned plan and
                  the development agreement are available at our sales office for
                  every listed project.
                </p>
                <Link href="/contact" className="btn-primary mt-5">
                  Request documents
                </Link>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl">
                What we hold ourselves to
              </h2>
              <ul className="mt-6 space-y-4">
                {values.map((value) => (
                  <li
                    key={value.title}
                    className="rounded-card border border-navy-100 bg-white p-5 shadow-card"
                  >
                    <h3 className="text-base font-semibold text-navy-900">
                      {value.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-navy-600">
                      {value.body}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="border-y border-navy-100 bg-navy-50 py-14">
          <div className="shell">
            <h2 className="text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl">
              The road so far
            </h2>
            <ol className="mt-8 grid gap-5 md:grid-cols-3">
              {milestones.map((milestone) => (
                <li
                  key={milestone.period}
                  className="rounded-card border border-navy-100 bg-white p-6 shadow-card"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-800">
                    {milestone.period}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-navy-900">
                    {milestone.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-600">
                    {milestone.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
