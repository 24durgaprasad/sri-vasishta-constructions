"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, animate, useReducedMotion } from "motion/react";

const stats = [
  {
    value: 18,
    suffix: "+",
    label: "Delivered & Ongoing Projects",
    desc: "RERA approved gated communities",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="size-6 text-brand-500">
        <path d="M3 21h18M5 21V7l8-4v18M13 9v12M9 10h1M9 14h1M9 18h1M17 13h1M17 17h1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    value: 14,
    suffix: "+",
    label: "Prime Vizag Localities",
    desc: "Madhurawada, MVP Colony, Rushikonda",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="size-6 text-brand-500">
        <path d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21Z" stroke="currentColor" strokeWidth="2"/>
        <circle cx="12" cy="9.5" r="2.5" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
  },
  {
    value: 12,
    suffix: "+",
    label: "Years of Trust & Quality",
    desc: "Honest pricing & clear titles",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="size-6 text-brand-500">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    value: 200,
    prefix: "₹",
    suffix: "Cr+",
    label: "Delivered Value",
    desc: "Across residential & commercial",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="size-6 text-brand-500">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

function Counter({
  value,
  prefix = "",
  suffix = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
}) {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!inView) return;
    if (prefersReduced) {
      if (ref.current) ref.current.textContent = `${prefix}${value}${suffix}`;
      return;
    }
    const controls = animate(motionValue, value, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate(v) {
        if (ref.current) ref.current.textContent = `${prefix}${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, value, prefix, suffix, motionValue, prefersReduced]);

  return (
    <span ref={ref}>
      {prefix}0{suffix}
    </span>
  );
}

export function StatsBar() {
  return (
    <section className="border-b border-navy-100 bg-white py-12 lg:py-16">
      <div className="shell">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex items-start gap-4 rounded-2xl border border-navy-100/80 bg-slate-50/50 p-6 transition-all duration-300 hover:bg-white hover:shadow-lg"
            >
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white shadow-xs border border-navy-100/70">
                {s.icon}
              </div>
              <div>
                <p className="text-3xl font-extrabold tracking-tight text-navy-950">
                  <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
                </p>
                <p className="mt-1 text-sm font-bold text-navy-900">{s.label}</p>
                <p className="text-xs text-navy-500 mt-0.5">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
