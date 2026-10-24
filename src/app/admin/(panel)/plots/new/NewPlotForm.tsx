"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createPlotAction } from "@/lib/actions/plots";
import { FormField, inputCls, selectCls, textareaCls } from "@/components/admin/FormField";
import type { RepoProject } from "@/lib/repositories/projects";

interface Props {
  projects: RepoProject[];
}

export function NewPlotForm({ projects }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    projectId: projects[0]?.id ?? "",
    plotNumber: "",
    areaSqYards: 200,
    price: 0,
    status: "available" as const,
    dimensions: "30x60 ft",
    facing: "East",
    corner: false,
    roadFacing: false,
    commercialFacing: false,
    notes: "",
  });

  function set(key: string, value: unknown) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await createPlotAction({
      projectId: form.projectId,
      plotNumber: form.plotNumber,
      areaSqYards: Number(form.areaSqYards),
      price: Number(form.price),
      status: form.status,
      dimensions: form.dimensions || undefined,
      facing: form.facing || undefined,
      corner: form.corner,
      roadFacing: form.roadFacing,
      commercialFacing: form.commercialFacing,
      notes: form.notes || undefined,
    });

    setLoading(false);
    if (res.ok) {
      router.push(`/admin/plots?projectId=${encodeURIComponent(form.projectId)}`);
    } else {
      setError(res.error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-navy-100 p-6 space-y-5 shadow-xs">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      <FormField label="Project" required>
        <select
          className={selectCls}
          required
          value={form.projectId}
          onChange={(e) => set("projectId", e.target.value)}
        >
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} ({p.locality})
            </option>
          ))}
        </select>
      </FormField>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Plot Number" required hint="e.g. 14, 25B">
          <input
            className={inputCls}
            required
            value={form.plotNumber}
            onChange={(e) => set("plotNumber", e.target.value)}
            placeholder="14"
          />
        </FormField>
        <FormField label="Area (Sq. Yards)" required>
          <input
            type="number"
            className={inputCls}
            required
            value={form.areaSqYards}
            onChange={(e) => set("areaSqYards", Number(e.target.value))}
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Price (₹)" required>
          <input
            type="number"
            className={inputCls}
            required
            value={form.price}
            onChange={(e) => set("price", Number(e.target.value))}
          />
        </FormField>
        <FormField label="Status" required>
          <select
            className={selectCls}
            value={form.status}
            onChange={(e) => set("status", e.target.value)}
          >
            <option value="available">Available</option>
            <option value="held">Held</option>
            <option value="booked">Booked</option>
            <option value="sold">Sold</option>
          </select>
        </FormField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Dimensions" hint="e.g. 30x60 ft">
          <input
            className={inputCls}
            value={form.dimensions}
            onChange={(e) => set("dimensions", e.target.value)}
          />
        </FormField>
        <FormField label="Facing">
          <select
            className={selectCls}
            value={form.facing}
            onChange={(e) => set("facing", e.target.value)}
          >
            <option value="East">East</option>
            <option value="West">West</option>
            <option value="North">North</option>
            <option value="South">South</option>
            <option value="North-East">North-East</option>
            <option value="North-West">North-West</option>
          </select>
        </FormField>
      </div>

      <div className="space-y-2 pt-1">
        <label className="block text-sm font-medium text-navy-700">Plot Attributes</label>
        <div className="flex gap-6 flex-wrap">
          <label className="flex items-center gap-2 text-sm text-navy-700 cursor-pointer">
            <input
              type="checkbox"
              checked={form.corner}
              onChange={(e) => set("corner", e.target.checked)}
              className="rounded border-navy-300 text-brand-500 focus:ring-brand-400"
            />
            Corner Plot
          </label>
          <label className="flex items-center gap-2 text-sm text-navy-700 cursor-pointer">
            <input
              type="checkbox"
              checked={form.roadFacing}
              onChange={(e) => set("roadFacing", e.target.checked)}
              className="rounded border-navy-300 text-brand-500 focus:ring-brand-400"
            />
            Main Road Facing
          </label>
          <label className="flex items-center gap-2 text-sm text-navy-700 cursor-pointer">
            <input
              type="checkbox"
              checked={form.commercialFacing}
              onChange={(e) => set("commercialFacing", e.target.checked)}
              className="rounded border-navy-300 text-brand-500 focus:ring-brand-400"
            />
            Commercial Facing
          </label>
        </div>
      </div>

      <FormField label="Notes / Special Remarks">
        <textarea
          className={textareaCls}
          rows={3}
          value={form.notes}
          onChange={(e) => set("notes", e.target.value)}
          placeholder="Adjacent to community park, clear title"
        />
      </FormField>

      <div className="flex items-center justify-between pt-2">
        <Link href="/admin/plots" className="text-navy-400 hover:text-navy-700 text-sm">
          Cancel
        </Link>
        <button
          type="submit"
          disabled={loading}
          className="bg-brand-500 hover:bg-brand-400 disabled:opacity-60 text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors cursor-pointer"
        >
          {loading ? "Creating…" : "Create Plot"}
        </button>
      </div>
    </form>
  );
}
