"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { formatPrice } from "@/lib/format";
import { projectsBy } from "@/data/projects";

export function HighDemand() {
  const items = projectsBy("highDemand");
  const prefersReduced = useReducedMotion();

  return (
    <section aria-labelledby="high-demand-heading" className="section-gap bg-navy-950 overflow-hidden">
      <div className="shell mb-10">
        <div className="flex items-end justify-between">
          <div>
            <p className="eyebrow mb-3 text-brand-400">Investment</p>
            <h2 id="high-demand-heading" className="display-lg text-white">
              High-demand projects<br />to invest in now
            </h2>
          </div>
          <Link
            href="/projects?collection=investment"
            className="eyebrow hidden items-center gap-2 text-navy-400 transition-colors hover:text-white lg:inline-flex"
          >
            Browse all
            <svg viewBox="0 0 16 16" fill="none" className="size-3.5">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>

      {/* Horizontal scroll strip — full width */}
      <div className="no-scrollbar flex cursor-grab gap-4 overflow-x-auto px-4 pb-4 active:cursor-grabbing sm:px-6 lg:px-8">
        {items.map((project, i) => (
          <motion.div
            key={project.id}
            className="w-72 flex-none lg:w-80"
            initial={prefersReduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.07, ease: "easeOut" }}
          >
            <Link
              href={`/projects/${project.id}`}
              className="group relative block overflow-hidden rounded-2xl"
              style={{ height: "480px" }}
            >
              <Image
                src={project.images[0]}
                alt={project.name}
                fill
                sizes="320px"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/30 to-transparent" />

              {/* Badge callout */}
              <div className="absolute top-4 right-4 text-right">
                {project.badge && (
                  <span className="eyebrow mb-2 block rounded-full bg-brand-500 px-2.5 py-1 text-white">
                    {project.badge}
                  </span>
                )}
              </div>

              {/* Bottom content */}
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="eyebrow mb-2 text-brand-400">{project.locality}</p>
                <h3 className="mb-1 text-lg font-bold leading-snug text-white">
                  {project.name}
                </h3>
                <p className="mb-4 text-sm text-navy-300">{project.bhks.join(" · ")}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-white">
                      {formatPrice(project.priceMin)}
                    </p>
                    <p className="text-xs text-navy-400">onwards</p>
                  </div>
                  <span className="grid size-10 place-items-center rounded-full border border-white/20 text-white transition-all group-hover:border-brand-500 group-hover:bg-brand-500">
                    <svg viewBox="0 0 16 16" fill="none" className="size-4">
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
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
