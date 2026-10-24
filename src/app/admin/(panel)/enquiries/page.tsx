import Link from "next/link";
import { getAllEnquiries } from "@/lib/repositories/enquiries";
import { EnquiriesTable } from "./EnquiriesTable";

export const metadata = { title: "Enquiries — Admin" };

export default async function AdminEnquiriesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const allEnquiries = await getAllEnquiries();

  const filteredEnquiries =
    status && status !== "all"
      ? allEnquiries.filter((e) => e.status === status)
      : allEnquiries;

  const counts = {
    all: allEnquiries.length,
    new: allEnquiries.filter((e) => e.status === "new").length,
    contacted: allEnquiries.filter((e) => e.status === "contacted").length,
    closed: allEnquiries.filter((e) => e.status === "closed").length,
  };

  const tabs = [
    { id: "all", label: "All Enquiries", count: counts.all, href: "/admin/enquiries" },
    { id: "new", label: "New", count: counts.new, href: "/admin/enquiries?status=new" },
    {
      id: "contacted",
      label: "Contacted",
      count: counts.contacted,
      href: "/admin/enquiries?status=contacted",
    },
    { id: "closed", label: "Closed", count: counts.closed, href: "/admin/enquiries?status=closed" },
  ];

  const currentTab = status ?? "all";

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Leads & Enquiries</h1>
          <p className="text-sm text-navy-500 mt-1">
            Track inquiries received from contact forms, brochures, and project pages
          </p>
        </div>
      </div>

      {/* Status tabs */}
      <div className="flex border-b border-navy-200 mb-6 gap-2">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <Link
              key={tab.id}
              href={tab.href}
              className={`pb-3 px-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
                isActive
                  ? "border-brand-500 text-brand-600 font-semibold"
                  : "border-transparent text-navy-500 hover:text-navy-900 hover:border-navy-300"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  isActive
                    ? "bg-brand-100 text-brand-800"
                    : "bg-navy-100 text-navy-600"
                }`}
              >
                {tab.count}
              </span>
            </Link>
          );
        })}
      </div>

      <div className="bg-white rounded-xl border border-navy-100 overflow-hidden shadow-xs">
        <EnquiriesTable enquiries={filteredEnquiries} />
      </div>
    </div>
  );
}
