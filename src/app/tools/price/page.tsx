import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ToolShell } from "@/components/tools/ToolShell";
import { PriceCalculator, type RateCard } from "@/components/tools/PriceCalculator";
import { detailsList } from "@/data/projectDetails";
import { site } from "@/data/site";
import { getAllProjects } from "@/lib/repositories/projects";

export const revalidate = 0;

export const metadata: Metadata = {
  title: `Property Price Calculator | ${site.name}`,
  description:
    "Estimate property value from the prevailing rate per square foot in Visakhapatnam localities, with area and negotiation adjustments.",
};

const notes = [
  {
    title: "Where these rates come from",
    body: "Each rate is the average price per square foot we publish on the project pages for that locality, so it moves when those pages move.",
  },
  {
    title: "What moves the number",
    body: "Floor level, east or west facing, corner units, age of the building and how close it is to the main road all shift the price within a locality.",
  },
  {
    title: "Before you pay",
    body: "Compare against recent registered sale values in the same street, and get an independent valuation for large purchases.",
  },
];

export default async function PriceToolPage() {
  const repoProjects = await getAllProjects();
  const grouped = new Map<string, number[]>();

  repoProjects.forEach((p) => {
    const rate = p.localityPricePerSqft || p.pricePerSqft;
    if (rate && p.locality) {
      const values = grouped.get(p.locality) ?? [];
      values.push(rate);
      grouped.set(p.locality, values);
    }
  });

  // Fallback to static if repo has no rates
  if (grouped.size === 0) {
    detailsList.forEach(({ project, detail }) => {
      const values = grouped.get(project.locality) ?? [];
      values.push(detail.localityPricePerSqft);
      grouped.set(project.locality, values);
    });
  }

  const rates: RateCard[] = Array.from(grouped.entries())
    .map(([name, values]) => ({
      name,
      rate: Math.round(values.reduce((sum, value) => sum + value, 0) / values.length),
    }))
    .sort((a, b) => b.rate - a.rate);

  return (
    <>
      <Header />
      <main>
        <ToolShell
          slug="price"
          title="Property price calculator"
          description="Estimate what a flat, house or plot is worth from the prevailing rate in that locality."
          notes={notes}
        >
          <PriceCalculator localities={rates} />
          <p className="mt-6 text-xs leading-relaxed text-navy-500">
            Rates cover the {rates.length} localities where {site.name} has
            projects in {site.city}.
          </p>
        </ToolShell>
      </main>
      <Footer />
    </>
  );
}
