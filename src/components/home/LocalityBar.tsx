"use client";

import useEmblaCarousel from "embla-carousel-react";
import { localities } from "@/data/localities";

export function LocalityBar() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { align: "start", dragFree: true, containScroll: "trimSnaps" },
    [],
  );

  return (
    <section aria-labelledby="localities-heading" className="border-b border-navy-100 bg-white">
      <div className="shell flex items-center gap-4 py-5">
        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          <h2 id="localities-heading" className="text-sm font-semibold text-navy-900">
            Popular localities
          </h2>
        </div>

        <div className="relative min-w-0 flex-1">
          <div ref={emblaRef} className="overflow-hidden">
            <ul className="flex touch-pan-y gap-2.5 pl-0.5">
              {localities.map((locality) => (
                <li key={locality.id} className="shrink-0">
                  <a
                    href={`/properties?locality=${encodeURIComponent(locality.name)}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-navy-200 bg-white px-4 py-2 text-sm font-medium text-navy-700 transition hover:border-brand-500 hover:bg-brand-50 hover:text-navy-900"
                  >
                    {locality.name}
                    <span className="text-xs text-navy-500">{locality.city}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <button
            type="button"
            aria-label="Scroll localities left"
            onClick={() => emblaApi?.scrollPrev()}
            className="absolute -left-1 top-1/2 hidden size-8 -translate-y-1/2 place-items-center rounded-full border border-navy-200 bg-white text-navy-700 shadow-sm transition hover:bg-navy-50 md:grid"
          >
            <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="size-4">
              <path d="m12 5-5 5 5 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Scroll localities right"
            onClick={() => emblaApi?.scrollNext()}
            className="absolute -right-1 top-1/2 hidden size-8 -translate-y-1/2 place-items-center rounded-full border border-navy-200 bg-white text-navy-700 shadow-sm transition hover:bg-navy-50 md:grid"
          >
            <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="size-4">
              <path d="m8 5 5 5-5 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}