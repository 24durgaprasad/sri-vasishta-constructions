import Image from "next/image";
import type { Partner } from "@/data/types";

export function MarqueeRow({
  partners,
  direction = "left",
  label,
  hrefBase,
}: {
  partners: Partner[];
  direction?: "left" | "right";
  label: string;
  hrefBase: string;
}) {
  const track = [...partners, ...partners];

  return (
    <div
      className="marquee-paused group relative overflow-hidden"
      role="region"
      aria-label={label}
    >
      <ul
        className={`marquee-track flex w-max items-center gap-6 ${
          direction === "left" ? "marquee-left" : "marquee-right"
        }`}
      >
        {track.map((partner, index) => (
          <li
            key={`${partner.id}-${index}`}
            aria-hidden={index >= partners.length}
            className="shrink-0"
          >
            <a
              href={`${hrefBase}#${partner.id}`}
              tabIndex={index >= partners.length ? -1 : undefined}
              title={partner.name}
              aria-label={`${partner.name} logo`}
              className="flex h-16 w-52 items-center justify-center rounded-xl border border-navy-200 bg-white px-6 transition hover:border-brand-400"
            >
              {partner.logoSrc ? (
                <Image
                  src={partner.logoSrc}
                  alt={`${partner.name} logo`}
                  width={160}
                  height={40}
                  className="h-9 w-auto max-w-[150px] object-contain"
                />
              ) : (
                <span className="text-xs font-semibold uppercase tracking-wide text-navy-600">
                  {partner.name}
                </span>
              )}
            </a>
          </li>
        ))}
      </ul>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent" />
    </div>
  );
}
