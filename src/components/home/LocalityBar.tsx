import Link from "next/link";
import { localities } from "@/data/localities";

export function LocalityBar() {
  return (
    <section className="border-b border-navy-100 bg-white py-12 lg:py-16">
      <div className="shell">
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
              Prime Locations
            </span>
            <h2 className="mt-1 text-2xl font-extrabold text-navy-950 sm:text-3xl">
              Explore by Locality
            </h2>
          </div>
          <Link
            href="/search"
            className="text-xs font-bold text-navy-700 hover:text-brand-600 transition-colors"
          >
            All 14+ Neighborhoods →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
          {localities.slice(0, 14).map((loc) => (
            <Link
              key={loc.id}
              href={`/search?locality=${encodeURIComponent(loc.name)}`}
              className="group flex flex-col justify-between rounded-xl border border-navy-100 bg-slate-50/70 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-300 hover:bg-white hover:shadow-md"
            >
              <div className="size-8 rounded-lg bg-white p-2 shadow-xs border border-navy-100/60 text-brand-600 group-hover:bg-brand-500 group-hover:text-white transition-colors">
                <svg viewBox="0 0 20 20" fill="none" className="size-full">
                  <path
                    d="M10 18s6-5.5 6-9.5A6 6 0 0 0 4 8.5C4 12.5 10 18 10 18Z"
                    stroke="currentColor"
                    strokeWidth="1.75"
                  />
                  <circle cx="10" cy="8.5" r="2" stroke="currentColor" strokeWidth="1.75" />
                </svg>
              </div>

              <div className="mt-4">
                <p className="text-sm font-bold text-navy-950 group-hover:text-brand-600 transition-colors truncate">
                  {loc.name}
                </p>
                <p className="text-[11px] font-medium text-navy-500">
                  {loc.city}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
