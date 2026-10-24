"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { localities } from "@/data/localities";

export function Hero() {
  const router = useRouter();
  const [tab, setTab] = useState<"buy" | "rent" | "plots">("buy");
  const [keyword, setKeyword] = useState("");
  const [selectedLocality, setSelectedLocality] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [budget, setBudget] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();

    params.set("intent", tab === "rent" ? "rent" : tab === "plots" ? "plots" : "buy");

    if (keyword.trim()) {
      params.set("q", keyword.trim());
    } else if (selectedLocality) {
      params.set("q", selectedLocality);
    }

    if (propertyType) {
      params.append("chip", propertyType);
    }

    if (budget) {
      params.append("chip", budget);
    }

    router.push(`/search?${params.toString()}`);
  };

  return (
    <section className="relative isolate overflow-hidden bg-navy-950">
      {/* Background Architectural Photo */}
      <Image
        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=75"
        alt="Sri Vasishta Constructions Luxury Real Estate"
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-center"
      />
      {/* Refined gradient overlay that allows architectural image to shine */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950 via-navy-950/70 to-navy-950/45" />

      <div className="shell pt-36 pb-20 lg:pt-44 lg:pb-28">
        <div className="max-w-3xl">
          {/* Clean, authentic badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white/95 backdrop-blur-md">
            <span className="size-2 rounded-full bg-brand-400" />
            <span>RERA Registered AP00005123</span>
            <span className="text-white/40">•</span>
            <span className="text-brand-300">Visakhapatnam</span>
          </div>

          {/* Main Headline */}
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Find The Perfect Home That{" "}
            <span className="text-brand-400">Fits Your Life</span>
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-navy-200 sm:text-lg">
            Over 12+ years developing gated residential communities, sea-view apartments, luxury villas, approved plots and commercial spaces across Visakhapatnam.
          </p>

          {/* Action buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#top-picks-heading"
              className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-7 py-3.5 text-sm font-bold text-navy-950 shadow-lg shadow-brand-500/25 transition hover:bg-brand-400"
            >
              <span>Explore Projects</span>
              <svg viewBox="0 0 20 20" fill="none" className="size-4">
                <path
                  d="M4 10h12m-4.5-4.5L16 10l-4.5 4.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/20 hover:border-white/50"
            >
              Book Site Visit
            </Link>
          </div>
        </div>

        {/* EstateLoft Floating Multi-Field Search Console */}
        <div className="mt-14 rounded-2xl bg-white p-5 shadow-2xl sm:p-7 border border-navy-100/60">
          {/* Mode Tabs */}
          <div className="mb-5 flex items-center gap-2 border-b border-navy-100 pb-4">
            <button
              type="button"
              onClick={() => setTab("buy")}
              className={`rounded-full px-5 py-2 text-xs font-bold transition-all sm:text-sm ${
                tab === "buy"
                  ? "bg-navy-950 text-white shadow-xs"
                  : "bg-navy-50 text-navy-700 hover:bg-navy-100"
              }`}
            >
              For Sale
            </button>
            <button
              type="button"
              onClick={() => setTab("rent")}
              className={`rounded-full px-5 py-2 text-xs font-bold transition-all sm:text-sm ${
                tab === "rent"
                  ? "bg-navy-950 text-white shadow-xs"
                  : "bg-navy-50 text-navy-700 hover:bg-navy-100"
              }`}
            >
              For Rent
            </button>
            <button
              type="button"
              onClick={() => setTab("plots")}
              className={`rounded-full px-5 py-2 text-xs font-bold transition-all sm:text-sm ${
                tab === "plots"
                  ? "bg-navy-950 text-white shadow-xs"
                  : "bg-navy-50 text-navy-700 hover:bg-navy-100"
              }`}
            >
              Plots &amp; Commercial
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSearch} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:items-end">
            {/* Field 1: Keyword */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-navy-700 mb-1.5">
                Keyword / Project
              </label>
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="e.g. Grandeur, Skyline..."
                className="w-full rounded-xl border border-navy-200 bg-slate-50/60 px-3.5 py-3 text-sm text-navy-900 placeholder:text-navy-400 focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
            </div>

            {/* Field 2: Location */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-navy-700 mb-1.5">
                Location
              </label>
              <select
                value={selectedLocality}
                onChange={(e) => setSelectedLocality(e.target.value)}
                className="w-full rounded-xl border border-navy-200 bg-slate-50/60 px-3.5 py-3 text-sm text-navy-900 focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              >
                <option value="">All Locations in Vizag</option>
                {localities.map((loc) => (
                  <option key={loc.id} value={loc.name}>
                    {loc.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Field 3: Property Type */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-navy-700 mb-1.5">
                Property Type
              </label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full rounded-xl border border-navy-200 bg-slate-50/60 px-3.5 py-3 text-sm text-navy-900 focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              >
                <option value="">All Property Types</option>
                <option value="2 BHK">2 BHK Apartments</option>
                <option value="3 BHK">3 BHK Apartments</option>
                <option value="4 BHK+">4 BHK+ Luxury Homes</option>
                <option value="Ready to move">Ready to Move</option>
                <option value="Under construction">Under Construction</option>
                <option value="Residential plot">Approved Plots</option>
              </select>
            </div>

            {/* Field 4: Budget Range */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-navy-700 mb-1.5">
                Budget
              </label>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full rounded-xl border border-navy-200 bg-slate-50/60 px-3.5 py-3 text-sm text-navy-900 focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              >
                <option value="">Any Budget</option>
                <option value="Under ₹1 Cr">Under ₹1 Crore</option>
                <option value="₹1 Cr - ₹1.5 Cr">₹1 Cr - ₹1.5 Cr</option>
                <option value="₹1.5 Cr - ₹2.5 Cr">₹1.5 Cr - ₹2.5 Cr</option>
                <option value="Above ₹2.5 Cr">Above ₹2.5 Cr</option>
              </select>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full inline-flex h-[46px] items-center justify-center gap-2 rounded-xl bg-brand-500 px-6 font-bold text-navy-950 transition-all hover:bg-brand-400 hover:shadow-md focus:outline-none"
              >
                <svg viewBox="0 0 20 20" fill="none" className="size-4 shrink-0">
                  <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="2" />
                  <path d="m14 14 3.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span>Find Property</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
