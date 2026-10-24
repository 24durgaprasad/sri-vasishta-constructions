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
        alt="Sri Vasishta Constructions Luxury Architecture"
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-center"
      />
      {/* High-contrast gradient overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950/95 via-navy-950/85 to-navy-950/65" />

      <div className="shell pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Heading, Subtitle, CTA, Social Proof */}
          <div className="lg:col-span-7">
            {/* Subtitle pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-400 backdrop-blur-sm">
              <span className="size-2 rounded-full bg-brand-400 animate-pulse" />
              // Trusted Real Estate Developer //
            </div>

            {/* Main Headline */}
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-6xl">
              The Perfect Place To Find Your{" "}
              <span className="text-brand-400">Dream Property</span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-navy-200 sm:text-lg">
              Over 12+ years delivering RERA-approved apartments, luxury gated villas, approved open plots and commercial landmarks across Visakhapatnam.
            </p>

            {/* Action buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#top-picks-heading"
                className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-6 py-3.5 text-sm font-bold text-navy-950 shadow-lg shadow-brand-500/20 transition hover:bg-brand-400"
              >
                <span>Explore Properties</span>
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
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/20 hover:border-white/50"
              >
                Book Site Visit
              </Link>
            </div>

            {/* Client satisfaction badge */}
            <div className="mt-10 flex items-center gap-4 border-t border-white/15 pt-6">
              <div className="flex -space-x-2.5 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80"
                  alt="Customer"
                  width={40}
                  height={40}
                  className="inline-block size-10 rounded-full ring-2 ring-navy-950 object-cover"
                />
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80"
                  alt="Customer"
                  width={40}
                  height={40}
                  className="inline-block size-10 rounded-full ring-2 ring-navy-950 object-cover"
                />
                <Image
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&h=120&q=80"
                  alt="Customer"
                  width={40}
                  height={40}
                  className="inline-block size-10 rounded-full ring-2 ring-navy-950 object-cover"
                />
                <div className="flex size-10 items-center justify-center rounded-full bg-brand-500 text-xs font-bold text-navy-950 ring-2 ring-navy-950">
                  +1.5k
                </div>
              </div>

              <div>
                <p className="text-lg font-bold text-white leading-none">1,500+ Happy Families</p>
                <p className="mt-1 text-xs text-navy-300">Living in Vasishta communities in Visakhapatnam</p>
              </div>
            </div>
          </div>

          {/* Right Column: Key Trust Matrix */}
          <div className="hidden lg:col-span-5 lg:flex flex-col gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
              <div className="flex items-center gap-3 text-brand-400">
                <svg viewBox="0 0 24 24" fill="none" className="size-6">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="2"/>
                </svg>
                <h3 className="text-lg font-bold text-white">100% RERA &amp; VMRDA Approved</h3>
              </div>
              <p className="mt-2 text-sm text-navy-300 leading-relaxed">
                Clear titles, approved masterplans, and legal transparency guaranteed across all ongoing and completed projects.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
              <div className="flex items-center gap-3 text-brand-400">
                <svg viewBox="0 0 24 24" fill="none" className="size-6">
                  <path d="M3 21h18M5 21V7l8-4v18M13 9v12M9 10h1M9 14h1M9 18h1M17 13h1M17 17h1" stroke="currentColor" strokeWidth="2"/>
                </svg>
                <h3 className="text-lg font-bold text-white">Pre-approved Home Loans</h3>
              </div>
              <p className="mt-2 text-sm text-navy-300 leading-relaxed">
                Partnered with SBI, HDFC, ICICI, Axis Bank and LIC Housing Finance for quick processing and lowest interest rates.
              </p>
            </div>
          </div>
        </div>

        {/* EstateLoft Property Search Console (el-booking-1-wrap) */}
        <div className="mt-12 rounded-2xl bg-white p-6 shadow-2xl lg:p-8">
          {/* Top Tabs: For Sale / For Rent / Plots */}
          <div className="mb-6 flex items-center gap-2 border-b border-navy-100 pb-4">
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

          {/* Form with 4 structured fields + submit */}
          <form onSubmit={handleSearch} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:items-end">
            {/* Field 1: Keyword */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-navy-700 mb-1.5">
                Keyword / Project
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="e.g. Grandeur, Skyline..."
                  className="w-full rounded-xl border border-navy-200 bg-slate-50/50 px-3.5 py-3 text-sm text-navy-900 placeholder:text-navy-400 focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                />
              </div>
            </div>

            {/* Field 2: Location */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-navy-700 mb-1.5">
                Location
              </label>
              <select
                value={selectedLocality}
                onChange={(e) => setSelectedLocality(e.target.value)}
                className="w-full rounded-xl border border-navy-200 bg-slate-50/50 px-3.5 py-3 text-sm text-navy-900 focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
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
                className="w-full rounded-xl border border-navy-200 bg-slate-50/50 px-3.5 py-3 text-sm text-navy-900 focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
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
                Price Budget
              </label>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full rounded-xl border border-navy-200 bg-slate-50/50 px-3.5 py-3 text-sm text-navy-900 focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
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
