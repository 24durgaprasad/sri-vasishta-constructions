import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { ProjectGrid } from "@/components/listing/ProjectGrid";
import { ListingFilters } from "@/components/listing/ListingFilters";
import { isCommercial, projects, propertyCategories } from "@/lib/catalog";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `Buy flats, villas and plots in ${site.address.split(",")[0]} | ${site.name}`,
  description:
    "Buy RERA-approved flats, villas, plots and houses from Sri Vasishta Constructions with transparent pricing and clean handover.",
};

const steps = [
  {
    title: "Tell us your budget",
    body: "Share your budget, configuration and preferred locality so we only show what fits.",
  },
  {
    title: "Shortlist and visit",
    body: "We arrange site visits on weekdays and weekends, with the actual rate sheet in hand.",
  },
  {
    title: "Book with clear paperwork",
    body: "RERA IDs, approval copies and the agreement draft are shared before any payment.",
  },
];

export default function BuyPage() {
  const residential = projects.filter((project) => !isCommercial(project));

  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="For buyers"
          title="Buy a home in Visakhapatnam"
          description="RERA-approved apartments, houses, villas and plots from Sri Vasishta Constructions, with honest pricing and no surprise charges at handover."
        >
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/projects" className="btn-primary">
              Browse all projects
            </Link>
            <Link href="/contact" className="btn-outline border-white/30 bg-transparent text-white hover:border-white/60 hover:bg-white/10">
              Book a site visit
            </Link>
          </div>
        </PageHero>

        <section className="shell py-10 lg:py-14">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-800">
                Ready to move in and under construction
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl">
                Homes you can buy today
              </h2>
            </div>
            <p className="text-sm text-navy-500">
              {residential.length} projects listed
            </p>
          </div>

          <div className="mt-6">
            <ListingFilters
              label="Property type"
              items={[
                { label: "All homes", href: "/buy", active: true },
                ...propertyCategories
                  .filter((item) => item.id !== "commercial")
                  .map((item) => ({ label: item.label, href: item.href })),
              ]}
            />
          </div>

          <div className="mt-8">
            <ProjectGrid projects={residential} />
          </div>
        </section>

        <section className="border-y border-navy-100 bg-navy-50 py-14">
          <div className="shell">
            <h2 className="text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl">
              How buying with us works
            </h2>
            <ol className="mt-8 grid gap-5 sm:grid-cols-3">
              {steps.map((step, index) => (
                <li
                  key={step.title}
                  className="rounded-card border border-navy-100 bg-white p-6 shadow-card"
                >
                  <span className="grid size-9 place-items-center rounded-full bg-brand-500 text-sm font-bold text-navy-950">
                    {index + 1}
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-navy-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-600">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>

            <div className="mt-10 rounded-card-lg bg-navy-950 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-white">
                Buying with a home loan?
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-navy-300">
                We work with major banks and housing finance companies, so your
                loan file moves faster. Check your numbers before you shortlist.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/tools/emi-calculator" className="btn-primary">
                  EMI calculator
                </Link>
                <Link
                  href="/tools/eligibility"
                  className="btn-outline border-navy-700 bg-transparent text-white hover:border-brand-400 hover:bg-white/5"
                >
                  Loan eligibility
                </Link>
                <Link href="/partners/banks" className="btn-outline border-navy-700 bg-transparent text-white hover:border-brand-400 hover:bg-white/5">
                  Our lending partners
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
