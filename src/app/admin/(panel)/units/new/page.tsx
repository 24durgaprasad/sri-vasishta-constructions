import Link from "next/link";
import { getAllProjectsAdmin } from "@/lib/repositories/projects";
import { NewUnitForm } from "./NewUnitForm";

export const metadata = { title: "New Unit — Admin" };

export default async function NewUnitPage() {
  const projects = await getAllProjectsAdmin();

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/units" className="text-navy-400 hover:text-navy-700 text-sm">
          ← Units
        </Link>
        <h1 className="text-2xl font-bold text-navy-900">Add New Unit</h1>
      </div>
      <NewUnitForm projects={projects} />
    </div>
  );
}
