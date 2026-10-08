import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { banks, interiorPartners } from "@/data/partners";
import type { Partner } from "@/data/types";
import { site } from "@/data/site";

type Page = {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  intro: string;
  benefits: { title: string; body: string }[];
  partners: Partner[];
  ctaTitle: string;
  ctaBody: string;
  ctaHref: string;
  ctaLabel: string;
};

const pages: Page[] = [
  {
    slug: "banks",
    eyebrow: "Partners",
    title: "Home loan partners",
    description: `Compare offers from ${banks.length} banks and housing finance companies we work with in Visakhapatnam.`,
    intro: `We file loan applications with multiple lenders so you can compare sanctioned offers rather than taking the first one. Your credit assessment, fee sheet and pre-payment terms are shared in writing before you commit.`,
    benefits: [
      {
        title: "Faster file movement",
        body: "Our team already knows what each lender needs, so paperwork goes in complete the first time.",
      },
      {
        title: "Rate comparison",
        body: "Interest rate, processing fee, pre-payment charges and insurance are compared side by side.",
      },
      {
        title: "Tie-up on the project",
        body: "Approved projects are pre-verified by the lender, which shortens sanction timelines for buyers.",
      },
    ],
    partners: banks,
    ctaTitle: "Need a loan estimate?",
    ctaBody: "Run your numbers first, then we will connect you with the lender that fits.",
    ctaHref: "/tools/eligibility",
    ctaLabel: "Check eligibility",
  },
  {
    slug: "interiors",
    eyebrow: "Partners",
    title: "Interior design partners",
    description: `${interiorPartners.length} interior brands we work with for turn-key interiors, from modular kitchens to full fit-outs.`,
    intro: `Handover does not have to mean a second construction cycle. These brands supply our projects regularly, so layouts, service lines and society rules are already known before they quote.`,
    benefits: [
      {
        title: "Familiar with our plans",
        body: "They have worked in these buildings, so measurements and services are already known.",
      },
      {
        title: "Scoped quotations",
        body: "Material brands, work warranty and timelines are written into the quote, not promised verbally.",
      },
      {
        title: "Coordinated handover",
        body: "Fit-out work can be scheduled with possession so you are not paying rent and EMI together.",
      },
    ],
    partners: interiorPartners,
    ctaTitle: "Planning interiors for a new flat?",
    ctaBody: "Share your configuration and budget and we will connect you with two brands.",
    ctaHref: "/contact",
    ctaLabel: "Get introductions",
  },
];

export function generateStaticParams() {
  return pages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = pages.find((item) => item.slug === slug);
  if (!page) return { title: "Partner page not found" };

  return {
    title: `${page.title} | ${site.name}`,
    description: page.description,
  };
}

export default async function PartnerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = pages.find((item) => item.slug === slug);
  if (!page) notFound();

  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow={page.eyebrow}
          title={page.title}
          description={page.description}
          parent={{ label: "Partners", href: "/partners/banks" }}
        />

        <section className="shell py-10 lg:py-14">
          <p className="max-w-3xl text-base leading-relaxed text-navy-600">
            {page.intro}
          </p>

          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {page.benefits.map((benefit) => (
              <li
                key={benefit.title}
                className="rounded-card border border-navy-100 bg-white p-5 shadow-card"
              >
                <h2 className="text-base font-semibold text-navy-900">
                  {benefit.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-navy-600">
                  {benefit.body}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <h2 className="text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl">
              {page.slug === "banks"
                ? "Lending partners"
                : "Interior brands we work with"}
            </h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {page.partners.map((partner) => (
                <li
                  key={partner.id}
                  id={partner.id}
                  className="flex scroll-mt-28 items-center gap-4 rounded-card border border-navy-100 bg-white p-5 shadow-card"
                >
                  {partner.logoSrc ? (
                    <span className="grid h-14 w-28 shrink-0 place-items-center rounded-xl border border-navy-100 bg-white p-2">
                      <Image
                        src={partner.logoSrc}
                        alt={`${partner.name} logo`}
                        width={96}
                        height={40}
                        className="h-9 w-auto max-w-[88px] object-contain"
                      />
                    </span>
                  ) : (
                    <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-navy-950 text-xs font-bold tracking-wide text-brand-400">
                      {partner.logo}
                    </span>
                  )}
                  <span className="text-sm font-semibold text-navy-900">
                    {partner.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 rounded-card-lg bg-navy-950 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white">{page.ctaTitle}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-navy-300">
              {page.ctaBody}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href={page.ctaHref} className="btn-primary">
                {page.ctaLabel}
              </Link>
              <Link
                href="/contact"
                className="btn-outline border-navy-700 bg-transparent text-white hover:border-brand-400 hover:bg-white/5"
              >
                Talk to us
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
