import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ToolShell } from "@/components/tools/ToolShell";
import { AffordabilityCalculator } from "@/components/tools/AffordabilityCalculator";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `Property Affordability Calculator | ${site.name}`,
  description:
    "Work out a realistic property budget from your income, expenses, existing EMIs and savings.",
};

const notes = [
  {
    title: "Budget before shortlist",
    body: "Knowing your ceiling first stops you from falling for a home that costs a weekend of income every month.",
  },
  {
    title: "Keep a buffer",
    body: "Moving costs, furnishing, society charges and the first year of maintenance arrive together. Hold back roughly 8–10% of the budget for them.",
  },
  {
    title: "Down payment matters",
    body: "A larger down payment lowers the EMI for the rest of your life. Most lenders finance up to 80–90% of the property value.",
  },
];

export default function AffordabilityToolPage() {
  return (
    <>
      <Header />
      <main>
        <ToolShell
          slug="affordability"
          title="Affordability calculator"
          description="See what you can comfortably spend on a home, from income, expenses and savings."
          notes={notes}
        >
          <AffordabilityCalculator />
        </ToolShell>
      </main>
      <Footer />
    </>
  );
}
