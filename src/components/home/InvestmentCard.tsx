import Link from "next/link";
import type { Project } from "@/data/types";
import { priceRangeLabel, projectHref } from "@/lib/format";
import { CardCarousel } from "./CardCarousel";

export function InvestmentCard({ project }: { project: Project }) {
  const href = projectHref(project.name);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:flex-row">
      {/* Left/Top Image Carousel */}
      <div className="relative z-20 aspect-[16/10] w-full shrink-0 bg-navy-50 sm:aspect-auto sm:w-[42%]">
        <div className="relative h-full w-full min-h-[220px]">
          <CardCarousel
            images={project.images.slice(0, 3)}
            alt={`${project.name}, ${project.locality}`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 45vw, 30vw"
          />
        </div>

        {/* Investment badge */}
        <span className="pointer-events-none absolute left-3 top-3 z-30 rounded-full bg-brand-500 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm">
          High ROI
        </span>
      </div>

      {/* Right/Bottom Content */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <div className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand-600">
              <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="size-3.5 shrink-0">
                <path
                  d="M10 18s6-5.5 6-9.5A6 6 0 0 0 4 8.5C4 12.5 10 18 10 18Z"
                  stroke="currentColor"
                  strokeWidth="1.75"
                />
                <circle cx="10" cy="8.5" r="2" stroke="currentColor" strokeWidth="1.75" />
              </svg>
              <span className="truncate">{project.locality}</span>
            </span>

            {project.badge && (
              <span className="rounded-full bg-navy-50 px-2.5 py-0.5 text-[11px] font-semibold text-navy-700">
                {project.badge}
              </span>
            )}
          </div>

          <h3
            className="mt-2 text-lg font-bold text-navy-950 transition-colors group-hover:text-brand-600 line-clamp-1"
            title={project.name}
          >
            {project.name}
          </h3>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-navy-600">
            <span className="font-semibold text-navy-800">{project.bhks.join(", ")}</span>
            <span className="text-navy-300">•</span>
            <span className="text-emerald-700 font-medium">Ready for Investment</span>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-navy-100/80 pt-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-navy-400">
              Price Range
            </p>
            <p className="text-base font-extrabold text-navy-950 sm:text-lg">
              {priceRangeLabel(project.priceMin, project.priceMax)}
            </p>
          </div>

          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 transition-all group-hover:gap-2.5">
            <span>Details</span>
            <svg viewBox="0 0 16 16" fill="none" className="size-3.5">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.75"
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
