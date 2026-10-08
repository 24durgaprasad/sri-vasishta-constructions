import type { Project, ProjectDetail } from "@/data/types";
import {
  formatArea,
  formatNumber,
  pricePerSqftLabel,
} from "@/lib/format";

type Props = {
  project: Project;
  detail: ProjectDetail;
};

export function KeyFacts({ project, detail }: Props) {
  const facts: { label: string; value: string }[] = [
    { label: "Land area", value: `${detail.landAreaAcres} acres` },
    { label: "Project size", value: detail.towers === 0 ? `${formatNumber(detail.totalUnits)} units` : `${formatNumber(detail.towers)} towers - ${formatNumber(detail.totalUnits)} units` },
    { label: "Sizes", value: `${formatArea(detail.carpetMin)} - ${formatArea(detail.carpetMax)}` },
    { label: "Launch date", value: detail.launchDate },
    { label: "Possession", value: detail.possessionDate },
    { label: "Configurations", value: project.bhks.join(", ") },
    { label: "Avg. price", value: `${pricePerSqftLabel(detail.pricePerSqft)} / sq.ft` },
    { label: "Developer", value: detail.developer },
  ];

  return (
    <div className="rounded-card-lg border border-navy-100 bg-white p-5 shadow-card sm:p-6">
      <h2 className="text-lg font-bold text-navy-900 sm:text-xl">
        Why {project.name}?
      </h2>
      <ul className="mt-4 grid grid-cols-2 gap-3 sm:gap-x-8 sm:gap-y-4">
        {facts.map((fact) => (
          <li key={fact.label} className="min-w-0">
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-navy-500 sm:text-xs">
              {fact.label}
            </span>
            <span className="mt-0.5 block truncate text-[13px] font-semibold text-navy-900 sm:whitespace-normal sm:text-sm" title={fact.value}>
              {fact.value}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-navy-100 pt-4 sm:gap-3">
        <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3.5 py-1.5 text-sm font-semibold text-green-800">
          <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="size-4">
            <path d="m5 10.5 3.5 3.5L15 7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          RERA approved
        </span>
        <span className="inline-flex items-center gap-2 rounded-full bg-navy-50 px-3.5 py-1.5 text-sm font-semibold text-navy-800">
          RERA ID {detail.reraId}
        </span>
      </div>
    </div>
  );
}