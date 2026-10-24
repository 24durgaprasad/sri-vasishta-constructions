import { localities } from "@/data/localities";

export function LocalityBar() {
  const track = [...localities, ...localities];

  return (
    <section className="border-y border-navy-800 bg-navy-900 py-5 overflow-hidden">
      <div className="marquee-paused relative flex overflow-hidden">
        <ul className="marquee-track flex w-max flex-none items-center gap-3 animate-[marquee-left_30s_linear_infinite]">
          {track.map((loc, index) => (
            <li key={`${loc.id}-${index}`} aria-hidden={index >= localities.length}>
              <a
                href={`/search?locality=${encodeURIComponent(loc.name)}`}
                tabIndex={index >= localities.length ? -1 : undefined}
                className="flex items-center gap-2 whitespace-nowrap rounded-full border border-navy-700 bg-navy-800/50 px-4 py-2 text-sm font-medium text-navy-200 transition-colors hover:border-brand-500 hover:text-brand-400"
              >
                <span className="size-1.5 rounded-full bg-brand-500/60" />
                {loc.name}
                <span className="text-xs text-navy-500">{loc.city}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
