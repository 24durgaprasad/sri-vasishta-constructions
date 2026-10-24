"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/format";
import { projectsBy } from "@/data/projects";

export function Highlighted() {
  const items = projectsBy("highlighted");
  const prefersReduced = useReducedMotion();

  return (
    <section aria-labelledby="highlighted-heading" className="section-gap bg-white">
      <div className="shell">
        <div className="mb-14 flex items-end justify-between">
          <div>
            <p className="eyebrow mb-3 text-brand-500">Signature Projects</p>
            <h2 id="highlighted-heading" className="display-lg text-navy-950">
              Our most requested<br />developments
            </h2>
          </div>
          <Link
            href="/projects?collection=highlighted"
            className="eyebrow hidden items-center gap-2 text-navy-500 transition-colors hover:text-navy-900 lg:inline-flex"
          >
            See all
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

        <div className="divide-y divide-navy-100">
          {items.map((project, i) => {
            const isEven = i % 2 === 0;
            return (
              <div
                key={project.id}
                className={`grid grid-cols-1 gap-0 lg:grid-cols-2 ${
                  i > 0 ? "pt-12 lg:pt-16" : ""
                } pb-12 lg:pb-16`}
              >
                {/* Image */}
                <motion.div
                  className={`img-cover aspect-[4/3] rounded-2xl overflow-hidden lg:aspect-auto lg:min-h-[440px] ${
                    isEven ? "lg:order-1" : "lg:order-2"
                  }`}
                  initial={prefersReduced ? false : { opacity: 0, x: isEven ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <Image
                    src={project.images[0]}
                    alt={project.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 hover:scale-[1.04]"
                  />
                </motion.div>

                {/* Text */}
                <motion.div
                  className={`flex flex-col justify-center pt-8 lg:pt-0 ${
                    isEven ? "lg:order-2 lg:pl-16" : "lg:order-1 lg:pr-16"
                  }`}
                  initial={prefersReduced ? false : { opacity: 0, x: isEven ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                >
                  <p className="eyebrow mb-4 text-brand-500">
                    {project.locality} · {project.city}
                  </p>
                  {project.badge && (
                    <span className="eyebrow mb-4 inline-flex w-fit rounded-full border border-navy-200 px-3 py-1 text-navy-600">
                      {project.badge}
                    </span>
                  )}
                  <h3 className="mb-4 text-3xl font-bold leading-tight text-navy-950 lg:text-4xl">
                    {project.name}
                  </h3>
                  <p className="mb-6 text-navy-500">{project.bhks.join(" · ")}</p>
                  <p className="display-lg mb-8 text-navy-950">
                    {formatPrice(project.priceMin)}
                    <span className="text-2xl font-normal text-navy-400"> – </span>
                    {formatPrice(project.priceMax)}
                  </p>
                  <Link
                    href={`/projects/${project.id}`}
                    className="inline-flex w-fit items-center gap-3 rounded-full bg-navy-950 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-500"
                  >
                    Explore Project
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
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
