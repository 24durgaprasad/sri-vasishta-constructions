"use client";

import { useCallback, useEffect, useState } from "react";
import type { EmblaCarouselType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";

type CarouselProps = {
  children: React.ReactNode;
  options?: Record<string, unknown>;
  className?: string;
  showDots?: boolean;
  label: string;
};

export function Carousel({
  children,
  options,
  className = "",
  showDots = true,
  label,
}: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: false, align: "start", ...options },
    [],
  );
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [selected, setSelected] = useState(0);
  const [snapCount, setSnapCount] = useState(0);

  const onSelect = useCallback((api: EmblaCarouselType) => {
    setCanPrev(api.canScrollPrev());
    setCanNext(api.canScrollNext());
    setSelected(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    setSnapCount(emblaApi.scrollSnapList().length);
    onSelect(emblaApi);
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className={className}>
      <div className="relative">
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex touch-pan-y gap-3 sm:gap-5">{children}</div>
        </div>

        <div className="pointer-events-none absolute inset-y-0 -left-3 hidden w-12 bg-gradient-to-r from-white to-transparent lg:block" />
        <div className="pointer-events-none absolute inset-y-0 -right-3 hidden w-12 bg-gradient-to-l from-white to-transparent lg:block" />
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        {showDots && snapCount > 1 ? (
          <ul className="flex items-center gap-2" role="tablist" aria-label={`${label} slides`}>
            {Array.from({ length: snapCount }).map((_, index) => (
              <li key={index}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={index === selected}
                  aria-label={`Go to slide ${index + 1}`}
                  onClick={() => emblaApi?.scrollTo(index)}
                  className={`h-1.5 rounded-full transition-all ${
                    index === selected ? "w-7 bg-brand-500" : "w-1.5 bg-navy-200 hover:bg-navy-300"
                  }`}
                />
              </li>
            ))}
          </ul>
        ) : (
          <span />
        )}

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            aria-label={`Previous ${label} slide`}
            disabled={!canPrev}
            onClick={() => emblaApi?.scrollPrev()}
            className="grid size-11 place-items-center rounded-full border border-navy-200 bg-white text-navy-800 transition hover:border-navy-300 hover:bg-navy-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white"
          >
            <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="size-5">
              <path d="m12 5-5 5 5 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            aria-label={`Next ${label} slide`}
            disabled={!canNext}
            onClick={() => emblaApi?.scrollNext()}
            className="grid size-11 place-items-center rounded-full border border-navy-200 bg-white text-navy-800 transition hover:border-navy-300 hover:bg-navy-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white"
          >
            <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="size-5">
              <path d="m8 5 5 5-5 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}