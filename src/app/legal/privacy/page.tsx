import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `Privacy Policy | ${site.name}`,
  description: `How ${site.name} collects, uses and protects information shared through this website.`,
};

const sections = [
  {
    title: "Information we collect",
    body: `When you submit an enquiry, a question or an application, we collect the name, phone number, email address and message you provide. Our web server also records standard technical logs such as IP address, browser and the pages requested, which are used for security and debugging.`,
  },
  {
    title: "How we use it",
    body: "We use your details only to respond to your enquiry, share project information you asked for, arrange site visits, and — if you apply — to evaluate your application. We do not sell, rent or trade your information to third parties.",
  },
  {
    title: "Sharing with partners",
    body: `If you ask for a home loan or interiors, we share the minimum details required with our lending or interiors partners so they can call you back. You can ask us not to at any point by writing to ${site.email}.`,
  },
  {
    title: "Cookies and analytics",
    body: "This website does not set advertising cookies. Any analytics we add later will be configured to work without cross-site tracking, and this policy will be updated before that happens.",
  },
  {
    title: "Retention",
    body: "Enquiry records are kept as long as needed to serve you and to meet record-keeping requirements, after which they are deleted. You can request deletion of your enquiry at any time.",
  },
  {
    title: "Your choices",
    body: `You can ask what data we hold about you, correct it, or ask us to delete it by writing to ${site.email} or calling ${site.phone}. We respond within a reasonable period, usually seven working days.`,
  },
  {
    title: "Security",
    body: "Submissions are transmitted over HTTPS and stored on access-controlled systems. No method of transmission is completely secure, but we limit what we collect to what is needed to answer you.",
  },
  {
    title: "Changes and contact",
    body: `We will note any change to this policy on this page. Questions about it can be sent to ${site.email}, ${site.address}.`,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="Legal"
          title="Privacy Policy"
          description={`Last updated October 2026. This policy covers ${site.name}'s website.`}
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
                  href="/legal/terms"
                  className="font-semibold text-brand-700 hover:underline"
                >
                  Terms of Use
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
