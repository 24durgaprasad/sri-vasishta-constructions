"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { SearchIntent } from "@/data/types";

const intents: { id: SearchIntent; label: string }[] = [
  { id: "buy", label: "Buy" },
  { id: "rent", label: "Rent" },
  { id: "commercial", label: "Commercial" },
  { id: "plots", label: "Plots" },
];

const chips: Record<SearchIntent, string[]> = {
  buy: ["1 BHK", "2 BHK", "3 BHK", "4 BHK+", "Ready to move", "Under construction"],
  rent: ["1 BHK", "2 BHK", "3 BHK", "Ready to move"],
  commercial: ["Office space", "Retail shop", "Showroom", "Ready to move"],
  plots: ["Residential plot", "Corner plot", "Approved layout", "Under construction"],
};

const placeholder: Record<SearchIntent, string> = {
  buy: "Search flats, villas or plots in Visakhapatnam",
  rent: "Search rental homes and commercial leases",
  commercial: "Search offices, shops and showrooms",
  plots: "Search approved plots and layouts",
};

const intentLabel: Record<SearchIntent, string> = {
  buy: "Buy",
  rent: "Rent",
  commercial: "Commercial",
  plots: "Plots",
};

export function Hero() {
  const router = useRouter();
  const [intent, setIntent] = useState<SearchIntent>("buy");
  const [query, setQuery] = useState("");
  const [activeChips, setActiveChips] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState<string | null>(null);

  const toggleChip = (chip: string) => {
    setActiveChips((current) =>
      current.includes(chip)
        ? current.filter((item) => item !== chip)
        : [...current, chip],
    );
    setSubmitted(null);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const params = new URLSearchParams();
    params.set("intent", intent);
    if (query.trim()) params.set("q", query.trim());
    activeChips.forEach((chip) => params.append("chip", chip));

    setSubmitted(
      `Showing ${intentLabel[intent].toLowerCase()} listings for ${query || "any property"}${
        activeChips.length ? ` · ${activeChips.join(", ")}` : ""
      }.`,
    );
    router.push(`/search?${params.toString()}`);
  };

  return (
    <section className="relative isolate min-h-screen bg-navy-950 overflow-hidden">
      {/* LEFT column — 55% — editorial copy */}
      <div className="relative z-10 flex min-h-screen flex-col justify-between px-6 pt-24 pb-10 sm:px-8 lg:absolute lg:inset-y-0 lg:left-0 lg:w-[55%] lg:px-16 lg:py-12 lg:min-h-full">
        {/* Top spacer for fixed header */}
        <div className="h-4 lg:h-10" />

        {/* Editorial content + search */}
        <div className="flex-1 flex flex-col justify-center py-6">
          <p className="eyebrow text-brand-400 mb-6">Now booking · Visakhapatnam</p>

          <h1 className="display-2xl text-white mb-6">
            Find a home<br />
            that fits<br />
            <em className="text-brand-400 not-italic">how you live</em>
          </h1>

          <p className="text-navy-300 text-base sm:text-lg leading-relaxed max-w-lg mb-8">
            RERA-approved flats, villas, plots and commercial spaces from
            Sri Vasishta Constructions, with honest pricing and clean handover.
          </p>

          {/* Search container */}
          <div className="max-w-xl">
            {/* Intent tabs */}
            <div
              role="tablist"
              aria-label="What are you looking for"
              className="no-scrollbar flex snap-x snap-mandatory flex-nowrap gap-1 overflow-x-auto rounded-xl bg-white/10 p-1 backdrop-blur-md sm:grid sm:grid-cols-4 sm:overflow-visible sm:rounded-full"
            >
              {intents.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={intent === item.id}
                  onClick={(event) => {
                    setIntent(item.id);
                    setActiveChips([]);
                    setSubmitted(null);
                    event.currentTarget.scrollIntoView({
                      inline: "center",
                      block: "nearest",
                      behavior: "smooth",
                    });
                  }}
                  className={`min-h-10 flex-none snap-start whitespace-nowrap rounded-lg px-3.5 py-2 text-[13px] font-semibold transition sm:w-full sm:min-w-0 sm:rounded-full sm:px-4 sm:text-sm ${
                    intent === item.id
                      ? "bg-brand-500 text-white shadow-sm"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Search form */}
            <form onSubmit={onSubmit} className="mt-4">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-2.5 sm:p-3 flex flex-col gap-2.5 sm:flex-row">
                <div className="relative flex-1">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="pointer-events-none absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-white/50"
                  >
                    <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.75" />
                    <path d="m14 14 3 3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                  </svg>
                  <input
                    type="search"
                    value={query}
                    onChange={(event) => {
                      setQuery(event.target.value);
                      setSubmitted(null);
                    }}
                    placeholder={placeholder[intent]}
                    aria-label={placeholder[intent]}
                    className="h-12 w-full rounded-xl bg-transparent pl-11 pr-4 text-sm sm:text-base text-white placeholder:text-white/50 focus:outline-none"
                  />
                </div>
                <button type="submit" className="btn-primary h-12 rounded-full px-7 text-sm font-semibold">
                  Search
                </button>
              </div>

              {/* Chips */}
              <ul className="mt-3 flex flex-wrap gap-2">
                {chips[intent].map((chip) => {
                  const isActive = activeChips.includes(chip);
                  return (
                    <li key={chip}>
                      <button
                        type="button"
                        aria-pressed={isActive}
                        onClick={() => toggleChip(chip)}
                        className={`min-h-8 rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                          isActive
                            ? "border-brand-500 bg-brand-500 text-white"
                            : "border-white/20 text-white/80 hover:border-white/40 hover:text-white"
                        }`}
                      >
                        {chip}
                      </button>
                    </li>
                  );
                })}
              </ul>

              <p aria-live="polite" className="mt-2 min-h-5 text-xs text-navy-300">
                {submitted ??
                  `Browsing ${intentLabel[intent].toLowerCase()} listings${
                    activeChips.length ? ` · ${activeChips.join(", ")}` : ""
                  }`}
              </p>
            </form>
          </div>
        </div>

        {/* Stats row at bottom */}
        <div className="flex flex-wrap gap-8 border-t border-white/10 pt-6">
          <div>
            <span className="text-3xl font-bold text-white">18+</span>
            <p className="eyebrow text-navy-400 mt-1">Projects</p>
          </div>
          <div>
            <span className="text-3xl font-bold text-white">5+</span>
            <p className="eyebrow text-navy-400 mt-1">Localities</p>
          </div>
          <div>
            <span className="text-3xl font-bold text-white">₹200Cr+</span>
            <p className="eyebrow text-navy-400 mt-1">Delivered</p>
          </div>
        </div>
      </div>

      {/* RIGHT column — 45% — full-bleed image */}
      <div className="hidden lg:block absolute inset-y-0 right-0 w-[47%]">
        <Image
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=70"
          alt="Modern apartment building facade at dusk"
          fill
          priority
          sizes="50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/20 to-transparent" />
      </div>

      {/* Mobile: image behind everything */}
      <div className="absolute inset-0 lg:hidden -z-10">
        <Image
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=70"
          alt="Modern apartment building facade at dusk"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-navy-950/85 backdrop-blur-[1px]" />
      </div>
    </section>
  );
}
