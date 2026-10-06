import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { ProjectGrid } from "@/components/listing/ProjectGrid";
import { EmptyInventory } from "@/components/listing/EmptyInventory";
import { ListingFilters } from "@/components/listing/ListingFilters";
import {
  categoryMeta,
  projectsInCategory,
  propertyCategories,
  type PropertyCategory,
} from "@/lib/catalog";
import { site } from "@/data/site";

const categories = propertyCategories.map((item) => item.id);

type Params = { params: Promise<{ type: string }> };

export function generateStaticParams() {
  return categories.map((type) => ({ type }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { type } = await params;
  if (!categories.includes(type as PropertyCategory)) {
    return { title: "Property type not found" };
  }

  const meta = categoryMeta(type as PropertyCategory);
  return {
    title: `${meta.label} in ${site.address.split(",")[0]} | ${meta.description} | ${site.name}`,
    description: `${meta.description}. Browse every ${meta.label.toLowerCase()} project from ${site.name} with current pricing.`,
  };
}

export default async function PropertyTypePage({ params }: Params) {
  const { type } = await params;
  if (!categories.includes(type as PropertyCategory)) {
    notFound();
  }

  const meta = categoryMeta(type as PropertyCategory);
  const results = projectsInCategory(meta.id);

  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="Properties"
          title={`${meta.label} in ${site.address.split(",")[0]}`}
          description={meta.description}
          parent={{ label: "Properties", href: "/properties" }}
        >
          <ListingFilters
            label="Switch property type"
            items={propertyCategories.map((item) => ({
              label: item.label,
              href: item.href,
              active: item.id === meta.id,
            }))}
          />
        </PageHero>

        <section className="shell py-10 lg:py-14">
          {results.length > 0 ? (
            <>
              <p className="mb-4 text-sm text-navy-500" aria-live="polite">
                {results.length} {results.length === 1 ? "project" : "projects"}{" "}
                available
              </p>
              <ProjectGrid projects={results} />
            </>
          ) : (
            <EmptyInventory
              title={`No ${meta.label.toLowerCase()} listed right now`}
              body={`We do not have ${meta.label.toLowerCase()} inventory open at the moment. Register your interest and our team will call you as soon as something matching is released.`}
              primaryLabel="Register your interest"
            />
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
