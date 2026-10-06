import type { SpecGroup } from "@/data/types";

export function SpecsAccordion({ groups }: { groups: SpecGroup[] }) {
  if (groups.length === 0) return null;

  return (
    <div className="divide-y divide-navy-100 overflow-hidden rounded-card-lg border border-navy-100 bg-white">
      {groups.map((group, index) => (
        <details key={group.category} open={index === 0} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-bold text-navy-900 marker:hidden hover:bg-navy-50/60">
            <span>{group.category}</span>
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              fill="none"
              className="size-4 shrink-0 text-navy-500 transition group-open:rotate-180"
            >
              <path
                d="m5 8 5 5 5-5"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </summary>
          <dl className="grid gap-x-8 gap-y-3 px-5 pb-5 sm:grid-cols-2 lg:grid-cols-3">
            {group.rows.map((row) => (
              <div key={row.label}>
                <dt className="text-xs text-navy-500">{row.label}</dt>
                <dd className="mt-0.5 text-sm font-semibold text-navy-900">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        </details>
      ))}
    </div>
  );
}
