import Link from "next/link";
import type { Project } from "@/data/types";
import { priceRangeLabel, projectHref } from "@/lib/format";
import { CardCarousel } from "./CardCarousel";

export function HighlightCard({ project }: { project: Project }) {
  return (
    <article className="group relative h-full overflow-hidden rounded-card-lg bg-navy-900 shadow-card">
      <div className="relative h-80 w-full sm:h-96">
        <CardCarousel
          images={project.images.slice(0, 3)}
          alt={`${project.name}, ${project.locality}`}
          sizes="(max-width: 640px) 100vw, 50vw"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/25 to-transparent" />

      {project.badge ? (
        <span className="absolute left-4 top-4 rounded-full bg-brand-500 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-navy-950">
          {project.badge}
        </span>
      ) : null}

      <Link
        href={projectHref(project.name)}
        className="absolute inset-0 z-10"
        aria-label={`View details for ${project.name}, ${project.locality}`}
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
        <div className="min-w-0 text-white">
          <h3 className="text-lg font-semibold leading-tight sm:text-xl">
            {project.name}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-navy-200">
            {project.locality}, {project.city}
          </p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {project.bhks.map((bhk) => (
              <li
                key={bhk}
                className="rounded-md bg-white/15 px-2 py-0.5 text-[0.7rem] font-medium text-white backdrop-blur-sm"
              >
                {bhk}
              </li>
            ))}
          </ul>
        </div>

        <div className="shrink-0 text-right">
          <p className="text-xs uppercase tracking-wider text-navy-300">
            Price range
          </p>
          <p className="mt-1 text-base font-bold text-brand-400 sm:text-lg">
            {priceRangeLabel(project.priceMin, project.priceMax)}
          </p>
        </div>
      </div>
    </article>
  );
}