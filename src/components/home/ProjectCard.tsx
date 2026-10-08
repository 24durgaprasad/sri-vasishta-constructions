import Link from "next/link";
import type { Project } from "@/data/types";
import { priceRangeLabel, projectHref } from "@/lib/format";
import { CardCarousel } from "./CardCarousel";
import { FinanceBadges } from "./FinanceBadges";

export function ProjectCard({ project }: { project: Project }) {
  const href = projectHref(project.name);
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-card border border-navy-100 bg-white shadow-card transition hover:-translate-y-1 hover:shadow-card-hover">
      <div className="relative z-20 aspect-[4/3] w-full shrink-0">
        <CardCarousel
          images={project.images.slice(0, 3)}
          alt={`${project.name}, ${project.locality}`}
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
        {project.badge ? (
          <span className="absolute left-3 top-3 rounded-full bg-navy-950/85 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur-sm sm:text-[0.65rem]">
            {project.badge}
          </span>
        ) : null}
      </div>

      <div className="flex w-full min-w-0 flex-1 flex-col justify-between gap-3 bg-navy-900 p-4 text-white sm:p-5">
        <div className="min-w-0">
          <p
            className="block truncate text-lg font-semibold leading-tight group-hover:text-brand-400"
            title={project.name}
          >
            {project.name}
          </p>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-navy-300">
            <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="size-4 shrink-0">
              <path d="M10 18s6-5.5 6-9.5A6 6 0 0 0 4 8.5C4 12.5 10 18 10 18Z" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="10" cy="8.5" r="2" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <span className="min-w-0 truncate">
              {project.locality}, {project.city}
            </span>
          </p>

          <div className="mt-2.5">
            <p className="text-[11px] uppercase tracking-wider text-navy-400">
              Available
            </p>
            <div className="mt-1 flex flex-wrap items-center gap-1.5">
              <ul className="flex flex-wrap gap-1.5">
                {project.bhks.slice(0, 3).map((bhk) => (
                  <li
                    key={bhk}
                    className="whitespace-nowrap rounded-md border border-navy-700 px-2 py-0.5 text-xs font-medium text-navy-200"
                  >
                    {bhk}
                  </li>
                ))}
                {project.bhks.length > 3 ? (
                  <li className="whitespace-nowrap rounded-md border border-navy-700 px-2 py-0.5 text-xs font-medium text-navy-400">
                    +{project.bhks.length - 3}
                  </li>
                ) : null}
              </ul>
              <FinanceBadges tone="outline-navy" />
            </div>
          </div>

          <div className="mt-2.5">
            <p className="text-[11px] uppercase tracking-wider text-navy-400">
              Price range
            </p>
            <p className="mt-0.5 whitespace-nowrap text-base font-bold text-brand-400">
              {priceRangeLabel(project.priceMin, project.priceMax)}
            </p>
          </div>
        </div>

        <span className="inline-flex min-h-11 items-center justify-center rounded-full border border-navy-600 px-4 py-2 text-center text-sm font-semibold text-navy-100 transition group-hover:border-brand-400 group-hover:text-brand-400">
          View details
        </span>
      </div>
      <Link
        href={href}
        className="absolute inset-0 z-10"
        aria-label={`View details for ${project.name}, ${project.locality}`}
      />
    </article>
  );
}