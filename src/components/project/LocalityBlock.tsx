import type { Project, ProjectDetail } from "@/data/types";
import { pricePerSqftLabel } from "@/lib/format";

type Props = {
  project: Project;
  detail: ProjectDetail;
};

export function LocalityBlock({ project, detail }: Props) {
  const rising = detail.localityPriceTrend >= 0;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-start">
      <div className="rounded-card-lg border border-navy-100 bg-navy-900 p-6 text-white sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
          {project.locality}
        </p>
        <p className="mt-2 text-3xl font-bold text-brand-400">
          {pricePerSqftLabel(detail.localityPricePerSqft)}
          <span className="text-base font-medium text-navy-300"> / sq.ft</span>
        </p>
        <p className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-300">
          <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="size-4">
            <path
              d="M10 16V4m0 0L6 8m4-4 4 4"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {rising ? "+" : ""}
          {detail.localityPriceTrend}% over the last year
        </p>
        <p className="mt-4 text-sm leading-relaxed text-navy-200">
          Average residential rate in {project.locality}, {project.city}. Rates are
          indicative and vary by building age, floor and exact location within the
          locality.
        </p>
      </div>

      <div className="rounded-card-lg border border-navy-100 bg-white p-6 shadow-card sm:p-8">
        <h3 className="text-base font-bold text-navy-900">Around this project</h3>
        <ul className="mt-4 divide-y divide-navy-100">
          {detail.nearby.map((place) => (
            <li
              key={place.name}
              className="flex items-baseline justify-between gap-4 py-3 first:pt-0 last:pb-0"
            >
              <span className="text-sm text-navy-700">{place.name}</span>
              <span className="shrink-0 text-sm font-semibold text-navy-900">
                {place.distance}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}