import { getAllProjectsAdmin } from "@/lib/repositories/projects";
import { getLayoutsByProject } from "@/lib/repositories/layouts";
import { LayoutsManager } from "./LayoutsManager";

export const metadata = { title: "Layouts — Admin" };

export default async function AdminLayoutsPage() {
  const projects = await getAllProjectsAdmin();

  const nested = await Promise.all(
    projects.map(async (p) => {
      const layouts = await getLayoutsByProject(p.id);
      return layouts.map((l) => ({
        ...l,
        projectName: p.name,
      }));
    })
  );

  const allLayouts = nested.flat();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-navy-900">Project Layouts</h1>
        <p className="text-sm text-navy-500 mt-1">
          Masterplans, floor layouts, and phase boundary diagrams
        </p>
      </div>
      <LayoutsManager projects={projects} layouts={allLayouts} />
    </div>
  );
}
