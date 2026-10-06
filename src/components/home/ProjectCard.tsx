import Link from "next/link";
import type { Project } from "@/data/types";
import { priceRangeLabel, projectHref } from "@/lib/format";
import { CardCarousel } from "./CardCarousel";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-card border border-navy-100 bg-white shadow-card transition hover:-translate-y-1 hover:shadow-card-hover sm:flex-row">
      <div className="relative w-full shrink-0 sm:basis-[70%]">
        <div className="relative h-52 w-full sm:h-full sm:min-h-64">
          <CardCarousel
            images={project.images.slice(0, 3)}
            alt={`${project.name}, ${project.locality}`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 60vw, 50vw"
          />
          {project.badge ? (
            <span className="absolute left-3 top-3 rounded-full bg-navy-950/85 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
              {project.badge}
            </span>
          ) : null}
        </div>
      </div>

      <div className="flex w-full min-w-0 flex-col justify-between gap-4 bg-navy-900 p-5 text-white sm:basis-[30%]">
        <div>
          <Link
            href={projectHref(project.name)}
            className="text-lg font-semibold leading-tight hover:text-brand-400"
          >
            {project.name}
          </Link>
          <p className="mt-1.5 flex items-center gap-1.5 text-sm text-navy-300">
            <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="size-4 shrink-0">
              <path d="M10 18s6-5.5 6-9.5A6 6 0 0 0 4 8.5C4 12.5 10 18 10 18Z" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="10" cy="8.5" r="2" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <span className="min-w-0 truncate">
              {project.locality}, {project.city}
            </span>
          </p>

          <div className="mt-3">
            <p className="text-xs uppercase tracking-wider text-navy-400">
              Available
            </p>
            <ul className="mt-1.5 flex flex-wrap gap-1.5">
              {project.bhks.map((bhk) => (
                <li
                  key={bhk}
                  className="rounded-md border border-navy-700 px-2 py-0.5 text-xs font-medium text-navy-200"
                >
                  {bhk}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-3">
            <p className="text-xs uppercase tracking-wider text-navy-400">
              Price range
            </p>
            <p className="mt-1 text-base font-bold text-brand-400">
              {priceRangeLabel(project.priceMin, project.priceMax)}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Link
            href={projectHref(project.name)}
            className="inline-flex items-center justify-center rounded-full border border-navy-600 px-4 py-2 text-center text-sm font-semibold text-navy-100 transition hover:border-brand-400 hover:text-brand-400"
          >
            View details
          </Link>
          <a
            href={`tel:+919000012345?subject=${encodeURIComponent(
              `Enquiry about ${project.name}, ${project.locality}`,
            )}`}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-500 px-4 py-2.5 text-sm font-semibold text-navy-950 transition hover:bg-brand-400"
          >
          <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="size-4">
              <path
                d="M4 4h3l1.5 4-2 1.5a9 9 0 0 0 4 4l1.5-2 4 1.5v3a1 1 0 0 1-1.1 1A12 12 0 0 1 3 5.1 1 1 0 0 1 4 4Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
            Contact CTC
          </a>
        </div>
      </div>
    </article>
  );
}