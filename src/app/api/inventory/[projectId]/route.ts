import { NextResponse } from "next/server";
import { getUnitsByProject } from "@/lib/repositories/units";
import { getPlotsByProject } from "@/lib/repositories/plots";

export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ projectId: string }> }
) {
  const { projectId } = await params;
  const [units, plots] = await Promise.all([
    getUnitsByProject(projectId),
    getPlotsByProject(projectId),
  ]);
  return NextResponse.json({ units, plots });
}
