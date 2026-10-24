"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProjectAction } from "@/lib/actions/projects";
import { FormField, inputCls, selectCls } from "@/components/admin/FormField";

export default function NewProjectPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    slug: "",
    locality: "",
    city: "Visakhapatnam",
    propertyType: "flats",
    status: "under-construction",
    priceMin: 0,
    priceMax: 0,
    published: false,
    collections: [] as ("topPicks" | "highlighted" | "highDemand")[],
    description: "",
    developer: "Sri Vasishta Constructions",
  });

  function set(key: string, value: unknown) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function autoSlug(name: string) {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await createProjectAction({
      ...form,
      highlights: [],
      configurations: [],
      amenities: [],
      faqs: [],
      nearby: [],
      images: [],
    });
    if (res.ok) {
      router.push(`/admin/projects/${res.data.id}/edit`);
    } else {
      setError(res.error);
    }
    setLoading(false);
  }

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => router.back()}
          type="button"
          className="text-navy-400 hover:text-navy-700 text-sm cursor-pointer"
        >
          ← Back
        </button>
        <h1 className="text-2xl font-bold text-navy-900">New Project</h1>
      </div>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-navy-100 p-6 space-y-5 shadow-xs">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
            {error}
          </div>
        )}
        <FormField label="Project Name" required>
          <input
            className={inputCls}
            required
            value={form.name}
            onChange={(e) => {
              set("name", e.target.value);
              set("slug", autoSlug(e.target.value));
            }}
            placeholder="Vasishta Grandeur"
          />
        </FormField>
        <FormField label="Slug" required hint="URL identifier — auto-generated from name">
          <input
            className={inputCls}
            required
            value={form.slug}
            onChange={(e) => set("slug", e.target.value)}
            placeholder="vasishta-grandeur"
            pattern="[a-z0-9-]+"
          />
        </FormField>
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Locality" required>
            <input
              className={inputCls}
              required
              value={form.locality}
              onChange={(e) => set("locality", e.target.value)}
              placeholder="Madhurawada"
            />
          </FormField>
          <FormField label="City" required>
            <input
              className={inputCls}
              required
              value={form.city}
              onChange={(e) => set("city", e.target.value)}
            />
          </FormField>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Property Type">
            <select
              className={selectCls}
              value={form.propertyType}
              onChange={(e) => set("propertyType", e.target.value)}
            >
              <option value="flats">Flats</option>
              <option value="houses">Houses</option>
              <option value="villas">Villas</option>
              <option value="plots">Plots</option>
              <option value="commercial">Commercial</option>
            </select>
          </FormField>
          <FormField label="Status">
            <select
              className={selectCls}
              value={form.status}
              onChange={(e) => set("status", e.target.value)}
            >
              <option value="upcoming">Upcoming</option>
              <option value="under-construction">Under Construction</option>
              <option value="ready">Ready to Move</option>
              <option value="completed">Completed</option>
              <option value="sold-out">Sold Out</option>
            </select>
          </FormField>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Min Price (₹)">
            <input
              type="number"
              className={inputCls}
              value={form.priceMin}
              onChange={(e) => set("priceMin", Number(e.target.value))}
            />
          </FormField>
          <FormField label="Max Price (₹)">
            <input
              type="number"
              className={inputCls}
              value={form.priceMax}
              onChange={(e) => set("priceMax", Number(e.target.value))}
            />
          </FormField>
        </div>
        <FormField label="Short Description">
          <textarea
            className={inputCls + " resize-none"}
            rows={3}
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
          />
        </FormField>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="published"
            checked={form.published}
            onChange={(e) => set("published", e.target.checked)}
            className="rounded border-navy-300 text-brand-500 focus:ring-brand-400"
          />
          <label htmlFor="published" className="text-sm text-navy-700">
            Publish immediately
          </label>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-brand-500 hover:bg-brand-400 disabled:opacity-60 text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors cursor-pointer"
        >
          {loading ? "Creating…" : "Create Project"}
        </button>
      </form>
    </div>
  );
}
