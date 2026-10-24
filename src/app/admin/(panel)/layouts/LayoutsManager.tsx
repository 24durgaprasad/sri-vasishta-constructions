"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { RepoProject } from "@/lib/repositories/projects";
import type { RepoLayout } from "@/lib/repositories/layouts";
import { createLayoutAction, deleteLayoutAction } from "@/lib/actions/layouts";
import { FormField, inputCls, selectCls } from "@/components/admin/FormField";

interface Props {
  projects: RepoProject[];
  layouts: (RepoLayout & { projectName?: string })[];
}

export function LayoutsManager({ projects, layouts: initialLayouts }: Props) {
  const router = useRouter();
  const [layouts, setLayouts] = useState(initialLayouts);
  const [selectedProjectId, setSelectedProjectId] = useState<string>("all");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    projectId: projects[0]?.id ?? "",
    name: "",
    image: "",
  });

  function set(key: string, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "vasishta/layouts");

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = (await res.json()) as { ok: boolean; url?: string; error?: string };
      if (data.ok && data.url) {
        set("image", data.url);
      } else {
        setError(data.error || "Upload failed. Please enter URL manually.");
      }
    } catch {
      setError("Network error during upload.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await createLayoutAction({
      projectId: form.projectId,
      name: form.name,
      image: form.image,
    });

    setLoading(false);
    if (res.ok) {
      const proj = projects.find((p) => p.id === form.projectId);
      setLayouts((prev) => [
        ...prev,
        { ...res.data, projectName: proj?.name ?? form.projectId },
      ]);
      setForm((f) => ({ ...f, name: "", image: "" }));
      router.refresh();
    } else {
      setError(res.error);
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete layout "${name}"?`)) return;
    const res = await deleteLayoutAction(id);
    if (res.ok) {
      setLayouts((prev) => prev.filter((l) => l.id !== id));
      router.refresh();
    } else {
      alert(res.error);
    }
  }

  const filteredLayouts =
    selectedProjectId === "all"
      ? layouts
      : layouts.filter((l) => l.projectId === selectedProjectId);

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Create Layout Form */}
      <div className="bg-white rounded-xl border border-navy-100 p-6 shadow-xs">
        <h2 className="text-lg font-semibold text-navy-900 mb-4">Add Project Layout Plan</h2>
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Project" required>
              <select
                className={selectCls}
                required
                value={form.projectId}
                onChange={(e) => set("projectId", e.target.value)}
              >
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </FormField>
            <FormField label="Layout Name" required hint="e.g. Master Layout Phase 1">
              <input
                className={inputCls}
                required
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="Masterplan Layout"
              />
            </FormField>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Layout Image URL" required hint="Paste URL or upload below">
              <input
                className={inputCls}
                required
                value={form.image}
                onChange={(e) => set("image", e.target.value)}
                placeholder="https://... or /layouts/masterplan.jpg"
              />
            </FormField>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-navy-700">
                Or Upload File
              </label>
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
              {uploading && (
                <p className="text-xs text-brand-600 font-medium">Uploading image…</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !form.name || !form.image}
            className="bg-brand-500 hover:bg-brand-400 disabled:opacity-60 text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors cursor-pointer"
          >
            {loading ? "Adding…" : "Add Layout"}
          </button>
        </form>
      </div>

      {/* Filter and List */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <h2 className="text-lg font-semibold text-navy-900">
            Existing Layout Plans ({filteredLayouts.length})
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-xs text-navy-500 font-medium">Filter:</span>
            <select
              value={selectedProjectId}
              onChange={(e) => setSelectedProjectId(e.target.value)}
              className="text-xs rounded-lg border border-navy-200 bg-white px-3 py-1.5 text-navy-700 focus:outline-none focus:ring-1 focus:ring-brand-400"
            >
              <option value="all">All Projects</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {filteredLayouts.length === 0 ? (
          <div className="bg-white rounded-xl border border-navy-100 p-12 text-center shadow-xs">
            <p className="text-navy-400 text-sm">No layouts added yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLayouts.map((l) => (
              <div
                key={l.id}
                className="bg-white rounded-xl border border-navy-100 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div className="relative aspect-16/10 bg-navy-50 w-full overflow-hidden">
                  <Image
                    src={l.image}
                    alt={l.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                    unoptimized={l.image.startsWith("http")}
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-navy-900 text-base">{l.name}</h3>
                    <p className="text-xs text-navy-500 mt-0.5">{l.projectName ?? l.projectId}</p>
                    <p className="text-xs text-navy-400 mt-2">
                      Plots mapped: {l.plots?.length ?? 0}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-navy-50 flex items-center justify-between">
                    <a
                      href={l.image}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-brand-600 hover:text-brand-500 font-medium"
                    >
                      View Full Image ↗
                    </a>
                    <button
                      type="button"
                      onClick={() => handleDelete(l.id, l.name)}
                      className="text-xs text-red-600 hover:text-red-700 font-medium cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
