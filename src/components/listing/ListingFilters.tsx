import Link from "next/link";

export type FilterItem = {
  label: string;
  href: string;
  active?: boolean;
  params?: Record<string, string | undefined>;
};

type Props = {
  items: FilterItem[];
  extraParams?: Record<string, string | undefined>;
  label: string;
};

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

export function ListingFilters({ items, extraParams = {}, label }: Props) {
  return (
    <nav aria-label={label} className="flex flex-wrap gap-2">
      {items.map((item) => {
        const href = withParams(item.href, { ...extraParams, ...item.params });
        return (
          <Link
            key={item.label}
            href={href}
            aria-current={item.active ? "true" : undefined}
            className={`min-h-11 rounded-full border px-4 py-2 text-sm font-medium transition sm:min-h-0 ${
              item.active
                ? "border-navy-900 bg-navy-900 text-white"
                : "border-navy-200 bg-white text-navy-700 hover:border-navy-400 hover:text-navy-900"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
