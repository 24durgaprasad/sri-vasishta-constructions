"use client";

import { useState } from "react";
import { formatNumber, priceFromLabel } from "@/lib/format";

export type RateCard = { name: string; rate: number };

const inr = (value: number): string => `₹${formatNumber(Math.round(value))}`;

export function PriceCalculator({ localities }: { localities: RateCard[] }) {
  const initial = localities[0];
  const [locality, setLocality] = useState(initial?.name ?? "");
  const [area, setArea] = useState(1200);
  const [negotiation, setNegotiation] = useState(0);

  const selected =
    localities.find((item) => item.name === locality) ?? initial;
  const rate = selected?.rate ?? 0;
  const base = rate * area;
  const value = base * (1 - negotiation / 100);

  const average =
    localities.length > 0
      ? Math.round(
          localities.reduce((sum, item) => sum + item.rate, 0) / localities.length,
        )
      : 0;

  if (!initial) {
    return null;
  }

  return (
    <div className="grid gap-8 rounded-card-lg border border-navy-100 bg-white p-6 shadow-card sm:p-8 lg:grid-cols-[1fr_1fr]">
      <div className="space-y-6">
        <div>
          <label
            htmlFor="price-locality"
            className="text-sm font-semibold text-navy-800"
          >
            Locality
          </label>
          <select
            id="price-locality"
            value={locality}
            onChange={(event) => setLocality(event.target.value)}
            className="mt-2 w-full rounded-xl border border-navy-200 bg-white px-3.5 py-2.5 text-sm text-navy-900 focus:border-brand-500 focus:outline-none"
          >
            {localities.map((item) => (
              <option key={item.name} value={item.name}>
                {item.name} — {inr(item.rate)}/sq.ft
              </option>
            ))}
          </select>
        </div>

        <div>
          <div className="flex items-baseline justify-between gap-3">
            <label htmlFor="price-area" className="text-sm font-semibold text-navy-800">
              Built-up area (sq.ft)
            </label>
            <output htmlFor="price-area" className="text-sm font-bold text-navy-900">
              {formatNumber(area)} sq.ft
            </output>
          </div>
          <input
            id="price-area"
            type="range"
            min={300}
            max={5000}
            step={50}
            value={area}
            onChange={(event) => setArea(Number(event.target.value))}
            className="mt-2 w-full accent-brand-600"
          />
        </div>

        <div>
          <div className="flex items-baseline justify-between gap-3">
            <label htmlFor="price-discount" className="text-sm font-semibold text-navy-800">
              Negotiation or discount
            </label>
            <output htmlFor="price-discount" className="text-sm font-bold text-navy-900">
              {negotiation}%
            </output>
          </div>
          <input
            id="price-discount"
            type="range"
            min={0}
            max={20}
            step={1}
            value={negotiation}
            onChange={(event) => setNegotiation(Number(event.target.value))}
            className="mt-2 w-full accent-brand-600"
          />
        </div>

        <p className="text-xs leading-relaxed text-navy-500">
          Rates are the average for {selected?.name} as published on our project
          pages. The average across the {localities.length} localities we track is{" "}
          {inr(average)}/sq.ft.
        </p>
      </div>

      <div className="flex flex-col justify-center rounded-card bg-navy-900 p-6 text-white sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
          Estimated value
        </p>
        <p aria-live="polite" className="mt-1 text-3xl font-bold text-brand-400">
          {priceFromLabel(value)}
        </p>
        <dl className="mt-5 space-y-3 border-t border-navy-700 pt-5 text-sm">
          <div className="flex items-baseline justify-between gap-3">
            <dt className="text-navy-300">Rate applied</dt>
            <dd className="font-semibold">{inr(rate)}/sq.ft</dd>
          </div>
          <div className="flex items-baseline justify-between gap-3">
            <dt className="text-navy-300">Value before discount</dt>
            <dd className="font-semibold">{priceFromLabel(base)}</dd>
          </div>
          <div className="flex items-baseline justify-between gap-3">
            <dt className="text-navy-300">Exact figure</dt>
            <dd className="font-semibold">{inr(value)}</dd>
          </div>
        </dl>
        <p className="mt-5 text-xs leading-relaxed text-navy-400">
          Indicative only. Floor, facing, age and approvals move the actual
          price; government charges are additional.
        </p>
      </div>
    </div>
  );
}
