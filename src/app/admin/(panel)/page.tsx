import { countProjects } from "@/lib/repositories/projects";
import { countUnits } from "@/lib/repositories/units";
import { countPlots } from "@/lib/repositories/plots";
import { countEnquiries } from "@/lib/repositories/enquiries";
import Link from "next/link";

export const metadata = { title: "Dashboard — Admin" };

export default async function AdminDashboardPage() {
  const [projectCount, unitCount, plotCount, { total: enquiryTotal, newCount: enquiryNew }] =
    await Promise.all([countProjects(), countUnits(), countPlots(), countEnquiries()]);

  const stats = [
    { label: "Projects", value: projectCount, href: "/admin/projects", color: "bg-blue-500" },
    { label: "Units", value: unitCount, href: "/admin/units", color: "bg-green-500" },
    { label: "Plots", value: plotCount, href: "/admin/plots", color: "bg-purple-500" },
    { label: "Enquiries (new)", value: `${enquiryNew} / ${enquiryTotal}`, href: "/admin/enquiries", color: "bg-brand-500" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy-900 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="bg-white rounded-xl border border-navy-100 p-6 hover:shadow-md transition-shadow"
          >
            <div className={`inline-block w-2 h-8 rounded-full ${s.color} mb-3`} />
            <p className="text-3xl font-bold text-navy-900">{s.value}</p>
            <p className="text-navy-500 text-sm mt-1">{s.label}</p>
          </Link>
        ))}
      </div>
      <div className="bg-white rounded-xl border border-navy-100 p-6">
        <h2 className="text-lg font-semibold text-navy-800 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/projects/new" className="btn-primary text-sm px-4 py-2 rounded-lg inline-block">
            + New Project
          </Link>
          <Link href="/admin/enquiries" className="border border-navy-200 text-navy-700 hover:bg-navy-50 text-sm px-4 py-2 rounded-lg inline-block transition-colors">
            View Enquiries
          </Link>
          <Link href="/" target="_blank" className="border border-navy-200 text-navy-700 hover:bg-navy-50 text-sm px-4 py-2 rounded-lg inline-block transition-colors">
            View Site ↗
          </Link>
        </div>
      </div>
    </div>
  );
}
