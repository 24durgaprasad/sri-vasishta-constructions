import Link from "next/link";
import { getAllProjectsAdmin } from "@/lib/repositories/projects";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { formatPrice } from "@/lib/format";
import { PublishToggle } from "./PublishToggle";

export const metadata = { title: "Projects — Admin" };

export default async function AdminProjectsPage() {
  const projects = await getAllProjectsAdmin();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-navy-900">Projects</h1>
        <Link
          href="/admin/projects/new"
          className="bg-brand-500 hover:bg-brand-400 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          + New Project
        </Link>
      </div>
      <div className="bg-white rounded-xl border border-navy-100 overflow-hidden shadow-xs">
        {projects.length === 0 ? (
          <p className="text-center text-navy-400 py-12">No projects yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-navy-50 text-navy-600 text-xs uppercase tracking-wide">
                <tr>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Locality</th>
                  <th className="px-4 py-3 text-left">Type</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Price Range</th>
                  <th className="px-4 py-3 text-left">Published</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-50">
                {projects.map((p) => (
                  <tr key={p.id} className="hover:bg-navy-50/40 transition-colors">
                    <td className="px-4 py-3 font-medium text-navy-900">{p.name}</td>
                    <td className="px-4 py-3 text-navy-600">{p.locality}</td>
                    <td className="px-4 py-3 text-navy-600 capitalize">{p.propertyType}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={p.status} />
                    </td>
                    <td className="px-4 py-3 text-navy-600">
                      {formatPrice(p.priceMin)} – {formatPrice(p.priceMax)}
                    </td>
                    <td className="px-4 py-3">
                      <PublishToggle id={p.id} published={p.published} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Link
                          href={`/admin/projects/${p.id}/edit`}
                          className="text-brand-600 hover:text-brand-500 text-xs font-medium"
                        >
                          Edit
                        </Link>
                        <Link
                          href={`/admin/projects/${p.id}/media`}
                          className="text-navy-500 hover:text-navy-700 text-xs font-medium"
                        >
                          Media
                        </Link>
                        <Link
                          href={`/projects/${p.slug}`}
                          target="_blank"
                          className="text-navy-400 hover:text-navy-600 text-xs font-medium"
                        >
                          View ↗
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
