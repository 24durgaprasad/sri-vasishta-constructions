"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/format";
import { projectsBy } from "@/data/projects";

export function TopPicks() {
  const items = projectsBy("topPicks");
  const [activeIdx, setActiveIdx] = useState(0);
  const prefersReduced = useReducedMotion();

  const featured = items[activeIdx];
  const side = [
    items[(activeIdx + 1) % items.length],
    items[(activeIdx + 2) % items.length],
  ];

  function prev() {
    setActiveIdx((i) => (i - 1 + items.length) % items.length);
  }
  function next() {
    setActiveIdx((i) => (i + 1) % items.length);
  }

  return (
    <section aria-labelledby="top-picks-heading" className="section-gap bg-white">
      <div className="shell">
        {/* Header row */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="eyebrow mb-3 text-brand-500">Top Picks</p>
            <h2 id="top-picks-heading" className="display-lg text-navy-950">
              Homes our buyers<br />love most
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <span className="eyebrow text-navy-400">
              {String(activeIdx + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </span>
            <div className="flex gap-2">
              <button
                onClick={prev}
                aria-label="Previous"
                className="grid size-11 place-items-center rounded-full border border-navy-200 transition-all hover:border-navy-900 hover:bg-navy-900 hover:text-white"
              >
                <svg viewBox="0 0 20 20" fill="none" className="size-4">
                  <path
                    d="M13 4l-6 6 6 6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                onClick={next}
                aria-label="Next"
                className="grid size-11 place-items-center rounded-full border border-navy-200 transition-all hover:border-navy-900 hover:bg-navy-900 hover:text-white"
              >
                <svg viewBox="0 0 20 20" fill="none" className="size-4">
                  <path
                    d="M7 4l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_320px]">
          {/* Featured card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={featured.id}
              initial={prefersReduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <Link
                href={`/projects/${featured.id}`}
                className="group relative block aspect-[4/3] overflow-hidden rounded-2xl lg:aspect-[16/11]"
              >
                <Image
                  src={featured.images[0]}
                  alt={featured.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 65vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                {/* Badge */}
                {featured.badge && (
                  <span className="eyebrow absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1.5 text-navy-900 backdrop-blur">
                    {featured.badge}
                  </span>
                )}
                {/* Footer overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/90 via-navy-950/40 to-transparent p-6 lg:p-8">
                  <p className="eyebrow mb-2 text-brand-400">
                    {featured.locality} · {featured.bhks.join(", ")}
                  </p>
                  <h3 className="mb-1 text-xl font-bold text-white lg:text-2xl">
                    {featured.name}
                  </h3>
                  <p className="text-sm text-navy-200">
                    {formatPrice(featured.priceMin)} – {formatPrice(featured.priceMax)}
                  </p>
                  <span className="eyebrow mt-4 inline-flex items-center gap-2 text-brand-400 transition-all group-hover:gap-3">
                    View Project
                    <svg viewBox="0 0 16 16" fill="none" className="size-3.5">
                      <path
                        d="M3 8h10M9 4l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </Link>
            </motion.div>
          </AnimatePresence>

          {/* Two stacked side cards */}
          <div className="hidden flex-col gap-4 lg:flex">
            {side.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                className="group relative min-h-0 flex-1 overflow-hidden rounded-2xl"
              >
                <Image
                  src={project.images[0]}
                  alt={project.name}
                  fill
                  sizes="320px"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="eyebrow mb-1 text-navy-300">{project.locality}</p>
                  <p className="text-sm font-semibold text-white">{project.name}</p>
                  <p className="mt-0.5 text-xs text-navy-300">
                    {formatPrice(project.priceMin)} – {formatPrice(project.priceMax)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
