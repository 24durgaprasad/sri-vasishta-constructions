import Link from "next/link";
import type { Project } from "@/data/types";
import { priceRangeLabel, projectHref } from "@/lib/format";
import { CardCarousel } from "./CardCarousel";

export function HighlightCard({ project }: { project: Project }) {
  return (
    <article className="group relative h-full min-h-[460px] overflow-hidden rounded-2xl bg-navy-950 shadow-md transition-all duration-300 hover:shadow-2xl">
      {/* Background image slider */}
      <div className="absolute inset-0 h-full w-full">
        <CardCarousel
          images={project.images.slice(0, 4)}
          alt={`${project.name}, ${project.locality}`}
          sizes="(max-width: 640px) 100vw, 50vw"
        />
      </div>

      {/* Dark gradient overlay for text readability */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />

      {/* Top badges */}
      <div className="pointer-events-none absolute left-4 top-4 z-30 flex flex-wrap gap-2">
        {project.badge && (
          <span className="rounded-full bg-brand-500 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-sm">
            {project.badge}
          </span>
        )}
        <span className="rounded-full bg-navy-900/80 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
          Signature Living
        </span>
      </div>

      <Link
        href={projectHref(project.name)}
        className="absolute inset-0 z-10"
        aria-label={`View details for ${project.name}, ${project.locality}`}
      />

      {/* Bottom info bar */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 p-6 sm:p-7">
        <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand-400">
          <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="size-3.5 shrink-0">
            <path
              d="M10 18s6-5.5 6-9.5A6 6 0 0 0 4 8.5C4 12.5 10 18 10 18Z"
              stroke="currentColor"
              strokeWidth="1.75"
            />
            <circle cx="10" cy="8.5" r="2" stroke="currentColor" strokeWidth="1.75" />
          </svg>
          <span>{project.locality}, {project.city}</span>
        </div>

        <h3 className="mt-1 text-2xl font-bold text-white transition-colors group-hover:text-brand-300 sm:text-3xl">
          {project.name}
        </h3>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          {project.bhks.map((bhk) => (
            <span
              key={bhk}
              className="rounded-md bg-white/15 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm"
            >
              {bhk}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-end justify-between border-t border-white/15 pt-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-navy-300">
              Price Range
            </p>
            <p className="text-xl font-extrabold text-white sm:text-2xl">
              {priceRangeLabel(project.priceMin, project.priceMax)}
            </p>
          </div>

          <span className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-navy-950 transition-all duration-300 group-hover:bg-brand-500 group-hover:text-white">
            <span>Explore</span>
            <svg viewBox="0 0 20 20" fill="none" className="size-3.5">
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
    </article>
  );
}
