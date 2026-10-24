import Link from "next/link";
import type { Project } from "@/data/types";
import { priceRangeLabel, projectHref } from "@/lib/format";
import { CardCarousel } from "./CardCarousel";

export function ProjectCard({ project }: { project: Project }) {
  const href = projectHref(project.name);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Property Image & Slider */}
      <div className="relative z-20 aspect-[16/11] w-full shrink-0 overflow-hidden bg-navy-50">
        <CardCarousel
          images={project.images.slice(0, 4)}
          alt={`${project.name}, ${project.locality}`}
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />

        {/* Status / Feature Badges */}
        <div className="pointer-events-none absolute left-3 top-3 z-30 flex flex-wrap gap-1.5">
          {project.badge ? (
            <span className="rounded-full bg-brand-500 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm">
              {project.badge}
            </span>
          ) : (
            <span className="rounded-full bg-navy-900/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
              Verified
            </span>
          )}
        </div>

        <div className="pointer-events-none absolute right-3 top-3 z-30">
          <span className="rounded-full bg-navy-950/75 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
            {project.city}
          </span>
        </div>
      </div>

      {/* Property Info */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          {/* Locality */}
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand-600">
            <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="size-3.5 shrink-0">
              <path
                d="M10 18s6-5.5 6-9.5A6 6 0 0 0 4 8.5C4 12.5 10 18 10 18Z"
                stroke="currentColor"
                strokeWidth="1.75"
              />
              <circle cx="10" cy="8.5" r="2" stroke="currentColor" strokeWidth="1.75" />
            </svg>
            <span className="truncate">{project.locality}</span>
          </div>

          {/* Title */}
          <h3
            className="mt-1.5 truncate text-lg font-bold text-navy-950 transition-colors group-hover:text-brand-600"
            title={project.name}
          >
            {project.name}
          </h3>

          {/* Key Specs */}
          <div className="mt-3.5 flex flex-wrap items-center gap-2 border-y border-navy-100/80 py-3 text-xs text-navy-600">
            {/* BHK pills */}
            <div className="flex items-center gap-1.5 font-medium">
              <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="size-4 text-navy-400">
                <path
                  d="M3 13V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v5M3 15h14M6 10h8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <span>{project.bhks.join(", ")}</span>
            </div>

            <span className="text-navy-300">•</span>

            <div className="flex items-center gap-1 text-navy-500">
              <span className="rounded bg-navy-50 px-2 py-0.5 font-medium text-navy-700">
                Loan Available
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Price & Action */}
        <div className="mt-4 flex items-center justify-between pt-1">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-navy-400">
              Price Range
            </p>
            <p className="text-lg font-extrabold text-navy-950 sm:text-xl">
              {priceRangeLabel(project.priceMin, project.priceMax)}
            </p>
          </div>

          <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-navy-50 text-navy-800 transition-all duration-300 group-hover:bg-brand-500 group-hover:text-white group-hover:shadow-md">
            <svg viewBox="0 0 20 20" fill="none" className="size-4">
              <path
                d="M4 10h12m-4.5-4.5L16 10l-4.5 4.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>

      <Link
        href={href}
        className="absolute inset-0 z-10"
        aria-label={`View details for ${project.name}, ${project.locality}`}
      />
    </article>
  );
}
