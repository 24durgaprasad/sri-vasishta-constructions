import { notFound } from "next/navigation";
import Link from "next/link";
import { getProjectBySlugAdmin, getAllProjectsAdmin } from "@/lib/repositories/projects";
import MediaManager from "./MediaManager";

export const metadata = { title: "Media — Admin" };

export default async function ProjectMediaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let project = await getProjectBySlugAdmin(id);
  if (!project) {
    const all = await getAllProjectsAdmin();
    project = all.find((p) => p.id === id || p.slug === id) ?? null;
  }
  if (!project) notFound();

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link
          href={`/admin/projects/${project.id}/edit`}
          className="text-navy-400 hover:text-navy-700 text-sm"
        >
          ← Back to Edit
        </Link>
        <h1 className="text-2xl font-bold text-navy-900">Media — {project.name}</h1>
      </div>
      <MediaManager projectId={project.id} initialImages={project.images} />
    </div>
  );
}
