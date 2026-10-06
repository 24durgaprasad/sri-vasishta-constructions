import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ToolShell } from "@/components/tools/ToolShell";
import { EmiCalculator } from "@/components/project/EmiCalculator";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `Home Loan EMI Calculator | ${site.name}`,
  description:
    "Estimate your monthly home loan EMI, total interest and total payable for any loan amount, rate and tenure.",
};

const notes = [
  {
    title: "How EMI is calculated",
    body: "EMI = P × r × (1 + r)^n / ((1 + r)^n − 1), where P is the loan, r the monthly rate and n the number of months.",
  },
  {
    title: "What banks add on top",
    body: "Processing fees, legal and technical charges, insurance and stamp duty sit outside the EMI. Ask for the full disbursement breakup.",
  },
  {
    title: "A rate cut is not automatic",
    body: "On a floating rate, check whether a change reduces your EMI or just your tenure, and what it costs to switch lenders.",
  },
];

export default function EmiToolPage() {
  return (
    <>
      <Header />
      <main>
        <ToolShell
          slug="emi-calculator"
          title="Home loan EMI calculator"
          description="Move the sliders to see how loan amount, rate and tenure change your monthly instalment."
          notes={notes}
        >
          <EmiCalculator />
        </ToolShell>
      </main>
      <Footer />
    </>
  );
}
