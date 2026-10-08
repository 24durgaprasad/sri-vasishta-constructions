import type { AmenityGroup } from "@/data/types";

function AmenityList({ items, start = 0 }: { items: string[]; start?: number }) {
  return (
    <ul className={start === 0 ? "mt-2.5 space-y-1.5" : "mt-1.5 space-y-1.5"}>
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-2.5 text-[13px] text-navy-700 sm:text-sm"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            fill="none"
            className="mt-0.5 size-4 shrink-0 text-brand-500"
          >
            <path
              d="m5 10.5 3.5 3.5L15 7"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {item}
        </li>
      ))}
    </ul>
  );
}

function AmenityCard({ group }: { group: AmenityGroup }) {
  return (
    <section className="rounded-card border border-navy-100 bg-white p-4 shadow-card">
      <h3 className="text-sm font-bold text-navy-900">{group.category}</h3>
      <AmenityList items={group.items.slice(0, 6)} />
      {group.items.length > 6 ? (
        <details className="group mt-2">
          <summary className="inline-flex min-h-11 cursor-pointer list-none items-center text-[13px] font-semibold text-brand-700 hover:text-brand-800 [&::-webkit-details-marker]:hidden">
            <span className="group-open:hidden">
              +{group.items.length - 6} more
            </span>
            <span className="hidden group-open:inline">Show less</span>
          </summary>
          <AmenityList items={group.items.slice(6)} start={6} />
        </details>
      ) : null}
    </section>
  );
}

export function AmenityGrid({ amenities }: { amenities: AmenityGroup[] }) {
  if (amenities.length === 0) return null;
  const visible = amenities.slice(0, 4);
  const rest = amenities.slice(4);

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {visible.map((group) => (
          <AmenityCard key={group.category} group={group} />
        ))}
      </div>
      {rest.length > 0 ? (
        <details className="group mt-3">
          <summary className="inline-flex min-h-11 cursor-pointer list-none items-center rounded-full border border-navy-200 bg-white px-5 py-2.5 text-sm font-semibold text-navy-800 transition hover:border-navy-300 [&::-webkit-details-marker]:hidden">
            <span className="group-open:hidden">
              Show all {amenities.length} amenity groups
            </span>
            <span className="hidden group-open:inline">Show fewer</span>
          </summary>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {rest.map((group) => (
              <AmenityCard key={group.category} group={group} />
            ))}
          </div>
        </details>
      ) : null}
    </div>
  );
}
