"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { RepoUnit } from "@/lib/repositories/units";
import { updateUnitAction, deleteUnitAction } from "@/lib/actions/units";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { formatPrice } from "@/lib/format";

interface Props {
  units: (RepoUnit & { projectName?: string })[];
}

export function UnitsTable({ units: initialUnits }: Props) {
  const router = useRouter();
  const [units, setUnits] = useState(initialUnits);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  async function handleStatusChange(id: string, status: RepoUnit["status"]) {
    setLoadingId(id);
    const res = await updateUnitAction(id, { status });
    if (res.ok) {
      setUnits((prev) =>
        prev.map((u) => (u.id === id ? { ...u, status } : u))
      );
      router.refresh();
    } else {
      alert(res.error);
    }
    setLoadingId(null);
  }

  async function handleDelete(id: string, unitNumber: string) {
    if (!confirm(`Delete unit ${unitNumber}?`)) return;
    setLoadingId(id);
    const res = await deleteUnitAction(id);
    if (res.ok) {
      setUnits((prev) => prev.filter((u) => u.id !== id));
      router.refresh();
    } else {
      alert(res.error);
    }
    setLoadingId(null);
  }

  if (units.length === 0) {
    return <p className="text-center text-navy-400 py-12">No units found for this filter.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-navy-50 text-navy-600 text-xs uppercase tracking-wide">
          <tr>
            <th className="px-4 py-3 text-left">Unit #</th>
            <th className="px-4 py-3 text-left">Project</th>
            <th className="px-4 py-3 text-left">Config</th>
            <th className="px-4 py-3 text-left">Tower / Floor</th>
            <th className="px-4 py-3 text-left">Area</th>
            <th className="px-4 py-3 text-left">Price</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Update Status</th>
            <th className="px-4 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-navy-50">
          {units.map((u) => (
            <tr key={u.id} className="hover:bg-navy-50/40 transition-colors">
              <td className="px-4 py-3 font-semibold text-navy-900">{u.unitNumber}</td>
              <td className="px-4 py-3 text-navy-600">{u.projectName ?? u.projectId}</td>
              <td className="px-4 py-3 text-navy-600 font-medium">{u.configuration}</td>
              <td className="px-4 py-3 text-navy-600">
                {u.tower ? `T${u.tower}` : "-"} {u.floor !== undefined ? `/ F${u.floor}` : ""}
              </td>
              <td className="px-4 py-3 text-navy-600">
                {u.carpetArea ? `${u.carpetArea} sq.ft` : u.builtUpArea ? `${u.builtUpArea} sq.ft` : "-"}
              </td>
              <td className="px-4 py-3 text-navy-900 font-medium">
                {formatPrice(u.price)}
              </td>
              <td className="px-4 py-3">
                <StatusBadge status={u.status} />
              </td>
              <td className="px-4 py-3">
                <select
                  value={u.status}
                  disabled={loadingId === u.id}
                  onChange={(e) => handleStatusChange(u.id, e.target.value as RepoUnit["status"])}
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
                  disabled={loadingId === u.id}
                  onClick={() => handleDelete(u.id, u.unitNumber)}
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
