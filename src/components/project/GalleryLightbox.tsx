"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

type Props = {
  images: string[];
  alt: string;
  initialIndex?: number;
  onClose: () => void;
};

export function GalleryLightbox({ images, alt, initialIndex = 0, onClose }: Props) {
  const [index, setIndex] = useState(initialIndex);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<Element | null>(null);

  const total = images.length;

  const goTo = useCallback(
    (next: number) => setIndex(((next % total) + total) % total),
    [total],
  );

  useEffect(() => {
    openerRef.current = document.activeElement;
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") goTo(index + 1);
      if (event.key === "ArrowLeft") goTo(index - 1);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      if (openerRef.current instanceof HTMLElement) openerRef.current.focus();
    };
  }, [goTo, index, onClose]);

  if (total === 0) return null;

  const current = images[index];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${alt} photo gallery`}
      className="fixed inset-0 z-[80] flex flex-col bg-navy-950/95 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="shell flex items-center justify-between gap-4 py-4">
        <p aria-live="polite" className="text-sm font-semibold text-white">
          {index + 1} / {total}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close gallery"
          className="grid size-11 place-items-center rounded-full border border-white/25 text-white transition hover:bg-white/10"
        >
          <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="size-5">
            <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div
        className="flex min-h-0 flex-1 items-center justify-center gap-2 px-3 pb-4 sm:gap-4 sm:px-6"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          aria-label="Previous photo"
          className="grid size-11 shrink-0 place-items-center rounded-full border border-white/25 text-white transition hover:bg-white/10"
        >
          <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="size-5">
            <path d="m12 5-5 5 5 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="relative min-h-0 w-full max-w-5xl self-stretch overflow-hidden rounded-card-lg">
          <Image
            key={current}
            src={current}
            alt={index === 0 ? alt : `${alt} — photo ${index + 1}`}
            fill
            sizes="90vw"
            className="object-contain"
          />
        </div>

        <button
          type="button"
          onClick={() => goTo(index + 1)}
          aria-label="Next photo"
          className="grid size-11 shrink-0 place-items-center rounded-full border border-white/25 text-white transition hover:bg-white/10"
        >
          <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="size-5">
            <path d="m8 5 5 5-5 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
