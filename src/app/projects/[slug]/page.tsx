import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SectionHeader } from "@/components/home/SectionHeader";
import { ProjectHero } from "@/components/project/ProjectHero";
import { AnchorNav, type AnchorSection } from "@/components/project/AnchorNav";
import { KeyFacts } from "@/components/project/KeyFacts";
import { PriceTable } from "@/components/project/PriceTable";
import { FloorPlanExplorer } from "@/components/project/FloorPlanExplorer";
import { AmenityGrid } from "@/components/project/AmenityGrid";
import { LocalityBlock } from "@/components/project/LocalityBlock";
import { FaqList } from "@/components/project/FaqList";
import { EnquiryForm } from "@/components/project/EnquiryForm";
import { NearbyProjects } from "@/components/project/NearbyProjects";
import { PhotoGallery } from "@/components/project/PhotoGallery";
import { BrochureCard } from "@/components/project/BrochureCard";
import { SpecsAccordion } from "@/components/project/SpecsAccordion";
import { RatingsReviews } from "@/components/project/RatingsReviews";
import { QaSection } from "@/components/project/QaSection";
import { site } from "@/data/site";
import { EmiCalculator } from "@/components/project/EmiCalculator";
import { projects } from "@/data/projects";
import { getProjectDetail } from "@/data/projectDetails";
import { priceRangeLabel, slugify } from "@/lib/format";

type Params = { params: Promise<{ slug: string }> };

const findBySlug = (slug: string) =>
  projects.find(
    (project) => project.id === slug || slugify(project.name) === slug,
  );

export function generateStaticParams() {
  return [
    ...projects.map((project) => ({ slug: slugify(project.name) })),
    ...projects.map((project) => ({ slug: project.id })),
  ];
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = findBySlug(slug);
  if (!project) {
    return { title: "Project not found" };
  }

  const detail = getProjectDetail(project.id);

  return {
    title: `${project.name} in ${project.locality}, ${project.city} | Price, Floor Plan & Amenities`,
    description: `${project.name} by ${detail.developer} in ${project.locality}. ${project.bhks.join(", ")} from ${priceRangeLabel(project.priceMin, project.priceMax)}, ${detail.carpetMin} to ${detail.carpetMax} sq.ft. RERA ${detail.reraId}.`,
    openGraph: {
      title: `${project.name} | ${project.locality}`,
      description: `${project.bhks.join(", ")} from ${priceRangeLabel(project.priceMin, project.priceMax)}. RERA approved.`,
      images: [{ url: project.images[0] }],
    },
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = findBySlug(slug);
  if (!project) {
    notFound();
  }

  const detail = getProjectDetail(project.id);
  const hasGallery = (detail.gallery ?? []).length >= 2;
  const hasSpecs = (detail.specifications ?? []).length > 0;
  const hasRatings =
    Boolean(detail.ratings) || (detail.reviews ?? []).length > 0;
  const hasBrochure = Boolean(detail.brochureUrl);

  const navSections: AnchorSection[] = [
    { id: "overview", label: "Overview" },
    ...(hasGallery ? [{ id: "photos", label: "Photos" }] : []),
    { id: "highlights", label: "Highlights" },
    { id: "configurations", label: "Price" },
    { id: "floor-plans", label: "Floor Plans" },
    ...(hasSpecs ? [{ id: "specifications", label: "Specs" }] : []),
    { id: "amenities", label: "Amenities" },
    { id: "locality", label: "Locality" },
    ...(hasRatings ? [{ id: "ratings", label: "Reviews" }] : []),
    ...(hasBrochure ? [{ id: "brochure", label: "Brochure" }] : []),
    { id: "calculator", label: "Calculator" },
    { id: "qa", label: "Q&A" },
    { id: "faq", label: "FAQs" },
    { id: "enquiry", label: "Enquire" },
  ];

  const sameLocality = projects.filter(
    (item) => item.id !== project.id && item.locality === project.locality,
  );
  const nearby = (
    sameLocality.length > 0
      ? sameLocality
      : projects.filter(
          (item) => item.id !== project.id && item.city === project.city,
        )
  ).slice(0, 3);

  return (
    <>
      <Header forceSolid />
      <main>
        <ProjectHero project={project} detail={detail} />
        <AnchorNav sections={navSections} />

        <section id="overview" className="shell scroll-mt-28 py-8 sm:py-10">
          <SectionHeader
            eyebrow="Overview"
            title={`More about ${project.name}`}
          />
          <p className="max-w-3xl text-base leading-relaxed text-navy-600">
            {detail.about}
          </p>
          <div className="mt-6">
            <KeyFacts project={project} detail={detail} />
          </div>
        </section>

        {hasGallery ? (
          <section id="photos" className="shell scroll-mt-28 py-8 sm:py-10">
            <SectionHeader
              eyebrow="Photos"
              title={`${project.name} photos`}
            />
            <PhotoGallery
              projectName={project.name}
              locality={project.locality}
              images={detail.gallery ?? []}
            />
          </section>
        ) : null}

        <section id="highlights" className="scroll-mt-28 border-y border-navy-100 bg-navy-50 py-8 sm:py-10">
          <div className="shell">
            <SectionHeader eyebrow="Highlights" title="What sets it apart" />
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {detail.highlights.slice(0, 4).map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-card border border-navy-100 bg-white p-4 shadow-card"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="mt-0.5 size-5 shrink-0 text-brand-500"
                  >
                    <path
                      d="M10 2.5 12 7l4.5.5-3.25 3.25.9 4.75L10 13.25 5.85 15.5l.9-4.75L3.5 7.5 8 7l2-4.5Z"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-sm text-navy-800">{item}</span>
                </li>
              ))}
            </ul>
            {detail.highlights.length > 4 ? (
              <details className="group mt-3">
                <summary className="inline-flex min-h-11 cursor-pointer list-none items-center rounded-full border border-navy-200 bg-white px-5 py-2.5 text-sm font-semibold text-navy-800 transition hover:border-navy-300 [&::-webkit-details-marker]:hidden">
                  <span className="group-open:hidden">
                    Show all {detail.highlights.length} highlights
                  </span>
                  <span className="hidden group-open:inline">Show fewer</span>
                </summary>
                <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {detail.highlights.slice(4).map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 rounded-card border border-navy-100 bg-white p-4 shadow-card"
                    >
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 20 20"
                        fill="none"
                        className="mt-0.5 size-5 shrink-0 text-brand-500"
                      >
                        <path
                          d="M10 2.5 12 7l4.5.5-3.25 3.25.9 4.75L10 13.25 5.85 15.5l.9-4.75L3.5 7.5 8 7l2-4.5Z"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="text-sm text-navy-800">{item}</span>
                    </li>
                  ))}
                </ul>
              </details>
            ) : null}
          </div>
        </section>

        <section id="configurations" className="shell scroll-mt-28 py-8 sm:py-10">
          <SectionHeader
            eyebrow="Price & Configuration"
            title="Available configurations"
          />
          <PriceTable configurations={detail.configurations} />
        </section>

        <section
          id="floor-plans"
          className="scroll-mt-28 border-y border-navy-100 bg-navy-50 py-8 sm:py-10"
        >
          <div className="shell">
            <SectionHeader
              eyebrow="Floor Plans"
              title="Indicative layout for each configuration"
              description="Schematic room layouts derived from configuration and typical proportions. Select a configuration to change the plan."
            />
            <FloorPlanExplorer floorPlans={detail.floorPlans} />
          </div>
        </section>

        {hasSpecs ? (
          <section id="specifications" className="shell scroll-mt-28 py-8 sm:py-10">
            <SectionHeader
              eyebrow="Specifications"
              title={`${project.name} specifications`}
              description="Materials and finishes used across the home."
            />
            <SpecsAccordion groups={detail.specifications ?? []} />
          </section>
        ) : null}

        <section id="amenities" className="shell scroll-mt-28 py-8 sm:py-10">
          <SectionHeader
            eyebrow="Amenities"
            title={`Amenities at ${project.name}`}
          />
          <AmenityGrid amenities={detail.amenities} />
        </section>

        <section
          id="locality"
          className="scroll-mt-28 border-y border-navy-100 bg-navy-50 py-8 sm:py-10"
        >
          <div className="shell">
            <SectionHeader
              eyebrow="Locality"
              title={`${project.locality} rates and connectivity`}
            />
            <LocalityBlock project={project} detail={detail} />
          </div>
        </section>

        {hasRatings ? (
          <section
            id="ratings"
            className="scroll-mt-28 border-y border-navy-100 bg-navy-50 py-8 sm:py-10"
          >
            <div className="shell">
              <SectionHeader
                eyebrow="Ratings & Reviews"
                title={`${project.name} ratings and reviews`}
              />
              <RatingsReviews
                projectName={project.name}
                locality={project.locality}
                ratings={detail.ratings}
                reviews={detail.reviews}
              />
            </div>
          </section>
        ) : null}

        {hasBrochure ? (
          <section id="brochure" className="shell scroll-mt-28 py-8 sm:py-10">
            <SectionHeader
              eyebrow="Brochure"
              title={`${project.name} official brochure`}
            />
            <BrochureCard
              projectName={project.name}
              brochureUrl={detail.brochureUrl}
              brochurePreview={detail.brochurePreview}
            />
          </section>
        ) : null}

        <section id="calculator" className="shell scroll-mt-28 py-8 sm:py-10">
          <SectionHeader
            eyebrow="Calculator"
            title="Home loan EMI calculator"
            description="Adjust the loan amount, interest rate and tenure to estimate your monthly EMI."
          />
          <EmiCalculator project={project} />
        </section>

        <section id="qa" className="shell scroll-mt-28 py-8 sm:py-10">
          <SectionHeader
            eyebrow="Q&A"
            title={`Questions about ${project.name}`}
          />
          <QaSection project={project} items={detail.qa} />
        </section>

        <section id="faq" className="shell scroll-mt-28 py-8 sm:py-10">
          <SectionHeader
            eyebrow="FAQs"
            title="Frequently asked questions"
          />
          <FaqList items={detail.faq} />
        </section>

        <section
          id="enquiry"
          className="shell scroll-mt-28 pb-12 pt-0 sm:pb-14"
        >
          <EnquiryForm project={project} />
        </section>

        {nearby.length > 0 ? (
          <section className="border-t border-navy-100 bg-navy-50 py-8 sm:py-10">
            <div className="shell mb-5">
              <SectionHeader
                eyebrow="More projects"
                title={
                  sameLocality.length > 0
                    ? `Also available in ${project.locality}`
                    : `More projects in ${project.city}`
                }
              />
            </div>
            <NearbyProjects projects={nearby} />
          </section>
        ) : null}
      </main>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-navy-100 bg-white/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2.5 backdrop-blur-md lg:hidden">
        <div className="flex gap-2.5">
          <a href={site.phoneHref} className="btn-outline min-h-11 flex-1">
            Call sales
          </a>
          <a href="#enquiry" className="btn-primary min-h-11 flex-1">
            Contact Developer
          </a>
        </div>
      </div>
      <div className="h-20 lg:hidden" aria-hidden="true" />
      <Footer />
    </>
  );
}