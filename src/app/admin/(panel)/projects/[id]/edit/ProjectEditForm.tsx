"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { RepoProject } from "@/lib/repositories/projects";
import { updateProjectAction, deleteProjectAction } from "@/lib/actions/projects";
import { FormField, inputCls, selectCls, textareaCls } from "@/components/admin/FormField";

interface Props {
  project: RepoProject;
}

export default function ProjectEditForm({ project }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [form, setForm] = useState({
    name: project.name,
    slug: project.slug,
    developer: project.developer || "Sri Vasishta Constructions",
    propertyType: project.propertyType || "flats",
    status: project.status || "under-construction",
    badge: project.badge ?? "",
    locality: project.locality,
    city: project.city,
    address: project.address ?? "",
    description: project.description ?? "",
    priceMin: project.priceMin ?? 0,
    priceMax: project.priceMax ?? 0,
    pricePerSqft: project.pricePerSqft ?? 0,
    carpetMin: project.carpetMin ?? 0,
    carpetMax: project.carpetMax ?? 0,
    landAreaAcres: project.landAreaAcres ?? 0,
    towers: project.towers ?? 0,
    totalUnits: project.totalUnits ?? 0,
    launchDate: project.launchDate ?? "",
    possessionDate: project.possessionDate ?? "",
    reraId: project.reraId ?? "",
    brochureUrl: project.brochureUrl ?? "",
    tourUrl: project.tourUrl ?? "",
    localityPricePerSqft: project.localityPricePerSqft ?? 0,
    localityPriceTrend: project.localityPriceTrend ?? 0,
    published: project.published,
    collections: project.collections ?? [],
    highlightsText: (project.highlights ?? []).join("\n"),
    imagesText: (project.images ?? []).join("\n"),
    seoTitle: project.seo?.title ?? "",
    seoDescription: project.seo?.description ?? "",
    seoKeywords: (project.seo?.keywords ?? []).join(", "),
  });

  function set(key: string, value: unknown) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleCollectionToggle(col: string) {
    const current = new Set(form.collections);
    if (current.has(col)) {
      current.delete(col);
    } else {
      current.add(col);
    }
    set("collections", Array.from(current));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const highlights = form.highlightsText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    const images = form.imagesText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    const keywords = form.seoKeywords
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const payload: Partial<RepoProject> = {
      name: form.name,
      slug: form.slug,
      developer: form.developer,
      propertyType: form.propertyType,
      status: form.status,
      badge: form.badge || undefined,
      locality: form.locality,
      city: form.city,
      address: form.address || undefined,
      description: form.description,
      priceMin: Number(form.priceMin),
      priceMax: Number(form.priceMax),
      pricePerSqft: Number(form.pricePerSqft) || undefined,
      carpetMin: Number(form.carpetMin) || undefined,
      carpetMax: Number(form.carpetMax) || undefined,
      landAreaAcres: Number(form.landAreaAcres) || undefined,
      towers: Number(form.towers) || undefined,
      totalUnits: Number(form.totalUnits) || undefined,
      launchDate: form.launchDate || undefined,
      possessionDate: form.possessionDate || undefined,
      reraId: form.reraId || undefined,
      brochureUrl: form.brochureUrl || undefined,
      tourUrl: form.tourUrl || undefined,
      localityPricePerSqft: Number(form.localityPricePerSqft) || undefined,
      localityPriceTrend: Number(form.localityPriceTrend) || undefined,
      published: Boolean(form.published),
      collections: form.collections,
      highlights,
      images,
      seo: {
        title: form.seoTitle || undefined,
        description: form.seoDescription || undefined,
        keywords: keywords.length ? keywords : undefined,
      },
    };

    const res = await updateProjectAction(project.id, payload);
    setLoading(false);

    if (res.ok) {
      setMessage({ type: "success", text: "Project updated successfully!" });
      router.refresh();
    } else {
      setMessage({ type: "error", text: res.error });
    }
  }

  async function handleDelete() {
    if (!confirm(`Are you sure you want to permanently delete "${project.name}"?`)) {
      return;
    }
    setDeleteLoading(true);
    const res = await deleteProjectAction(project.id);
    if (res.ok) {
      router.push("/admin/projects");
    } else {
      alert(res.error);
      setDeleteLoading(false);
    }
  }

  return (
    <div className="max-w-4xl pb-16">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link href="/admin/projects" className="text-navy-400 hover:text-navy-700 text-sm">
            ← Projects
          </Link>
          <h1 className="text-2xl font-bold text-navy-900">Edit {project.name}</h1>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={`/admin/projects/${project.id}/media`}
            className="text-navy-700 bg-white border border-navy-200 hover:bg-navy-50 text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            Media Manager
          </Link>
          <Link
            href={`/projects/${project.slug}`}
            target="_blank"
            className="text-brand-600 bg-brand-50 border border-brand-200 hover:bg-brand-100 text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            View Live ↗
          </Link>
        </div>
      </div>

      {message && (
        <div
          className={`mb-6 p-4 rounded-xl text-sm border ${
            message.type === "success"
              ? "bg-green-50 border-green-200 text-green-800"
              : "bg-red-50 border-red-200 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white rounded-xl border border-navy-100 p-6 space-y-4 shadow-xs">
          <h2 className="text-lg font-semibold text-navy-900 border-b border-navy-50 pb-3">
            Basic Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Project Name" required>
              <input
                className={inputCls}
                required
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
              />
            </FormField>
            <FormField label="Slug" required hint="URL slug (must be unique)">
              <input
                className={inputCls}
                required
                value={form.slug}
                onChange={(e) => set("slug", e.target.value)}
              />
            </FormField>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField label="Developer">
              <input
                className={inputCls}
                value={form.developer}
                onChange={(e) => set("developer", e.target.value)}
              />
            </FormField>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField label="Locality" required>
              <input
                className={inputCls}
                required
                value={form.locality}
                onChange={(e) => set("locality", e.target.value)}
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
            <FormField label="Badge" hint="e.g. 'Ultra Luxury' or 'New Launch'">
              <input
                className={inputCls}
                value={form.badge}
                onChange={(e) => set("badge", e.target.value)}
              />
            </FormField>
          </div>

          <FormField label="Full Address">
            <input
              className={inputCls}
              value={form.address}
              onChange={(e) => set("address", e.target.value)}
              placeholder="e.g. Sy No. 42, Kommadi Road, Madhurawada"
            />
          </FormField>

          <FormField label="Collections">
            <div className="flex gap-4 pt-1">
              {[
                { id: "topPicks", label: "Top Picks" },
                { id: "highlighted", label: "Highlighted" },
                { id: "highDemand", label: "High Demand" },
              ].map((c) => (
                <label key={c.id} className="flex items-center gap-2 text-sm text-navy-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.collections.includes(c.id)}
                    onChange={() => handleCollectionToggle(c.id)}
                    className="rounded border-navy-300 text-brand-500 focus:ring-brand-400"
                  />
                  {c.label}
                </label>
              ))}
            </div>
          </FormField>
        </div>

        {/* Pricing & Area */}
        <div className="bg-white rounded-xl border border-navy-100 p-6 space-y-4 shadow-xs">
          <h2 className="text-lg font-semibold text-navy-900 border-b border-navy-50 pb-3">
            Pricing & Spec Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField label="Price Min (₹)" required>
              <input
                type="number"
                className={inputCls}
                value={form.priceMin}
                onChange={(e) => set("priceMin", e.target.value)}
              />
            </FormField>
            <FormField label="Price Max (₹)" required>
              <input
                type="number"
                className={inputCls}
                value={form.priceMax}
                onChange={(e) => set("priceMax", e.target.value)}
              />
            </FormField>
            <FormField label="Price / sq.ft (₹)">
              <input
                type="number"
                className={inputCls}
                value={form.pricePerSqft}
                onChange={(e) => set("pricePerSqft", e.target.value)}
              />
            </FormField>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField label="Carpet Min (sq.ft)">
              <input
                type="number"
                className={inputCls}
                value={form.carpetMin}
                onChange={(e) => set("carpetMin", e.target.value)}
              />
            </FormField>
            <FormField label="Carpet Max (sq.ft)">
              <input
                type="number"
                className={inputCls}
                value={form.carpetMax}
                onChange={(e) => set("carpetMax", e.target.value)}
              />
            </FormField>
            <FormField label="Land Area (Acres)">
              <input
                type="number"
                step="0.01"
                className={inputCls}
                value={form.landAreaAcres}
                onChange={(e) => set("landAreaAcres", e.target.value)}
              />
            </FormField>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField label="Number of Towers">
              <input
                type="number"
                className={inputCls}
                value={form.towers}
                onChange={(e) => set("towers", e.target.value)}
              />
            </FormField>
            <FormField label="Total Units">
              <input
                type="number"
                className={inputCls}
                value={form.totalUnits}
                onChange={(e) => set("totalUnits", e.target.value)}
              />
            </FormField>
            <FormField label="RERA ID">
              <input
                className={inputCls}
                value={form.reraId}
                onChange={(e) => set("reraId", e.target.value)}
                placeholder="P03290010123"
              />
            </FormField>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Launch Date">
              <input
                className={inputCls}
                value={form.launchDate}
                onChange={(e) => set("launchDate", e.target.value)}
                placeholder="e.g. Jan 2024"
              />
            </FormField>
            <FormField label="Possession Date">
              <input
                className={inputCls}
                value={form.possessionDate}
                onChange={(e) => set("possessionDate", e.target.value)}
                placeholder="e.g. Dec 2026"
              />
            </FormField>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Locality Avg Price/sq.ft (₹)">
              <input
                type="number"
                className={inputCls}
                value={form.localityPricePerSqft}
                onChange={(e) => set("localityPricePerSqft", e.target.value)}
              />
            </FormField>
            <FormField label="Locality Trend (%)" hint="e.g. 8.5 for +8.5% YoY">
              <input
                type="number"
                step="0.1"
                className={inputCls}
                value={form.localityPriceTrend}
                onChange={(e) => set("localityPriceTrend", e.target.value)}
              />
            </FormField>
          </div>
        </div>

        {/* Content & Links */}
        <div className="bg-white rounded-xl border border-navy-100 p-6 space-y-4 shadow-xs">
          <h2 className="text-lg font-semibold text-navy-900 border-b border-navy-50 pb-3">
            Description & Media
          </h2>
          <FormField label="Project Description">
            <textarea
              className={textareaCls}
              rows={4}
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
            />
          </FormField>

          <FormField label="Highlights" hint="One bullet per line">
            <textarea
              className={textareaCls}
              rows={4}
              value={form.highlightsText}
              onChange={(e) => set("highlightsText", e.target.value)}
              placeholder="3 BHK luxury residences&#10;Panoramic hill views&#10;100% Vastu compliant"
            />
          </FormField>

          <FormField label="Image URLs" hint="One absolute URL or path per line">
            <textarea
              className={textareaCls}
              rows={4}
              value={form.imagesText}
              onChange={(e) => set("imagesText", e.target.value)}
              placeholder="/projects/grandeur-1.jpg&#10;/projects/grandeur-2.jpg"
            />
          </FormField>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Brochure PDF URL">
              <input
                className={inputCls}
                value={form.brochureUrl}
                onChange={(e) => set("brochureUrl", e.target.value)}
                placeholder="https://.../brochure.pdf"
              />
            </FormField>
            <FormField label="Virtual Tour / Video URL">
              <input
                className={inputCls}
                value={form.tourUrl}
                onChange={(e) => set("tourUrl", e.target.value)}
                placeholder="https://my.matterport.com/..."
              />
            </FormField>
          </div>
        </div>

        {/* SEO & Publishing */}
        <div className="bg-white rounded-xl border border-navy-100 p-6 space-y-4 shadow-xs">
          <h2 className="text-lg font-semibold text-navy-900 border-b border-navy-50 pb-3">
            SEO & Publication Status
          </h2>
          <FormField label="SEO Title">
            <input
              className={inputCls}
              value={form.seoTitle}
              onChange={(e) => set("seoTitle", e.target.value)}
              placeholder="Luxury 3 BHK Flats in Madhurawada | Vasishta"
            />
          </FormField>
          <FormField label="SEO Description">
            <textarea
              className={textareaCls}
              rows={2}
              value={form.seoDescription}
              onChange={(e) => set("seoDescription", e.target.value)}
            />
          </FormField>
          <FormField label="SEO Keywords" hint="Comma-separated">
            <input
              className={inputCls}
              value={form.seoKeywords}
              onChange={(e) => set("seoKeywords", e.target.value)}
              placeholder="flats in madhurawada, luxury apartments, vizag real estate"
            />
          </FormField>

          <div className="pt-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => set("published", e.target.checked)}
                className="h-5 w-5 rounded border-navy-300 text-brand-500 focus:ring-brand-400"
              />
              <span className="text-sm font-medium text-navy-900">
                Publish Project (Visible on public website)
              </span>
            </label>
          </div>
        </div>

        {/* Actions bar */}
        <div className="flex items-center justify-between pt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-brand-500 hover:bg-brand-400 disabled:opacity-60 text-white font-semibold px-8 py-3 rounded-xl text-sm transition-colors cursor-pointer shadow-xs"
          >
            {loading ? "Saving changes…" : "Save Changes"}
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleteLoading}
            className="text-red-600 hover:text-red-700 hover:bg-red-50 border border-red-200 px-4 py-2.5 rounded-xl text-sm transition-colors cursor-pointer"
          >
            {deleteLoading ? "Deleting…" : "Delete Project"}
          </button>
        </div>
      </form>
    </div>
  );
}
