import Link from "next/link";
import { getAllProjectsAdmin } from "@/lib/repositories/projects";
import { getPlotsByProject } from "@/lib/repositories/plots";
import { PlotsTable } from "./PlotsTable";

export const metadata = { title: "Plots — Admin" };

export default async function AdminPlotsPage({
  searchParams,
}: {
  searchParams: Promise<{ projectId?: string }>;
}) {
  const { projectId } = await searchParams;
  const projects = await getAllProjectsAdmin();

  const selectedProjects = projectId
    ? projects.filter((p) => p.id === projectId || p.slug === projectId)
    : projects;

  const projectMap = new Map<string, string>(projects.map((p) => [p.id, p.name]));
  projects.forEach((p) => projectMap.set(p.slug, p.name));

  const plotsNested = await Promise.all(
    selectedProjects.map(async (p) => {
      const pPlots = await getPlotsByProject(p.id);
      return pPlots.map((plot) => ({
        ...plot,
        projectName: p.name,
      }));
    })
  );

  const plots = plotsNested.flat();

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Plots Inventory</h1>
          <p className="text-sm text-navy-500 mt-1">Manage plotted layouts and land parcels</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/plots/new"
            className="bg-brand-500 hover:bg-brand-400 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors inline-block"
          >
            + Add Plot
          </Link>
        </div>
      </div>

      {/* Filter by project */}
      <div className="bg-white rounded-xl border border-navy-100 p-4 mb-6 shadow-xs flex flex-wrap items-center gap-3">
        <span className="text-xs font-semibold text-navy-600 uppercase tracking-wider">
          Filter by Project:
        </span>
        <Link
          href="/admin/plots"
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            !projectId
              ? "bg-navy-900 text-white"
              : "bg-navy-50 text-navy-700 hover:bg-navy-100"
          }`}
        >
          All Projects
        </Link>
        {projects.map((p) => (
          <Link
            key={p.id}
            href={`/admin/plots?projectId=${encodeURIComponent(p.id)}`}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              projectId === p.id
                ? "bg-navy-900 text-white"
                : "bg-navy-50 text-navy-700 hover:bg-navy-100"
            }`}
          >
            {p.name}
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-navy-100 overflow-hidden shadow-xs">
        <PlotsTable plots={plots} />
      </div>
    </div>
  );
}
