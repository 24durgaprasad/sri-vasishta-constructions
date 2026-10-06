"use client";

import { useState } from "react";
import { formatNumber, emiFor } from "@/lib/format";

const inr = (value: number): string => `₹${formatNumber(Math.round(value))}`;

export function EligibilityCalculator() {
  const [income, setIncome] = useState(120000);
  const [obligations, setObligations] = useState(15000);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);

  // Standard FOIR approach: up to 50% of monthly income can go to EMIs.
  const foir = 0.5;
  const available = Math.max(income * foir - obligations, 0);
  const monthlyRate = rate / 1200;
  const months = tenure * 12;
  const factor = (1 + monthlyRate) ** months;
  const eligible =
    monthlyRate > 0 ? (available * (factor - 1)) / factor : available * months;

  const { emi } = emiFor(eligible, rate, tenure);

  return (
    <div className="grid gap-8 rounded-card-lg border border-navy-100 bg-white p-6 shadow-card sm:p-8 lg:grid-cols-[1fr_1fr]">
      <div className="space-y-6">
        <div>
          <div className="flex items-baseline justify-between gap-3">
            <label htmlFor="elig-income" className="text-sm font-semibold text-navy-800">
              Net monthly income
            </label>
            <output htmlFor="elig-income" className="text-sm font-bold text-navy-900">
              {inr(income)}
            </output>
          </div>
          <input
            id="elig-income"
            type="range"
            min={25000}
            max={1000000}
            step={5000}
            value={income}
            onChange={(event) => setIncome(Number(event.target.value))}
            className="mt-2 w-full accent-brand-600"
          />
          <input
            type="number"
            aria-label="Net monthly income in rupees"
            value={income}
            min={0}
            onChange={(event) => setIncome(Math.max(0, Number(event.target.value)))}
            className="mt-3 w-full rounded-xl border border-navy-200 px-3.5 py-2.5 text-sm text-navy-900 focus:border-brand-500 focus:outline-none"
          />
        </div>

        <div>
          <div className="flex items-baseline justify-between gap-3">
            <label htmlFor="elig-obligations" className="text-sm font-semibold text-navy-800">
              Existing monthly EMIs
            </label>
            <output htmlFor="elig-obligations" className="text-sm font-bold text-navy-900">
              {inr(obligations)}
            </output>
          </div>
          <input
            id="elig-obligations"
            type="range"
            min={0}
            max={300000}
            step={1000}
            value={obligations}
            onChange={(event) => setObligations(Number(event.target.value))}
            className="mt-2 w-full accent-brand-600"
          />
        </div>

        <div>
          <div className="flex items-baseline justify-between gap-3">
            <label htmlFor="elig-rate" className="text-sm font-semibold text-navy-800">
              Interest rate (p.a.)
            </label>
            <output htmlFor="elig-rate" className="text-sm font-bold text-navy-900">
              {rate.toFixed(1)}%
            </output>
          </div>
          <input
            id="elig-rate"
            type="range"
            min={6}
            max={15}
            step={0.1}
            value={rate}
            onChange={(event) => setRate(Number(event.target.value))}
            className="mt-2 w-full accent-brand-600"
          />
        </div>

        <div>
          <div className="flex items-baseline justify-between gap-3">
            <label htmlFor="elig-tenure" className="text-sm font-semibold text-navy-800">
              Tenure
            </label>
            <output htmlFor="elig-tenure" className="text-sm font-bold text-navy-900">
              {tenure} years
            </output>
          </div>
          <input
            id="elig-tenure"
            type="range"
            min={5}
            max={30}
            step={1}
            value={tenure}
            onChange={(event) => setTenure(Number(event.target.value))}
            className="mt-2 w-full accent-brand-600"
          />
        </div>
      </div>

      <div className="flex flex-col justify-center rounded-card bg-navy-900 p-6 text-white sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
          Indicative eligible loan
        </p>
        <p aria-live="polite" className="mt-1 text-3xl font-bold text-brand-400">
          {inr(eligible)}
        </p>
        <dl className="mt-5 space-y-3 border-t border-navy-700 pt-5 text-sm">
          <div className="flex items-baseline justify-between gap-3">
            <dt className="text-navy-300">Available for EMI (50% of income)</dt>
            <dd className="font-semibold">{inr(available)}</dd>
          </div>
          <div className="flex items-baseline justify-between gap-3">
            <dt className="text-navy-300">EMI on this loan</dt>
            <dd className="font-semibold">{inr(emi)}</dd>
          </div>
          <div className="flex items-baseline justify-between gap-3">
            <dt className="text-navy-300">Tenure</dt>
            <dd className="font-semibold">{tenure} years</dd>
          </div>
        </dl>
        <p className="mt-5 text-xs leading-relaxed text-navy-400">
          Indicative only. Lenders also weigh credit score, employer, age and
          property valuation, so the sanctioned amount can differ.
        </p>
      </div>
    </div>
  );
}
