"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Project, ProjectDetail } from "@/data/types";
import { formatArea, priceRangeLabel, projectHref } from "@/lib/format";
import { GalleryLightbox } from "./GalleryLightbox";

type Props = {
  project: Project;
  detail: ProjectDetail;
};

export function ProjectHero({ project, detail }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const images = project.images;
  const extraCount = Math.max(images.length - 4, 0);
  const heroAlt = `${project.name}, ${project.locality}`;

  const facts = [
    { label: "Configurations", value: project.bhks.join(", ") },
    { label: "Price range", value: priceRangeLabel(project.priceMin, project.priceMax) },
    { label: "Sizes", value: `${formatArea(detail.carpetMin)} - ${formatArea(detail.carpetMax)}` },
    { label: "Possession", value: detail.possessionDate },
  ];

  return (
    <section className="bg-navy-950 pt-[73px]">
      <div className="shell">
        <nav aria-label="Breadcrumb" className="pt-6">
          <ol className="flex flex-wrap items-center gap-2 text-xs text-navy-300">
            <li>
              <Link href="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/projects" className="hover:text-white">
                Projects
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="truncate text-white" aria-current="page">
              {project.name}
            </li>
          </ol>
        </nav>

        <div className="grid gap-8 py-8 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:py-10">
          <div>
            <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
              {project.name}
            </h1>
            <p className="mt-2 text-sm text-navy-300">
              {detail.developer} &middot; RERA ID {detail.reraId}
            </p>
            <p className="mt-3 flex items-center gap-1.5 text-sm text-navy-200">
              <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="size-4 shrink-0">
                <path d="M10 18s6-5.5 6-9.5A6 6 0 0 0 4 8.5C4 12.5 10 18 10 18Z" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="10" cy="8.5" r="2" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              {project.locality}, {project.city}
            </p>

            <p className="mt-5 text-2xl font-bold text-brand-400">
              {priceRangeLabel(project.priceMin, project.priceMax)}
            </p>
            <p className="mt-1 text-xs text-navy-400">
              Price excludes maintenance, floor rise, stamp duty, registration and GST.
            </p>

            <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-4">
              {facts.map((fact) => (
                <div key={fact.label} className="border-l-2 border-brand-500/60 pl-3">
                  <dt className="text-[0.65rem] font-semibold uppercase tracking-wider text-navy-400">
                    {fact.label}
                  </dt>
                  <dd className="mt-1 text-sm font-semibold text-white">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="#enquiry" className="btn-primary">
                Contact Developer
              </Link>
              <a
                href={`tel:+919000012345?subject=${encodeURIComponent(
                  `Enquiry about ${project.name}, ${project.locality}`,
                )}`}
                className="btn-outline"
              >
                Call sales
              </a>
            </div>
          </div>

          <div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-card-lg sm:hidden">
              <Image
                src={images[0]}
                alt={heroAlt}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
              {project.badge ? (
                <span className="absolute left-4 top-4 rounded-full bg-navy-950/85 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
                  {project.badge}
                </span>
              ) : null}
              {images.length > 1 ? (
                <button
                  type="button"
                  onClick={() => setLightboxIndex(0)}
                  className="absolute bottom-3 right-3 rounded-full bg-navy-950/80 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur-sm transition hover:bg-navy-950/95"
                >
                  View all {images.length} photos
                </button>
              ) : null}
            </div>

            <div
              role="group"
              aria-label={`${project.name} photos`}
              className="hidden aspect-[4/3] grid-cols-4 grid-rows-2 gap-2 sm:grid"
            >
              <button
                type="button"
                onClick={() => setLightboxIndex(0)}
                aria-label={`Open photo 1 of ${images.length}`}
                className="relative col-span-2 row-span-2 overflow-hidden rounded-l-card-lg rounded-r-xl transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <Image
                  src={images[0]}
                  alt={heroAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                {project.badge ? (
                  <span className="absolute left-4 top-4 rounded-full bg-navy-950/85 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
                    {project.badge}
                  </span>
                ) : null}
              </button>
              {images.slice(1, 5).map((src, offset) => {
                const index = offset + 1;
                const isLast = offset === 3;
                const showMore = isLast && extraCount > 0;
                return (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setLightboxIndex(index)}
                    aria-label={
                      showMore
                        ? `Open gallery, ${extraCount} more photos`
                        : `Open photo ${index + 1} of ${images.length}`
                    }
                    className={`relative overflow-hidden transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                      offset === 1 ? "rounded-tr-card-lg" : ""
                    } ${offset === 3 ? "rounded-br-card-lg" : ""}`}
                  >
                    <Image
                      src={src}
                      alt={index === 1 ? heroAlt : `${heroAlt} — photo ${index + 1}`}
                      fill
                      sizes="(max-width: 1024px) 50vw, 20vw"
                      className="object-cover"
                    />
                    {showMore ? (
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 grid place-items-center bg-navy-950/65 text-lg font-bold text-white"
                      >
                        +{extraCount}
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {lightboxIndex !== null ? (
        <GalleryLightbox
          images={images}
          alt={heroAlt}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      ) : null}
    </section>
  );
}