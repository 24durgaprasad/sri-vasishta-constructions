"use client";

import { useState } from "react";
import Image from "next/image";
import { updateProjectAction } from "@/lib/actions/projects";

interface Props {
  projectId: string;
  initialImages: string[];
}

export default function MediaManager({ projectId, initialImages }: Props) {
  const [images, setImages] = useState<string[]>(initialImages || []);
  const [newUrl, setNewUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function handleAddUrl(e: React.FormEvent) {
    e.preventDefault();
    const url = newUrl.trim();
    if (!url) return;
    const next = [...images, url];
    setImages(next);
    setNewUrl("");
    await saveImages(next);
  }

  function handleRemove(index: number) {
    const next = images.filter((_, i) => i !== index);
    setImages(next);
    saveImages(next);
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setMessage(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "vasishta/projects");

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = (await res.json()) as { ok: boolean; url?: string; error?: string };
      if (data.ok && data.url) {
        const next = [...images, data.url];
        setImages(next);
        await saveImages(next);
        setMessage({ type: "success", text: "Image uploaded and saved successfully!" });
      } else {
        setMessage({ type: "error", text: data.error || "Upload failed." });
      }
    } catch {
      setMessage({ type: "error", text: "Network error during upload." });
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  async function saveImages(imageList: string[]) {
    setSaving(true);
    const res = await updateProjectAction(projectId, { images: imageList });
    setSaving(false);
    if (!res.ok) {
      setMessage({ type: "error", text: res.error });
    }
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {message && (
        <div
          className={`p-4 rounded-xl text-sm border ${
            message.type === "success"
              ? "bg-green-50 border-green-200 text-green-800"
              : "bg-red-50 border-red-200 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Upload and Add Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Direct Upload (Cloudinary) */}
        <div className="bg-white p-5 rounded-xl border border-navy-100 shadow-xs">
          <h3 className="text-sm font-semibold text-navy-900 mb-2">Upload Image File</h3>
          <p className="text-xs text-navy-400 mb-4">
            Upload directly to Cloudinary CDN (requires Cloudinary configured).
          </p>
          <label className="block">
            <span className="sr-only">Choose image</span>
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
          </label>
          {uploading && <p className="text-xs text-brand-600 mt-2 font-medium">Uploading image…</p>}
        </div>

        {/* Add URL Manually */}
        <div className="bg-white p-5 rounded-xl border border-navy-100 shadow-xs">
          <h3 className="text-sm font-semibold text-navy-900 mb-2">Add Image by URL</h3>
          <p className="text-xs text-navy-400 mb-3">Paste a full HTTPS URL or local public path.</p>
          <form onSubmit={handleAddUrl} className="flex gap-2">
            <input
              type="text"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              placeholder="https://... or /projects/image.jpg"
              className="flex-1 rounded-lg border border-navy-200 px-3 py-2 text-sm text-navy-800 focus:outline-none focus:ring-2 focus:ring-brand-400"
            />
            <button
              type="submit"
              disabled={!newUrl.trim() || saving}
              className="bg-navy-900 hover:bg-navy-800 disabled:opacity-50 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors cursor-pointer"
            >
              Add
            </button>
          </form>
        </div>
      </div>

      {/* Current Gallery */}
      <div className="bg-white rounded-xl border border-navy-100 p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-navy-900">
            Project Images ({images.length})
          </h2>
          {saving && <span className="text-xs text-navy-400 font-medium">Saving gallery…</span>}
        </div>

        {images.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-navy-100 rounded-xl">
            <p className="text-sm text-navy-400">No images added yet.</p>
            <p className="text-xs text-navy-300 mt-1">Upload a file or add image URLs above.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {images.map((src, index) => (
              <div
                key={`${src}-${index}`}
                className="group relative rounded-lg border border-navy-100 overflow-hidden bg-navy-50 aspect-4/3 flex flex-col justify-between"
              >
                {/* Image preview */}
                <div className="relative w-full h-full">
                  <Image
                    src={src}
                    alt={`Project image ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                    unoptimized={src.startsWith("http")}
                  />
                </div>

                {/* Overlay with details and remove button */}
                <div className="absolute inset-0 bg-navy-950/60 opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] bg-black/60 text-white px-2 py-0.5 rounded">
                      #{index + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemove(index)}
                      className="bg-red-600 hover:bg-red-500 text-white p-1 rounded-md text-xs transition-colors cursor-pointer"
                      title="Remove image"
                    >
                      ✕
                    </button>
                  </div>
                  <p className="text-[10px] text-white/90 truncate font-mono bg-black/40 px-1 py-0.5 rounded">
                    {src}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
