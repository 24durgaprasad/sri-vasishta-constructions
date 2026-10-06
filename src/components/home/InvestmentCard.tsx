import Link from "next/link";
import type { Project } from "@/data/types";
import { priceRangeLabel, projectHref } from "@/lib/format";
import { CardCarousel } from "./CardCarousel";

export function InvestmentCard({ project }: { project: Project }) {
  return (
    <article className="group flex h-full overflow-hidden rounded-card border border-navy-100 bg-white shadow-card transition hover:-translate-y-0.5 hover:shadow-card-hover">
      <div className="relative w-[30%] shrink-0">
        <div className="relative h-full min-h-40 w-full">
          <CardCarousel
            images={project.images.slice(0, 3)}
            alt={`${project.name}, ${project.locality}`}
            sizes="30vw"
          />
        </div>
      </div>

      <div className="flex w-[70%] flex-col justify-center gap-2.5 p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold leading-tight text-navy-900">
            {project.name}
          </h3>
          {project.badge ? (
            <span className="shrink-0 rounded-full bg-brand-100 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-brand-800">
              {project.badge}
            </span>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-navy-500">
          <span className="flex items-center gap-1.5">
            <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="size-3.5">
              <path d="M10 18s6-5.5 6-9.5A6 6 0 0 0 4 8.5C4 12.5 10 18 10 18Z" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="10" cy="8.5" r="2" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            {project.locality}
          </span>
          <span className="flex flex-wrap gap-1.5">
            {project.bhks.map((bhk) => (
              <span key={bhk} className="font-medium text-navy-700">
                {bhk}
              </span>
            ))}
          </span>
        </div>

        <div className="flex items-baseline justify-between gap-3">
          <p className="text-sm font-bold text-navy-900">
            {priceRangeLabel(project.priceMin, project.priceMax)}
          </p>
          <Link
            href={projectHref(project.name)}
            className="text-xs font-semibold text-brand-700 transition group-hover:text-brand-800"
          >
            View details
          </Link>
        </div>
      </div>
    </article>
  );
}