"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { RepoPlot } from "@/lib/repositories/plots";
import { updatePlotAction, deletePlotAction } from "@/lib/actions/plots";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { formatPrice } from "@/lib/format";

interface Props {
  plots: (RepoPlot & { projectName?: string })[];
}

export function PlotsTable({ plots: initialPlots }: Props) {
  const router = useRouter();
  const [plots, setPlots] = useState(initialPlots);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  async function handleStatusChange(id: string, status: RepoPlot["status"]) {
    setLoadingId(id);
    const res = await updatePlotAction(id, { status });
    if (res.ok) {
      setPlots((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status } : p))
      );
      router.refresh();
    } else {
      alert(res.error);
    }
    setLoadingId(null);
  }

  async function handleDelete(id: string, plotNumber: string) {
    if (!confirm(`Delete plot #${plotNumber}?`)) return;
    setLoadingId(id);
    const res = await deletePlotAction(id);
    if (res.ok) {
      setPlots((prev) => prev.filter((p) => p.id !== id));
      router.refresh();
    } else {
      alert(res.error);
    }
    setLoadingId(null);
  }

  if (plots.length === 0) {
    return <p className="text-center text-navy-400 py-12">No plots found for this filter.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-navy-50 text-navy-600 text-xs uppercase tracking-wide">
          <tr>
            <th className="px-4 py-3 text-left">Plot #</th>
            <th className="px-4 py-3 text-left">Project</th>
            <th className="px-4 py-3 text-left">Area</th>
            <th className="px-4 py-3 text-left">Facing / Dim</th>
            <th className="px-4 py-3 text-left">Attributes</th>
            <th className="px-4 py-3 text-left">Price</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Update Status</th>
            <th className="px-4 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-navy-50">
          {plots.map((p) => (
            <tr key={p.id} className="hover:bg-navy-50/40 transition-colors">
              <td className="px-4 py-3 font-semibold text-navy-900">#{p.plotNumber}</td>
              <td className="px-4 py-3 text-navy-600">{p.projectName ?? p.projectId}</td>
              <td className="px-4 py-3 text-navy-600">{p.areaSqYards} sq.yd</td>
              <td className="px-4 py-3 text-navy-600">
                {p.facing ?? "-"} {p.dimensions ? `(${p.dimensions})` : ""}
              </td>
              <td className="px-4 py-3 text-navy-500 text-xs">
                <div className="flex gap-1 flex-wrap">
                  {p.corner && (
                    <span className="bg-navy-100 text-navy-800 px-1.5 py-0.5 rounded">Corner</span>
                  )}
                  {p.roadFacing && (
                    <span className="bg-navy-100 text-navy-800 px-1.5 py-0.5 rounded">Road</span>
                  )}
                  {p.commercialFacing && (
                    <span className="bg-brand-50 text-brand-800 px-1.5 py-0.5 rounded">Comm</span>
                  )}
                </div>
              </td>
              <td className="px-4 py-3 text-navy-900 font-medium">
                {formatPrice(p.price)}
              </td>
              <td className="px-4 py-3">
                <StatusBadge status={p.status} />
              </td>
              <td className="px-4 py-3">
                <select
                  value={p.status}
                  disabled={loadingId === p.id}
                  onChange={(e) => handleStatusChange(p.id, e.target.value as RepoPlot["status"])}
                  className="rounded border border-navy-200 bg-white px-2 py-1 text-xs text-navy-700 focus:outline-none focus:ring-1 focus:ring-brand-400 cursor-pointer disabled:opacity-50"
                >
                  <option value="available">Available</option>
                  <option value="held">Held</option>
                  <option value="booked">Booked</option>
                  <option value="sold">Sold</option>
                </select>
              </td>
              <td className="px-4 py-3">
                <button
                  type="button"
                  disabled={loadingId === p.id}
                  onClick={() => handleDelete(p.id, p.plotNumber)}
                  className="text-red-600 hover:text-red-800 text-xs font-medium cursor-pointer disabled:opacity-50"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
