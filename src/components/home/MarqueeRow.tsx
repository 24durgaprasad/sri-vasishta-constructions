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
        className={`marquee-track flex w-max items-center gap-10 ${
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
              className="flex h-14 w-40 items-center justify-center gap-2 rounded-xl border border-navy-200 bg-white px-4 text-navy-600 transition hover:border-brand-400 hover:text-navy-900"
            >
              <span className="grid size-7 shrink-0 place-items-center rounded-md bg-navy-900 text-[0.6rem] font-bold tracking-tight text-white">
                {partner.logo.slice(0, 3)}
              </span>
              <span className="text-xs font-semibold uppercase tracking-wide">
                {partner.name}
              </span>
            </a>
          </li>
        ))}
      </ul>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent" />
    </div>
  );
}