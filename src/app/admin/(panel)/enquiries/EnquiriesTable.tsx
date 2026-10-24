"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { RepoEnquiry } from "@/lib/repositories/enquiries";
import { updateEnquiryStatusAction } from "@/lib/actions/enquiries";
import { StatusBadge } from "@/components/admin/StatusBadge";

interface Props {
  enquiries: RepoEnquiry[];
}

export function EnquiriesTable({ enquiries: initialEnquiries }: Props) {
  const router = useRouter();
  const [enquiries, setEnquiries] = useState(initialEnquiries);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  async function handleStatusChange(
    id: string,
    status: "new" | "contacted" | "closed"
  ) {
    setLoadingId(id);
    const res = await updateEnquiryStatusAction(id, status);
    if (res.ok) {
      setEnquiries((prev) =>
        prev.map((e) => (e.id === id ? { ...e, status } : e))
      );
      router.refresh();
    } else {
      alert(res.error);
    }
    setLoadingId(null);
  }

  function formatDate(iso?: string) {
    if (!iso) return "-";
    try {
      const d = new Date(iso);
      return d.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return iso;
    }
  }

  if (enquiries.length === 0) {
    return <p className="text-center text-navy-400 py-12">No enquiries match this filter.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-navy-50 text-navy-600 text-xs uppercase tracking-wide">
          <tr>
            <th className="px-4 py-3 text-left">Date</th>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Contact</th>
            <th className="px-4 py-3 text-left">Topic / Project</th>
            <th className="px-4 py-3 text-left">Message</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Update Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-navy-50">
          {enquiries.map((e) => (
            <tr key={e.id} className="hover:bg-navy-50/40 transition-colors">
              <td className="px-4 py-3 text-navy-500 whitespace-nowrap text-xs">
                {formatDate(e.createdAt)}
              </td>
              <td className="px-4 py-3 font-semibold text-navy-900">{e.name}</td>
              <td className="px-4 py-3 text-navy-600 text-xs">
                <div>
                  <a
                    href={`tel:${e.phone}`}
                    className="text-navy-900 font-medium hover:text-brand-600 transition-colors"
                  >
                    {e.phone}
                  </a>
                </div>
                {e.email && (
                  <div className="text-navy-400 truncate max-w-[160px]">
                    <a href={`mailto:${e.email}`} className="hover:underline">
                      {e.email}
                    </a>
                  </div>
                )}
              </td>
              <td className="px-4 py-3 text-navy-700 text-xs">
                <span className="inline-block px-1.5 py-0.5 rounded bg-navy-100 text-navy-800 font-medium capitalize mr-1">
                  {e.topic}
                </span>
                {e.project && <span className="text-navy-500">{e.project}</span>}
                {e.configuration && (
                  <span className="block text-[11px] text-navy-400 mt-0.5">
                    {e.configuration}
                  </span>
                )}
              </td>
              <td className="px-4 py-3 text-navy-600 text-xs max-w-xs">
                <p className="line-clamp-2" title={e.message}>
                  {e.message || "-"}
                </p>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <StatusBadge status={e.status} />
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <select
                  value={e.status}
                  disabled={loadingId === e.id}
                  onChange={(evt) =>
                    handleStatusChange(
                      e.id,
                      evt.target.value as "new" | "contacted" | "closed"
                    )
                  }
                  className="rounded border border-navy-200 bg-white px-2 py-1 text-xs text-navy-700 focus:outline-none focus:ring-1 focus:ring-brand-400 cursor-pointer disabled:opacity-50"
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="closed">Closed</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
