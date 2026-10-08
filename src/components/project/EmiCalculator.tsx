"use client";

import { useState } from "react";
import type { Project } from "@/data/types";
import { emiFor, formatNumber } from "@/lib/format";

const inr = (value: number): string => `₹${formatNumber(Math.round(value))}`;

const genericMin = 1000000;
const genericMax = 30000000;

export function EmiCalculator({ project }: { project?: Project }) {
  const priceMin = project?.priceMin ?? genericMin;
  const priceMax = project?.priceMax ?? genericMax;

  const [principal, setPrincipal] = useState(() =>
    project
      ? Math.round((project.priceMin * 0.8) / 100000) * 100000
      : Math.round((priceMax * 0.4) / 100000) * 100000,
  );
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);

  const loanMax = Math.max(priceMax, 1000000);
  const loanValue = Math.min(principal, loanMax);

  const { emi, totalPayable, totalInterest } = emiFor(principal, rate, tenure);

  return (
    <div className="grid gap-5 rounded-card-lg border border-navy-100 bg-white p-5 shadow-card sm:p-6 lg:grid-cols-[1fr_1fr]">
      <div className="space-y-4">
        <div>
          <div className="flex items-baseline justify-between gap-3">
            <label htmlFor="emi-principal" className="text-sm font-semibold text-navy-800">
              Loan amount
            </label>
            <output htmlFor="emi-principal" className="text-sm font-bold text-navy-900">
              {inr(principal)}
            </output>
          </div>
          <input
            id="emi-principal"
            type="range"
            min={500000}
            max={loanMax}
            step={100000}
            value={loanValue}
            onChange={(event) => setPrincipal(Number(event.target.value))}
            className="mt-2 w-full accent-brand-600"
          />
        </div>

        <div>
          <div className="flex items-baseline justify-between gap-3">
            <label htmlFor="emi-rate" className="text-sm font-semibold text-navy-800">
              Interest rate (p.a.)
            </label>
            <output htmlFor="emi-rate" className="text-sm font-bold text-navy-900">
              {rate.toFixed(1)}%
            </output>
          </div>
          <input
            id="emi-rate"
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
            <label htmlFor="emi-tenure" className="text-sm font-semibold text-navy-800">
              Tenure
            </label>
            <output htmlFor="emi-tenure" className="text-sm font-bold text-navy-900">
              {tenure} years
            </output>
          </div>
          <input
            id="emi-tenure"
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

      <div className="flex flex-col justify-center rounded-card bg-navy-900 p-5 text-white sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
          Monthly EMI
        </p>
        <p aria-live="polite" className="mt-1 text-2xl font-bold text-brand-400 sm:text-3xl">
          {inr(emi)}
        </p>
        <dl className="mt-4 space-y-2.5 border-t border-navy-700 pt-4 text-sm">
          <div className="flex items-baseline justify-between gap-3">
            <dt className="text-navy-300">Principal</dt>
            <dd className="font-semibold">{inr(principal)}</dd>
          </div>
          <div className="flex items-baseline justify-between gap-3">
            <dt className="text-navy-300">Total interest</dt>
            <dd className="font-semibold">{inr(totalInterest)}</dd>
          </div>
          <div className="flex items-baseline justify-between gap-3">
            <dt className="text-navy-300">Total payable</dt>
            <dd className="font-semibold">{inr(totalPayable)}</dd>
          </div>
        </dl>
        <p className="mt-4 text-xs leading-relaxed text-navy-400">
          Indicative only. Actual EMI depends on the lender&apos;s rate, fees and
          your eligibility.
        </p>
      </div>
    </div>
  );
}
