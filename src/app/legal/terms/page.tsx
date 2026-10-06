import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `Terms of Use | ${site.name}`,
  description: `Terms that apply when you use ${site.name}'s website and the information published on it.`,
};

const sections = [
  {
    title: "Acceptance",
    body: `By using this website you agree to these terms. If you do not agree, please do not use the site. ${site.name}, ${site.address}, operates this website.`,
  },
  {
    title: "Information on this site",
    body: "Prices, configurations, sizes, floor plans, amenities, possession dates and images are indicative and may change as approvals and construction progress. Floor plans and images are representative and not to scale unless stated otherwise. Nothing here is an offer, contract or warranty.",
  },
  {
    title: "RERA and approvals",
    body: `Every project we publish carries its RERA registration number on the project page. Buyers should verify the registration, sanctioned plan and approvals directly with the authority before making any payment. Our RERA number for this website is ${site.rera}.`,
  },
  {
    title: "User conduct",
    body: "You agree not to misuse the site — no scraping, automated bulk requests, reverse engineering, or submitting false, unlawful or abusive content through our forms.",
  },
  {
    title: "Third-party links and partners",
    body: "Links to banks, lenders, interior partners or other third-party websites are provided for convenience. We do not control their content or terms, and you should review them before engaging.",
  },
  {
    title: "Intellectual property",
    body: `All text, logos, photography and design on this site belong to ${site.name} or are used with permission. You may view and print pages for personal, non-commercial use.`,
  },
  {
    title: "Limitation of liability",
    body: "To the extent permitted by law, the site is provided as is, without warranties of any kind. We are not liable for decisions taken solely on the basis of the information published here.",
  },
  {
    title: "Governing law and contact",
    body: `These terms are governed by the laws of India, with courts in Visakhapatnam having jurisdiction. Questions can be sent to ${site.email} or ${site.phone}.`,
  },
];

export default function TermsPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="Legal"
          title="Terms of Use"
          description="Last updated October 2026. These terms apply to your use of this website."
        />

        <section className="shell py-10 lg:py-14">
          <div className="max-w-3xl space-y-8">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="text-lg font-bold text-navy-900">
                  {section.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-navy-600 sm:text-base">
                  {section.body}
                </p>
              </div>
            ))}

            <div className="rounded-card-lg border border-navy-100 bg-navy-50 p-6">
              <p className="text-sm text-navy-700">
                Also read our{" "}
                <Link
                  href="/legal/privacy"
                  className="font-semibold text-brand-700 hover:underline"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
