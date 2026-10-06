import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { ProjectGrid } from "@/components/listing/ProjectGrid";
import { EmptyInventory } from "@/components/listing/EmptyInventory";
import { ListingFilters } from "@/components/listing/ListingFilters";
import {
  projects,
  projectsInCategory,
  propertyCategories,
} from "@/lib/catalog";
import type { Project } from "@/data/types";
import { site } from "@/data/site";

const collections: { param: string; label: string; id: Project["collection"] }[] = [
  { param: "highlighted", label: "Highlighted", id: "highlighted" },
  { param: "investment", label: "Investment", id: "highDemand" },
  { param: "top-picks", label: "Top picks", id: "topPicks" },
];

export const metadata: Metadata = {
  title: `All projects in ${site.name} | Flats, Villas, Plots & Commercial`,
  description:
    "Browse every RERA-approved project from Sri Vasishta Constructions across Visakhapatnam, filtered by property type and locality.",
};

type SearchParams = { searchParams?: Promise<Record<string, string | string[] | undefined>> };

const first = (value: string | string[] | undefined): string | undefined =>
  Array.isArray(value) ? value[0] : value;

export default async function ProjectsPage({ searchParams }: SearchParams) {
  const params = (await searchParams) ?? {};
  const locality = first(params.locality);
  const category = first(params.category);
  const collection = first(params.collection);

  const categoryFilter = propertyCategories.find((item) => item.id === category);
  const collectionFilter = collections.find((item) => item.param === collection);

  const results = projects.filter((project) => {
    if (locality && project.locality !== locality) return false;
    if (collectionFilter && project.collection !== collectionFilter.id) return false;
    if (categoryFilter) {
      return projectsInCategory(categoryFilter.id).some(
        (item) => item.id === project.id,
      );
    }
    return true;
  });

  const heading = collectionFilter
    ? `${collectionFilter.label} projects${locality ? ` in ${locality}` : ""}`
    : categoryFilter
      ? `${categoryFilter.label} in ${locality ?? site.address.split(",")[0]}`
      : locality
        ? `Projects in ${locality}`
        : "All projects";

  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="Projects"
          title={heading}
          description={
            collectionFilter
              ? `Our ${collectionFilter.label.toLowerCase()} shortlist — the projects buyers are asking for right now.`
              : categoryFilter?.description ??
                "Every apartment, villa, plot and commercial project we currently offer in Visakhapatnam, with live pricing and floor plans."
          }
        />

        <section className="shell py-10 lg:py-14">
          <div className="flex flex-col gap-6">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-navy-500">
                Shortlist
              </p>
              <ListingFilters
                label="Filter by shortlist"
                items={[
                  {
                    label: "Everything",
                    href: "/projects",
                    active: !collectionFilter,
                    params: { collection: undefined },
                  },
                  ...collections.map((item) => ({
                    label: item.label,
                    href: "/projects",
                    active: collectionFilter?.param === item.param,
                    params: { collection: item.param },
                  })),
                ]}
                extraParams={{ locality, category: categoryFilter?.id }}
              />
            </div>

            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-navy-500">
                Property type
              </p>
              <ListingFilters
                label="Filter by property type"
                items={[
                  {
                    label: "All projects",
                    href: "/projects",
                    active: !categoryFilter,
                    params: { category: undefined },
                  },
                  ...propertyCategories.map((item) => ({
                    label: item.label,
                    href: "/projects",
                    active: categoryFilter?.id === item.id,
                    params: { category: item.id },
                  })),
                ]}
                extraParams={{ locality, collection: collectionFilter?.param }}
              />
            </div>

            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-navy-500">
                Locality
              </p>
              <ListingFilters
                label="Filter by locality"
                items={[
                  {
                    label: "All localities",
                    href: "/projects",
                    active: !locality,
                    params: { locality: undefined },
                  },
                  ...Array.from(
                    new Set(projects.map((project) => project.locality)),
                  )
                    .sort()
                    .map((name) => ({
                      label: name,
                      href: "/projects",
                      active: locality === name,
                      params: { locality: name },
                    })),
                ]}
                extraParams={{
                  category: categoryFilter?.id,
                  collection: collectionFilter?.param,
                }}
              />
            </div>
          </div>

          <div className="mt-8">
            <p className="mb-4 text-sm text-navy-500" aria-live="polite">
              {results.length} {results.length === 1 ? "project" : "projects"} found
            </p>

            {results.length > 0 ? (
              <ProjectGrid projects={results} />
            ) : (
              <EmptyInventory
                title={`No projects match ${[
                  collectionFilter?.label,
                  categoryFilter?.label,
                  locality,
                ]
                  .filter(Boolean)
                  .join(", ")}`}
                body="We rotate inventory through the year. Tell us what you are looking for and our team will share matching options as they open."
              />
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
