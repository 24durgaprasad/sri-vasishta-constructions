const badges = ["EMI available", "Loan available"];

type Tone = "overlay" | "outline-navy" | "light-inline" | "hero";

const toneClasses: Record<Tone, string> = {
  overlay: "bg-navy-950/70 text-white backdrop-blur-sm",
  "outline-navy":
    "border border-brand-500/60 text-brand-400",
  "light-inline":
    "border border-brand-200 bg-brand-50 text-brand-800",
  hero: "border border-white/20 bg-white/10 text-white backdrop-blur-sm",
};

export function FinanceBadges({ tone = "overlay" }: { tone?: Tone; dark?: boolean }) {
  if (tone === "overlay") {
    return (
      <span className="pointer-events-none absolute right-3 top-3 z-30 flex max-w-[55%] flex-wrap justify-end gap-1.5">
        {badges.map((label) => (
          <span
            key={label}
            className={`rounded-full px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-wide ${toneClasses.overlay}`}
          >
            {label}
          </span>
        ))}
      </span>
    );
  }

  return (
    <span className="flex flex-wrap gap-1.5">
      {badges.map((label) => (
        <span
          key={label}
          className={`whitespace-nowrap rounded-full px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wide ${toneClasses[tone]}`}
        >
          {label}
        </span>
      ))}
    </span>
  );
}
