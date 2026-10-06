"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";

type Props = {
  images: string[];
  alt: string;
  sizes: string;
};

export function CardCarousel({ images, alt, sizes }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (emblaApi) setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  if (images.length < 2) {
    return (
      <Image
        src={images[0]}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover transition duration-500 group-hover:scale-105"
      />
    );
  }

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label={`${alt} photos`}
      className="relative h-full w-full"
    >
      <div ref={emblaRef} className="h-full overflow-hidden">
        <div className="flex h-full touch-pan-y">
          {images.map((src, index) => (
            <div
              key={src}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${images.length}`}
              className="relative h-full min-w-0 shrink-0 grow-0 basis-full"
            >
              <Image
                src={src}
                alt={index === 0 ? alt : `${alt} — photo ${index + 1}`}
                fill
                sizes={sizes}
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        aria-label={`Previous photo for ${alt}`}
        onClick={() => emblaApi?.scrollPrev()}
        className="absolute left-2 top-1/2 z-20 grid size-8 -translate-y-1/2 place-items-center rounded-full bg-navy-950/60 text-white backdrop-blur-sm transition hover:bg-navy-950/85"
      >
        <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="size-4">
          <path d="m12 5-5 5 5 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        type="button"
        aria-label={`Next photo for ${alt}`}
        onClick={() => emblaApi?.scrollNext()}
        className="absolute right-2 top-1/2 z-20 grid size-8 -translate-y-1/2 place-items-center rounded-full bg-navy-950/60 text-white backdrop-blur-sm transition hover:bg-navy-950/85"
      >
        <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="size-4">
          <path d="m8 5 5 5-5 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-2 right-2 rounded-full bg-navy-950/70 px-2 py-0.5 text-[0.65rem] font-semibold text-white"
      >
        {selected + 1} / {images.length}
      </span>
    </div>
  );
}
