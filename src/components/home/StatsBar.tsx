"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, animate, useReducedMotion } from "motion/react";

const stats = [
  { value: 18, suffix: "+", label: "Projects delivered & ongoing" },
  { value: 5, suffix: "+", label: "Prime localities in Vizag" },
  { value: 12, suffix: "+", label: "Years of excellence" },
  { value: 200, prefix: "₹", suffix: "Cr+", label: "Total value delivered" },
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
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    if (prefersReduced) {
      if (ref.current) ref.current.textContent = `${prefix}${value}${suffix}`;
      return;
    }
    const controls = animate(motionValue, value, {
      duration: 1.8,
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
    <section className="border-y border-navy-800 bg-navy-950">
      <div className="shell py-16 lg:py-20">
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center lg:text-left">
              <p className="text-4xl font-bold tabular-nums text-white lg:text-5xl">
                <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
              </p>
              <p className="eyebrow mt-3 text-navy-400">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
