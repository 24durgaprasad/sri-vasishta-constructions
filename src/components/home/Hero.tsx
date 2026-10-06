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
  rent: ["1 BHK", "2 BHK", "3 BHK", "Furnished", "Semi furnished", "Shared"],
  commercial: ["Office space", "Retail shop", "Showroom", "Warehouse", "Co-working"],
  plots: ["Residential plot", "Commercial plot", "Corner plot", "East facing", "Approved layout"],
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
    <section className="relative isolate overflow-hidden bg-navy-950">
      <Image
        src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=70"
        alt="Modern apartment building facade at dusk"
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover object-center"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-navy-950/85 via-navy-950/70 to-navy-950/90" />

      <div className="shell pt-32 pb-14 lg:pt-40 lg:pb-20">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium tracking-wide text-white backdrop-blur-sm">
            <span className="size-1.5 rounded-full bg-brand-400" />
            Now booking in Visakhapatnam
          </p>

          <h1 className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Find a home that fits
            <span className="text-brand-400"> how you live</span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-navy-200 sm:text-lg">
            RERA-approved flats, villas, plots and commercial spaces from
            Sri Vasishta Constructions, with honest pricing and clean handover.
          </p>
        </div>

        <div className="mt-10 max-w-4xl rounded-card-lg bg-white p-4 shadow-card-hover sm:p-5">
          <div
            role="tablist"
            aria-label="What are you looking for"
            className="flex flex-wrap gap-1 rounded-full bg-navy-50 p-1"
          >
            {intents.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={intent === item.id}
                onClick={() => {
                  setIntent(item.id);
                  setActiveChips([]);
                  setSubmitted(null);
                }}
                className={`flex-1 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                  intent === item.id
                    ? "bg-navy-900 text-white shadow-sm"
                    : "text-navy-600 hover:text-navy-900"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <form onSubmit={onSubmit} className="mt-4">
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-navy-400"
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
                  className="h-14 w-full rounded-xl border border-navy-200 bg-white pl-12 pr-4 text-base text-navy-900 placeholder:text-navy-400 focus:border-brand-500 focus:outline-none"
                />
              </div>
              <button type="submit" className="btn-primary h-14 px-8 text-base">
                Search
              </button>
            </div>

            <ul className="mt-4 flex flex-wrap gap-2">
              {chips[intent].map((chip) => {
                const isActive = activeChips.includes(chip);
                return (
                  <li key={chip}>
                    <button
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => toggleChip(chip)}
                      className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition ${
                        isActive
                          ? "border-navy-900 bg-navy-900 text-white"
                          : "border-navy-200 bg-white text-navy-600 hover:border-navy-400"
                      }`}
                    >
                      {chip}
                    </button>
                  </li>
                );
              })}
            </ul>

            <p aria-live="polite" className="mt-3 min-h-5 text-xs text-navy-500">
              {submitted ??
                `Browsing ${intentLabel[intent].toLowerCase()} listings${
                  activeChips.length ? ` · ${activeChips.join(", ")}` : ""
                }`}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}