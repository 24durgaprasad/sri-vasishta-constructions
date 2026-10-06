import type { FaqItem } from "@/data/types";

export function FaqList({ items }: { items: FaqItem[] }) {
  if (items.length === 0) return null;

  return (
    <div className="divide-y divide-navy-100 overflow-hidden rounded-card-lg border border-navy-100 bg-white">
      {items.map((item) => (
        <details key={item.question} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-semibold text-navy-900 marker:hidden hover:bg-navy-50/60">
            <span>{item.question}</span>
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              fill="none"
              className="size-4 shrink-0 text-navy-500 transition group-open:rotate-180"
            >
              <path
                d="m5 8 5 5 5-5"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </summary>
          <p className="px-5 pb-5 text-sm leading-relaxed text-navy-600">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}