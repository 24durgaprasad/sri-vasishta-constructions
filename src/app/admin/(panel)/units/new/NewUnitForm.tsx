"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createUnitAction } from "@/lib/actions/units";
import { FormField, inputCls, selectCls, textareaCls } from "@/components/admin/FormField";
import type { RepoProject } from "@/lib/repositories/projects";

interface Props {
  projects: RepoProject[];
}

export function NewUnitForm({ projects }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    projectId: projects[0]?.id ?? "",
    unitNumber: "",
    configuration: "3 BHK",
    price: 0,
    status: "available" as const,
    tower: "",
    floor: 1,
    carpetArea: 1200,
    builtUpArea: 1550,
    facing: "East",
    featuresText: "",
  });

  function set(key: string, value: unknown) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const features = form.featuresText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    const res = await createUnitAction({
      projectId: form.projectId,
      unitNumber: form.unitNumber,
      configuration: form.configuration,
      price: Number(form.price),
      status: form.status,
      tower: form.tower || undefined,
      floor: Number(form.floor) || undefined,
      carpetArea: Number(form.carpetArea) || undefined,
      builtUpArea: Number(form.builtUpArea) || undefined,
      facing: form.facing || undefined,
      features: features.length ? features : undefined,
    });

    setLoading(false);
    if (res.ok) {
      router.push(`/admin/units?projectId=${encodeURIComponent(form.projectId)}`);
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
        <FormField label="Unit Number" required hint="e.g. 402, B-1204">
          <input
            className={inputCls}
            required
            value={form.unitNumber}
            onChange={(e) => set("unitNumber", e.target.value)}
            placeholder="402"
          />
        </FormField>
        <FormField label="Configuration" required hint="e.g. 2 BHK, 3 BHK Luxury">
          <input
            className={inputCls}
            required
            value={form.configuration}
            onChange={(e) => set("configuration", e.target.value)}
            placeholder="3 BHK"
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField label="Tower / Block">
          <input
            className={inputCls}
            value={form.tower}
            onChange={(e) => set("tower", e.target.value)}
            placeholder="A"
          />
        </FormField>
        <FormField label="Floor Number">
          <input
            type="number"
            className={inputCls}
            value={form.floor}
            onChange={(e) => set("floor", Number(e.target.value))}
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Carpet Area (sq.ft)">
          <input
            type="number"
            className={inputCls}
            value={form.carpetArea}
            onChange={(e) => set("carpetArea", Number(e.target.value))}
          />
        </FormField>
        <FormField label="Built-Up Area (sq.ft)">
          <input
            type="number"
            className={inputCls}
            value={form.builtUpArea}
            onChange={(e) => set("builtUpArea", Number(e.target.value))}
          />
        </FormField>
      </div>

      <FormField label="Key Features" hint="One feature per line">
        <textarea
          className={textareaCls}
          rows={3}
          value={form.featuresText}
          onChange={(e) => set("featuresText", e.target.value)}
          placeholder="Sea View&#10;Corner Balcony&#10;Extended Foyer"
        />
      </FormField>

      <div className="flex items-center justify-between pt-2">
        <Link href="/admin/units" className="text-navy-400 hover:text-navy-700 text-sm">
          Cancel
        </Link>
        <button
          type="submit"
          disabled={loading}
          className="bg-brand-500 hover:bg-brand-400 disabled:opacity-60 text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors cursor-pointer"
        >
          {loading ? "Creating…" : "Create Unit"}
        </button>
      </div>
    </form>
  );
}
