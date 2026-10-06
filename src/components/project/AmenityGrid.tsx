import type { AmenityGroup } from "@/data/types";

export function AmenityGrid({ amenities }: { amenities: AmenityGroup[] }) {
  if (amenities.length === 0) return null;

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {amenities.map((group) => (
        <section
          key={group.category}
          className="rounded-card border border-navy-100 bg-white p-5 shadow-card"
        >
          <h3 className="text-sm font-bold text-navy-900">{group.category}</h3>
          <ul className="mt-3 space-y-2">
            {group.items.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-navy-700">
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
        </section>
      ))}
    </div>
  );
}