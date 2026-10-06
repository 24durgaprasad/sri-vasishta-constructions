import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { ProjectGrid } from "@/components/listing/ProjectGrid";
import { EmptyInventory } from "@/components/listing/EmptyInventory";
import {
  isSearchIntent,
  intentLabel,
  searchProjects,
} from "@/lib/catalog";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `Search properties | ${site.name}`,
  description:
    "Search flats, villas, plots and commercial projects by locality, configuration and budget.",
};

type SearchParams = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

const one = (value: string | string[] | undefined): string =>
  Array.isArray(value) ? (value[0] ?? "") : (value ?? "");

const many = (value: string | string[] | undefined): string[] =>
  Array.isArray(value) ? value : value ? [value] : [];

export default async function SearchPage({ searchParams }: SearchParams) {
  const params = (await searchParams) ?? {};
  const query = one(params.q).trim();
  const rawIntent = one(params.intent);
  const intent = isSearchIntent(rawIntent) ? rawIntent : "buy";
  const chips = many(params.chip)
    .map((chip) => chip.trim())
    .filter(Boolean);

  const results = searchProjects({ query, intent, chips });

  const criteria = [
    query ? `“${query}”` : "all listings",
    intentLabel[intent],
    ...chips,
  ].join(" · ");

  const clearHref = `/search?intent=${intent}${query ? `&q=${encodeURIComponent(query)}` : ""}`;

  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="Search"
          title={
            query
              ? `Results for “${query}”`
              : `Browsing ${intentLabel[intent]} listings`
          }
          description={`${results.length} ${results.length === 1 ? "match" : "matches"} · ${criteria}`}
        >
          <div className="flex flex-wrap items-center gap-2">
            {chips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white backdrop-blur-sm"
              >
                {chip}
              </span>
            ))}
            <Link
              href="/search"
              className="rounded-full border border-white/40 px-3.5 py-1.5 text-xs font-medium text-white transition hover:bg-white/10"
            >
              Clear search
            </Link>
          </div>
        </PageHero>

        <section className="shell py-10 lg:py-14">
          {intent === "rent" ? (
            <div className="rounded-card-lg border border-navy-100 bg-navy-50 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-navy-900">
                Rental inventory is shared directly
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-navy-600">
                Rental homes, floors and commercial spaces turn over quickly, so
                we send them to people who ask rather than publishing them here.
                Tell us your locality, budget and configuration and our team
                replies with shortlists the same working day.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/rent" className="btn-primary">
                  Share your requirement
                </Link>
                <Link href="/buy" className="btn-outline">
                  Or browse homes for sale
                </Link>
              </div>
            </div>
          ) : results.length > 0 ? (
            <ProjectGrid projects={results} />
          ) : (
            <EmptyInventory
              title="No projects match that search"
              body="Try a different locality or configuration, or tell us what you are after and we will send options as they open."
              primaryHref={clearHref}
              primaryLabel="Clear filters"
            />
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
