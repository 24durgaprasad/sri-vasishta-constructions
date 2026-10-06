import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ToolShell } from "@/components/tools/ToolShell";
import { EligibilityCalculator } from "@/components/tools/EligibilityCalculator";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `Home Loan Eligibility Calculator | ${site.name}`,
  description:
    "Estimate how much home loan you are eligible for based on your income, existing EMIs, rate and tenure.",
};

const notes = [
  {
    title: "The 50% rule",
    body: "Lenders generally keep total EMIs, including the new one, under half of your net monthly income. Some are stricter for high-income borrowers.",
  },
  {
    title: "What raises your eligibility",
    body: "A clean credit history, stable income, a working spouse as co-applicant and a lower existing obligation load all help.",
  },
  {
    title: "What to prepare",
    body: "Salary slips, six months of bank statements, the last tax return and ID proof are what lenders ask for first.",
  },
];

export default function EligibilityToolPage() {
  return (
    <>
      <Header />
      <main>
        <ToolShell
          slug="eligibility"
          title="Home loan eligibility calculator"
          description="Estimate the loan a lender is likely to approve from your income and existing EMIs."
          notes={notes}
        >
          <EligibilityCalculator />
        </ToolShell>
      </main>
      <Footer />
    </>
  );
}
