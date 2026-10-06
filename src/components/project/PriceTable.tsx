import type { Configuration } from "@/data/types";
import { formatArea, priceRangeLabel } from "@/lib/format";

export function PriceTable({ configurations }: { configurations: Configuration[] }) {
  if (configurations.length === 0) return null;

  return (
    <div className="overflow-hidden rounded-card-lg border border-navy-100">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[34rem] border-collapse text-left">
          <caption className="sr-only">
            Price range by configuration
          </caption>
          <thead>
            <tr className="bg-navy-900 text-white">
              <th scope="col" className="px-5 py-3.5 text-sm font-semibold">
                Configuration
              </th>
              <th scope="col" className="px-5 py-3.5 text-sm font-semibold">
                Carpet area
              </th>
              <th scope="col" className="px-5 py-3.5 text-sm font-semibold">
                Price range
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-100">
            {configurations.map((config) => (
              <tr key={config.label} className="bg-white even:bg-navy-50/50">
                <th
                  scope="row"
                  className="px-5 py-4 text-sm font-semibold text-navy-900"
                >
                  {config.label}
                </th>
                <td className="px-5 py-4 text-sm text-navy-700">
                  {formatArea(config.areaSqft)}
                </td>
                <td className="px-5 py-4 text-sm font-bold text-brand-700">
                  {priceRangeLabel(config.priceMin, config.priceMax)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="border-t border-navy-100 bg-navy-50 px-5 py-3 text-xs text-navy-500">
        Prices are indicative and exclude maintenance, floor rise, stamp duty,
        registration and GST. Final pricing is confirmed at booking.
      </p>
    </div>
  );
}