"use client";

import Link from "next/link";
import { Carousel } from "@/components/ui/Carousel";
import { HighlightCard } from "./HighlightCard";
import { projectsBy } from "@/data/projects";

export function Highlighted() {
  const items = projectsBy("highlighted");

  return (
    <section aria-labelledby="highlighted-heading" className="bg-white py-16 lg:py-24">
      <div className="shell">
        {/* Section Header */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand-700">
              <span className="size-1.5 rounded-full bg-brand-500" />
              Signature Living
            </span>
            <h2 id="highlighted-heading" className="mt-3 text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">
              Highlighted Developments
            </h2>
            <p className="mt-2 text-base text-navy-600">
              Flagship gated communities and premier residences with world-class clubhouse amenities.
            </p>
          </div>

          <Link
            href="/projects?collection=highlighted"
            className="inline-flex items-center gap-2 text-sm font-bold text-navy-900 transition-colors hover:text-brand-600"
          >
            <span>See All Highlights</span>
            <svg viewBox="0 0 20 20" fill="none" className="size-4">
              <path
                d="M4 10h12m-4.5-4.5L16 10l-4.5 4.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>

        {/* Carousel */}
        <Carousel
          label="highlighted project"
          options={{ slidesToScroll: 1, breakpoints: { 768: { slidesToScroll: 2 } } }}
        >
          {items.map((project) => (
            <div
              key={project.id}
              className="min-w-0 flex-[0_0_92%] sm:flex-[0_0_58%] lg:flex-[0_0_46%]"
            >
              <HighlightCard project={project} />
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
