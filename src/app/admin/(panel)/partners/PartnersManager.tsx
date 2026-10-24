"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { RepoPartner } from "@/lib/repositories/partners";
import {
  createPartnerAction,
  updatePartnerAction,
  deletePartnerAction,
} from "@/lib/actions/partners";
import { FormField, inputCls, selectCls } from "@/components/admin/FormField";

interface Props {
  initialPartners: RepoPartner[];
}

export function PartnersManager({ initialPartners }: Props) {
  const router = useRouter();
  const [partners, setPartners] = useState(initialPartners);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    category: "bank" as "bank" | "interiors" | "flooring-civil" | "leasing",
    logoSrc: "",
    url: "",
    description: "",
    featured: false,
    order: 0,
  });

  function set(key: string, value: unknown) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "vasishta/partners");

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = (await res.json()) as { ok: boolean; url?: string; error?: string };
      if (data.ok && data.url) {
        set("logoSrc", data.url);
      } else {
        setError(data.error || "Upload failed. Enter URL manually.");
      }
    } catch {
      setError("Network error during upload.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await createPartnerAction({
      name: form.name,
      category: form.category,
      logoSrc: form.logoSrc || undefined,
      url: form.url || undefined,
      description: form.description || undefined,
      featured: form.featured,
      order: Number(form.order),
    });

    setLoading(false);
    if (res.ok) {
      setPartners((prev) => [...prev, res.data]);
      setForm({
        name: "",
        category: "bank",
        logoSrc: "",
        url: "",
        description: "",
        featured: false,
        order: partners.length + 1,
      });
      router.refresh();
    } else {
      setError(res.error);
    }
  }

  async function handleToggleFeatured(id: string, featured: boolean) {
    const res = await updatePartnerAction(id, { featured: !featured });
    if (res.ok) {
      setPartners((prev) =>
        prev.map((p) => (p.id === id ? { ...p, featured: !featured } : p))
      );
      router.refresh();
    } else {
      alert(res.error);
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete partner "${name}"?`)) return;
    const res = await deletePartnerAction(id);
    if (res.ok) {
      setPartners((prev) => prev.filter((p) => p.id !== id));
      router.refresh();
    } else {
      alert(res.error);
    }
  }

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Table */}
      <div className="bg-white rounded-xl border border-navy-100 overflow-hidden shadow-xs">
        {partners.length === 0 ? (
          <p className="text-center text-navy-400 py-12">No partners added yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-navy-50 text-navy-600 text-xs uppercase tracking-wide">
                <tr>
                  <th className="px-4 py-3 text-left">Logo</th>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Category</th>
                  <th className="px-4 py-3 text-left">Website</th>
                  <th className="px-4 py-3 text-left">Featured</th>
                  <th className="px-4 py-3 text-left">Order</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-50">
                {partners.map((p) => (
                  <tr key={p.id} className="hover:bg-navy-50/40 transition-colors">
                    <td className="px-4 py-3">
                      {p.logoSrc || p.logo ? (
                        <div className="relative h-8 w-16 bg-navy-50 rounded border border-navy-100 flex items-center justify-center overflow-hidden">
                          <Image
                            src={p.logoSrc || p.logo || ""}
                            alt={p.name}
                            fill
                            sizes="64px"
                            className="object-contain p-1"
                            unoptimized
                          />
                        </div>
                      ) : (
                        <span className="text-xs text-navy-400 italic">No logo</span>
                      )}
                    </td>
                    <td className="px-4 py-3 font-semibold text-navy-900">{p.name}</td>
                    <td className="px-4 py-3 text-navy-600 capitalize">
                      <span className="px-2 py-0.5 rounded text-xs bg-navy-100 text-navy-800">
                        {p.category.replace("-", " ")}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-navy-600 text-xs">
                      {p.url ? (
                        <a
                          href={p.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-brand-600 hover:underline truncate max-w-[150px] inline-block"
                        >
                          {p.url}
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => handleToggleFeatured(p.id, p.featured)}
                        className={`text-xs px-2 py-1 rounded font-medium cursor-pointer transition-colors ${
                          p.featured
                            ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
                            : "bg-navy-50 text-navy-500 hover:bg-navy-100"
                        }`}
                      >
                        {p.featured ? "★ Featured" : "☆ Standard"}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-navy-600 font-mono text-xs">{p.order}</td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => handleDelete(p.id, p.name)}
                        className="text-red-600 hover:text-red-800 text-xs font-medium cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Partner Form */}
      <div className="bg-white rounded-xl border border-navy-100 p-6 shadow-xs">
        <h2 className="text-lg font-semibold text-navy-900 mb-4">Add Partner</h2>
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleCreate} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField label="Partner Name" required>
              <input
                className={inputCls}
                required
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="HDFC Bank"
              />
            </FormField>
            <FormField label="Category" required>
              <select
                className={selectCls}
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
              >
                <option value="bank">Banking Partner</option>
                <option value="interiors">Interior Designer</option>
                <option value="flooring-civil">Flooring & Civil</option>
                <option value="leasing">Leasing / Property Management</option>
              </select>
            </FormField>
            <FormField label="Display Order">
              <input
                type="number"
                className={inputCls}
                value={form.order}
                onChange={(e) => set("order", Number(e.target.value))}
              />
            </FormField>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Logo URL or Local Path" hint="e.g. /partners/hdfc.svg">
              <input
                className={inputCls}
                value={form.logoSrc}
                onChange={(e) => set("logoSrc", e.target.value)}
                placeholder="https://... or /partners/hdfc.svg"
              />
            </FormField>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-navy-700">Or Upload Logo</label>
              <input
                type="file"
                accept="image/*"
                disabled={uploading}
                onChange={handleFileUpload}
                className="block w-full text-sm text-navy-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-lg file:border-0
                  file:text-sm file:font-semibold
                  file:bg-brand-50 file:text-brand-700
                  hover:file:bg-brand-100
                  file:cursor-pointer cursor-pointer"
              />
              {uploading && <p className="text-xs text-brand-600 font-medium">Uploading logo…</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Website URL">
              <input
                className={inputCls}
                value={form.url}
                onChange={(e) => set("url", e.target.value)}
                placeholder="https://..."
              />
            </FormField>
            <FormField label="Description">
              <input
                className={inputCls}
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
                placeholder="Preferred home loan partner with preferential interest rates"
              />
            </FormField>
          </div>

          <div className="pt-2">
            <label className="flex items-center gap-2 text-sm text-navy-700 cursor-pointer">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => set("featured", e.target.checked)}
                className="rounded border-navy-300 text-brand-500 focus:ring-brand-400"
              />
              Mark as Featured Partner
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-brand-500 hover:bg-brand-400 disabled:opacity-60 text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors cursor-pointer"
          >
            {loading ? "Adding…" : "Add Partner"}
          </button>
        </form>
      </div>
    </div>
  );
}
