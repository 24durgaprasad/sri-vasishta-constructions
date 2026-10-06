"use client";

import { useState } from "react";
import Image from "next/image";

type Props = {
  projectName: string;
  locality: string;
  images: string[];
};

export function PhotoGallery({ projectName, locality, images }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (images.length < 2) return null;

  const active = images[Math.min(activeIndex, images.length - 1)];

  return (
    <div>
      <div className="relative aspect-[16/9] overflow-hidden rounded-card-lg">
        <Image
          key={active}
          src={active}
          alt={`${projectName}, ${locality} — photo ${activeIndex + 1} of ${images.length}`}
          fill
          sizes="(max-width: 1024px) 100vw, 70vw"
          className="object-cover"
        />
        <span className="absolute bottom-3 right-3 rounded-full bg-navy-950/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          {activeIndex + 1} / {images.length}
        </span>
      </div>

      <div
        role="tablist"
        aria-label={`${projectName} photos`}
        className="no-scrollbar -mx-1 mt-3 flex gap-3 overflow-x-auto px-1 pb-1"
      >
        {images.map((src, index) => (
          <button
            key={src}
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            aria-label={`Show photo ${index + 1}`}
            onClick={() => setActiveIndex(index)}
            className={`relative h-20 w-32 shrink-0 overflow-hidden rounded-xl transition ${
              index === activeIndex
                ? "ring-2 ring-brand-500 ring-offset-2 ring-offset-white"
                : "opacity-70 hover:opacity-100"
            }`}
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="128px"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
