import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { ProjectGrid } from "@/components/listing/ProjectGrid";
import { EmptyInventory } from "@/components/listing/EmptyInventory";
import { FilterSelect } from "@/components/listing/FilterSelect";
import { projects, projectsInCategory, propertyCategories } from "@/lib/catalog";
import { localities } from "@/data/localities";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `Properties in ${site.city} | ${site.name}`,
  description:
    "Browse flats, houses, villas, plots and commercial properties by type and locality from Sri Vasishta Constructions.",
};

type SearchParams = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

const first = (value: string | string[] | undefined): string | undefined =>
  Array.isArray(value) ? value[0] : value;

export default async function PropertiesPage({ searchParams }: SearchParams) {
  const params = (await searchParams) ?? {};
  const locality = first(params.locality);

  const results = locality
    ? projects.filter((project) => project.locality === locality)
    : [];

  const cities = Array.from(new Set(localities.map((item) => item.city)));

  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="Properties"
          title={locality ? `Properties in ${locality}` : "Find your property type"}
          description={
            locality
              ? `Current inventory in ${locality}${cities[0] ? `, ${cities[0]}` : ""}. Switch locality or property type below.`
              : "Start with the kind of home or investment you want, then narrow it down by locality."
          }
        >
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
            <FilterSelect
              variant="onDark"
              label="Filter by property type"
              items={[
                { label: "All", href: "/properties", active: false },
                ...propertyCategories.map((item) => ({
                  label: item.label,
                  href: item.href,
                  active: false,
                })),
              ]}
              extraParams={{}}
            />
            <FilterSelect
              variant="onDark"
              label="Filter by locality"
              items={[
                {
                  label: "All localities",
                  href: "/properties",
                  active: !locality,
                  params: { locality: undefined },
                },
                ...localities.map((item) => ({
                  label: item.name,
                  href: "/properties",
                  active: locality === item.name,
                  params: { locality: item.name },
                })),
              ]}
              extraParams={{}}
            />
          </div>
        </PageHero>

        {locality ? (
          <section className="shell py-10 lg:py-14">
            <p className="mb-4 text-sm text-navy-500" aria-live="polite">
              {results.length} {results.length === 1 ? "project" : "projects"} in{" "}
              {locality}
            </p>
            {results.length > 0 ? (
              <ProjectGrid projects={results} />
            ) : (
              <EmptyInventory
                title={`Nothing listed in ${locality} right now`}
                body="Share your budget and requirement and our team will alert you when inventory opens in this locality."
              />
            )}
          </section>
        ) : (
          <section className="shell py-10 lg:py-14">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {propertyCategories.map((category) => {
                const count = projectsInCategory(category.id).length;

                return (
                  <Link
                    key={category.id}
                    href={category.href}
                    className="group flex flex-col justify-between rounded-card border border-navy-100 bg-white p-6 shadow-card transition hover:-translate-y-1 hover:border-brand-300 hover:shadow-card-hover"
                  >
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-brand-800">
                        {count} {count === 1 ? "project" : "projects"}
                      </p>
                      <h2 className="mt-2 text-xl font-bold text-navy-900 group-hover:text-brand-700">
                        {category.label}
                      </h2>
                      <p className="mt-2 text-sm leading-relaxed text-navy-600">
                        {category.description}
                      </p>
                    </div>
                    <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-800 transition group-hover:text-brand-600">
                      View {category.label.toLowerCase()}
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 20 20"
                        fill="none"
                        className="size-4 transition-transform group-hover:translate-x-0.5"
                      >
                        <path
                          d="M4 10h12m-4.5-4.5L16 10l-4.5 4.5"
                          stroke="currentColor"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
