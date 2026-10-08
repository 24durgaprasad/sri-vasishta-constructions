import Link from "next/link";
import type { Project } from "@/data/types";
import { priceRangeLabel, projectHref } from "@/lib/format";
import { CardCarousel } from "./CardCarousel";
import { FinanceBadges } from "./FinanceBadges";

export function InvestmentCard({ project }: { project: Project }) {
  const href = projectHref(project.name);
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-card border border-navy-100 bg-white shadow-card transition hover:-translate-y-0.5 hover:shadow-card-hover sm:flex-row">
      <div className="relative z-20 h-44 w-full shrink-0 sm:h-auto sm:min-h-56 sm:w-[38%]">
        <div className="relative h-full w-full">
          <CardCarousel
            images={project.images.slice(0, 3)}
            alt={`${project.name}, ${project.locality}`}
            sizes="(max-width: 640px) 85vw, (max-width: 1024px) 40vw, 30vw"
          />
        </div>
      </div>

      <div className="flex w-full min-w-0 flex-1 flex-col justify-center gap-2.5 p-4 sm:w-[62%] sm:p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="min-w-0 flex-1 truncate text-base font-semibold leading-tight text-navy-900" title={project.name}>
            {project.name}
          </h3>
          {project.badge ? (
            <span className="shrink-0 rounded-full bg-brand-100 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-brand-800 sm:text-[0.65rem]">
              {project.badge}
            </span>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-navy-500">
          <span className="flex min-w-0 items-center gap-1.5">
            <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="size-3.5 shrink-0">
              <path d="M10 18s6-5.5 6-9.5A6 6 0 0 0 4 8.5C4 12.5 10 18 10 18Z" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="10" cy="8.5" r="2" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <span className="truncate">{project.locality}</span>
          </span>
          <span className="flex shrink-0 items-center gap-1.5">
            {project.bhks.slice(0, 3).map((bhk) => (
              <span key={bhk} className="whitespace-nowrap font-medium text-navy-700">
                {bhk}
              </span>
            ))}
            {project.bhks.length > 3 ? (
              <span className="whitespace-nowrap font-medium text-navy-500">
                +{project.bhks.length - 3}
              </span>
            ) : null}
          </span>
        </div>

        <div className="flex items-center justify-between gap-2">
          <p className="whitespace-nowrap text-[15px] font-bold text-navy-900">
            {priceRangeLabel(project.priceMin, project.priceMax)}
          </p>
          <span className="inline-flex min-h-11 shrink-0 items-center text-xs font-semibold text-brand-700 transition group-hover:text-brand-800">
            View details
          </span>
        </div>
        <FinanceBadges tone="light-inline" />
      </div>
      <Link
        href={href}
        className="absolute inset-0 z-10"
        aria-label={`View details for ${project.name}, ${project.locality}`}
      />
    </article>
  );
}