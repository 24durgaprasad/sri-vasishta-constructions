import Link from "next/link";
import { getAllProjectsAdmin } from "@/lib/repositories/projects";
import { NewPlotForm } from "./NewPlotForm";

export const metadata = { title: "New Plot — Admin" };

export default async function NewPlotPage() {
  const projects = await getAllProjectsAdmin();

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/plots" className="text-navy-400 hover:text-navy-700 text-sm">
          ← Plots
        </Link>
        <h1 className="text-2xl font-bold text-navy-900">Add New Plot</h1>
      </div>
      <NewPlotForm projects={projects} />
    </div>
  );
}
