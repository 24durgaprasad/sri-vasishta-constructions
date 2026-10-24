import { notFound } from "next/navigation";
import { getProjectBySlugAdmin, getAllProjectsAdmin } from "@/lib/repositories/projects";
import ProjectEditForm from "./ProjectEditForm";

export const metadata = { title: "Edit Project — Admin" };

export default async function EditProjectPage({
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
  return <ProjectEditForm project={project} />;
}
