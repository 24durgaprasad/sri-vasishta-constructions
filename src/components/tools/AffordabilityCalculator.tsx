"use client";

import { useState } from "react";
import { formatNumber } from "@/lib/format";

const inr = (value: number): string => `₹${formatNumber(Math.round(value))}`;

export function AffordabilityCalculator() {
  const [income, setIncome] = useState(120000);
  const [expenses, setExpenses] = useState(45000);
  const [obligations, setObligations] = useState(10000);
  const [savings, setSavings] = useState(2000000);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);

  const surplus = Math.max(income - expenses - obligations, 0);
  // Keep a third of the surplus as a buffer before committing to an EMI.
  const emiBudget = surplus * 0.66;

  const monthlyRate = rate / 1200;
  const months = tenure * 12;
  const factor = (1 + monthlyRate) ** months;
  const loan =
    monthlyRate > 0
      ? (emiBudget * (factor - 1)) / factor
      : emiBudget * months;

  const budget = loan + savings;

  return (
    <div className="grid gap-8 rounded-card-lg border border-navy-100 bg-white p-6 shadow-card sm:p-8 lg:grid-cols-[1fr_1fr]">
      <div className="space-y-6">
        <div>
          <div className="flex items-baseline justify-between gap-3">
            <label htmlFor="aff-income" className="text-sm font-semibold text-navy-800">
              Net monthly income
            </label>
            <output htmlFor="aff-income" className="text-sm font-bold text-navy-900">
              {inr(income)}
            </output>
          </div>
          <input
            id="aff-income"
            type="range"
            min={25000}
            max={1000000}
            step={5000}
            value={income}
            onChange={(event) => setIncome(Number(event.target.value))}
            className="mt-2 w-full accent-brand-600"
          />
        </div>

        <div>
          <div className="flex items-baseline justify-between gap-3">
            <label htmlFor="aff-expenses" className="text-sm font-semibold text-navy-800">
              Monthly household expenses
            </label>
            <output htmlFor="aff-expenses" className="text-sm font-bold text-navy-900">
              {inr(expenses)}
            </output>
          </div>
          <input
            id="aff-expenses"
            type="range"
            min={0}
            max={400000}
            step={1000}
            value={expenses}
            onChange={(event) => setExpenses(Number(event.target.value))}
            className="mt-2 w-full accent-brand-600"
          />
        </div>

        <div>
          <div className="flex items-baseline justify-between gap-3">
            <label htmlFor="aff-obligations" className="text-sm font-semibold text-navy-800">
              Existing EMIs
            </label>
            <output htmlFor="aff-obligations" className="text-sm font-bold text-navy-900">
              {inr(obligations)}
            </output>
          </div>
          <input
            id="aff-obligations"
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
            <label htmlFor="aff-savings" className="text-sm font-semibold text-navy-800">
              Savings for down payment
            </label>
            <output htmlFor="aff-savings" className="text-sm font-bold text-navy-900">
              {inr(savings)}
            </output>
          </div>
          <input
            id="aff-savings"
            type="range"
            min={0}
            max={30000000}
            step={100000}
            value={savings}
            onChange={(event) => setSavings(Number(event.target.value))}
            className="mt-2 w-full accent-brand-600"
          />
        </div>

        <div>
          <div className="flex items-baseline justify-between gap-3">
            <label htmlFor="aff-rate" className="text-sm font-semibold text-navy-800">
              Interest rate (p.a.)
            </label>
            <output htmlFor="aff-rate" className="text-sm font-bold text-navy-900">
              {rate.toFixed(1)}%
            </output>
          </div>
          <input
            id="aff-rate"
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
            <label htmlFor="aff-tenure" className="text-sm font-semibold text-navy-800">
              Tenure
            </label>
            <output htmlFor="aff-tenure" className="text-sm font-bold text-navy-900">
              {tenure} years
            </output>
          </div>
          <input
            id="aff-tenure"
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
          Affordable property budget
        </p>
        <p aria-live="polite" className="mt-1 text-3xl font-bold text-brand-400">
          {inr(budget)}
        </p>
        <dl className="mt-5 space-y-3 border-t border-navy-700 pt-5 text-sm">
          <div className="flex items-baseline justify-between gap-3">
            <dt className="text-navy-300">Loan you can carry</dt>
            <dd className="font-semibold">{inr(loan)}</dd>
          </div>
          <div className="flex items-baseline justify-between gap-3">
            <dt className="text-navy-300">Down payment from savings</dt>
            <dd className="font-semibold">{inr(savings)}</dd>
          </div>
          <div className="flex items-baseline justify-between gap-3">
            <dt className="text-navy-300">EMI within budget</dt>
            <dd className="font-semibold">{inr(emiBudget)}</dd>
          </div>
        </dl>
        <p className="mt-5 text-xs leading-relaxed text-navy-400">
          Leaves about a third of your free cash as a buffer. Government charges,
          registration and furnishing are extra — treat this as a starting range.
        </p>
      </div>
    </div>
  );
}
