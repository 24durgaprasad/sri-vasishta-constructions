"use client";

import { useId } from "react";
import { useRouter } from "next/navigation";
import type { FilterItem } from "./ListingFilters";

const withParams = (href: string, extra: Record<string, string | undefined>) => {
  const [path, existing = ""] = href.split("?");
  const params = new URLSearchParams(existing);

  Object.entries(extra).forEach(([key, value]) => {
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
  });

  const query = params.toString();
  return query ? `${path}?${query}` : path;
};

type Props = {
  items: FilterItem[];
  extraParams?: Record<string, string | undefined>;
  label: string;
  variant?: "light" | "onDark";
};

export function FilterSelect({ items, extraParams = {}, label, variant = "light" }: Props) {
  const router = useRouter();
  const selectId = useId();
  const onDark = variant === "onDark";
  const active = items.find((item) => item.active) ?? items[0];

  return (
    <div className="min-w-0">
      <label
        htmlFor={selectId}
        className={`mb-2 block text-xs font-semibold uppercase tracking-wider ${
          onDark ? "text-navy-300" : "text-navy-500"
        }`}
      >
        {label.replace(/^Filter by /, "")}
      </label>
      <span className="relative block">
        <select
          id={selectId}
          aria-label={label}
          value={active?.label ?? ""}
          onChange={(event) => {
            const item = items.find((entry) => entry.label === event.target.value);
            if (!item) return;
            router.push(withParams(item.href, { ...extraParams, ...item.params }));
          }}
          className={`min-h-11 w-full appearance-none rounded-xl border pr-10 pl-4 text-sm font-medium transition focus:outline-none ${
            onDark
              ? "border-white/25 bg-white/10 text-white backdrop-blur-sm hover:border-white/50 [color-scheme:dark]"
              : "border-navy-200 bg-white text-navy-800 hover:border-navy-400"
          }`}
        >
          {items.map((item) => (
            <option key={item.label} value={item.label} className="text-navy-900">
              {item.label}
            </option>
          ))}
        </select>
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          fill="none"
          className={`pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 ${
            onDark ? "text-white" : "text-navy-500"
          }`}
        >
          <path
            d="m5 8 5 5 5-5"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </div>
  );
}
