import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";

export function AboutSection() {
  const highlights = [
    {
      title: "100% RERA Registered",
      description: "Every development follows strict RERA AP guidelines with transparent escrow accounts and clear land titles.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="size-6 text-brand-500">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      title: "Prime Growth Corridors",
      description: "Projects located near IT SEZs, international schools, coastal corridors and highway transit hubs.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="size-6 text-brand-500">
          <path d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21Z" stroke="currentColor" strokeWidth="2"/>
          <circle cx="12" cy="9.5" r="2.5" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
    },
    {
      title: "Engineered For Durability",
      description: "Seismic resistant RCC framed structures, branded fittings, 24/7 security and high-speed automatic lifts.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="size-6 text-brand-500">
          <path d="M3 21h18M5 21V7l8-4v18M13 9v12M9 10h1M9 14h1M9 18h1M17 13h1M17 17h1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      title: "Pre-Approved Bank Tie-ups",
      description: "Tie-ups with SBI, HDFC, ICICI, Axis and LIC Housing Finance ensure hassle-free loan approvals.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="size-6 text-brand-500">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
  ];

  return (
    <section className="bg-white py-16 lg:py-24 overflow-hidden border-b border-navy-100">
      <div className="shell">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Image with Experience Badge */}
          <div className="relative lg:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
                alt="Sri Vasishta Constructions Engineering Excellence"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>

            {/* Floating Experience Badge */}
            <div className="absolute -bottom-6 -right-6 hidden sm:flex items-center gap-4 rounded-2xl bg-navy-950 p-6 text-white shadow-2xl border border-navy-800">
              <span className="text-4xl font-extrabold text-brand-400">12+</span>
              <div className="text-xs font-semibold uppercase tracking-wider text-navy-300">
                Years of Building<br />Trust in Visakhapatnam
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Values */}
          <div className="lg:col-span-7 lg:pl-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand-700">
              <span className="size-1.5 rounded-full bg-brand-500" />
              // Why Choose Vasishta //
            </span>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">
              Building Landmarks That Define Modern Living
            </h2>

            <p className="mt-4 text-base leading-relaxed text-navy-600">
              {site.name} has shaped Visakhapatnam’s skyline with 18+ landmark residential and commercial developments. We focus on prime locations, uncompromising structural engineering, and honest on-time handovers.
            </p>

            {/* 4 Feature Cards */}
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {highlights.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-navy-100 bg-slate-50/60 p-5 transition-all hover:border-navy-200 hover:bg-white hover:shadow-sm"
                >
                  <div className="mb-3 inline-flex size-11 items-center justify-center rounded-xl bg-white shadow-xs border border-navy-100/70">
                    {item.icon}
                  </div>
                  <h3 className="text-base font-bold text-navy-950">{item.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-navy-500">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-9 flex items-center gap-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-full bg-navy-950 px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-500 hover:text-navy-950"
              >
                <span>About Our Company</span>
                <svg viewBox="0 0 20 20" fill="none" className="size-4">
                  <path
                    d="M4 10h12m-4.5-4.5L16 10l-4.5 4.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-sm font-bold text-navy-800 hover:text-brand-600 transition-colors"
              >
                Schedule Office Visit →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
