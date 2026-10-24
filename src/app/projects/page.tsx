import type { Metadata } from "next";
import { Suspense } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { ProjectGrid } from "@/components/listing/ProjectGrid";
import { EmptyInventory } from "@/components/listing/EmptyInventory";
import { FilterSelect } from "@/components/listing/FilterSelect";
import { ProjectSearchBar } from "@/components/listing/ProjectSearchBar";
import {
  matchesQuery,
  projectsInCategory,
  propertyCategories,
} from "@/lib/catalog";
import type { Project } from "@/data/types";
import { site } from "@/data/site";
import { getAllProjects, repoToProject } from "@/lib/repositories/projects";

export const revalidate = 0;

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
  const [params, repoProjects] = await Promise.all([
    (await searchParams) ?? {},
    getAllProjects(),
  ]);
  const projects = repoProjects.map(repoToProject);
  const locality = first(params.locality);
  const category = first(params.category);
  const collection = first(params.collection);
  const query = (first(params.q) ?? "").trim();

  const categoryFilter = propertyCategories.find((item) => item.id === category);
  const collectionFilter = collections.find((item) => item.param === collection);

  const results = projects.filter((project) => {
    if (locality && project.locality !== locality) return false;
    if (collectionFilter && project.collection !== collectionFilter.id) return false;
    if (categoryFilter) {
      const inCategory = projectsInCategory(categoryFilter.id).some(
        (item) => item.id === project.id,
      );
      if (!inCategory) return false;
    }
    if (query && !matchesQuery(project, query)) return false;
    return true;
  });

  const heading = collectionFilter
    ? `${collectionFilter.label} projects${locality ? ` in ${locality}` : ""}`
    : categoryFilter
      ? `${categoryFilter.label} in ${locality ?? site.city}`
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
          <Suspense>
            <ProjectSearchBar initialQuery={query} />
          </Suspense>
          <div className="mt-4 grid gap-3 sm:grid-cols-3 sm:gap-4">
            <FilterSelect
              label="Shortlist"
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
              extraParams={{ locality, category: categoryFilter?.id, q: query || undefined }}
            />

            <FilterSelect
              label="Property type"
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
              extraParams={{ locality, collection: collectionFilter?.param, q: query || undefined }}
            />

            <FilterSelect
              label="Locality"
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
                q: query || undefined,
              }}
            />
          </div>

          <div className="mt-8">
            <p className="mb-4 text-sm text-navy-500" aria-live="polite">
              {results.length} {results.length === 1 ? "project" : "projects"} found
              {query ? ` for “${query}”` : ""}
            </p>

            {results.length > 0 ? (
              <ProjectGrid projects={results} />
            ) : (
              <EmptyInventory
                title={`No projects match ${[
                  query ? `“${query}”` : "",
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
