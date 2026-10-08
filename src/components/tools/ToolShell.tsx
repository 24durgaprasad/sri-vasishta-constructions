import Link from "next/link";
import type { ReactNode } from "react";
import { PageHero } from "@/components/layout/PageHero";

const tools = [
  { href: "/tools/emi-calculator", label: "EMI calculator" },
  { href: "/tools/eligibility", label: "Eligibility calculator" },
  { href: "/tools/affordability", label: "Affordability calculator" },
  { href: "/tools/price", label: "Price calculator" },
];

type Props = {
  slug: string;
  title: string;
  description: string;
  children: ReactNode;
  notes: { title: string; body: string }[];
};

export function ToolShell({ slug, title, description, children, notes }: Props) {
  const current = tools.find((tool) => tool.href === `/tools/${slug}`);

  return (
    <>
      <PageHero
        eyebrow="Tools"
        title={title}
        description={description}
        parent={{ label: "Tools", href: "/tools/emi-calculator" }}
      >
        <nav aria-label="Calculator tools" className="flex flex-wrap gap-2">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              aria-current={
                tool.href === `/tools/${slug}` ? "page" : undefined
              }
              className={`min-h-11 rounded-full border px-4 py-2 text-sm font-medium transition sm:min-h-0 ${
                tool.href === `/tools/${slug}`
                  ? "border-navy-900 bg-navy-900 text-white"
                  : "border-white/25 bg-white/10 text-white backdrop-blur-sm hover:border-white/50"
              }`}
            >
              {tool.label}
            </Link>
          ))}
        </nav>
        <span className="sr-only">{current?.label}</span>
      </PageHero>

      <section className="shell py-10 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
          <div>{children}</div>

          <aside className="space-y-5">
            {notes.map((note) => (
              <div
                key={note.title}
                className="rounded-card border border-navy-100 bg-white p-5 shadow-card"
              >
                <h2 className="text-base font-semibold text-navy-900">
                  {note.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-navy-600">
                  {note.body}
                </p>
              </div>
            ))}

            <div className="rounded-card-lg bg-navy-950 p-5">
              <h2 className="text-base font-semibold text-white">
                Want a real number?
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-navy-300">
                Our team runs these figures against a specific project and
                current lender rates, then sends you the sheet.
              </p>
              <Link href="/contact" className="btn-primary mt-4">
                Talk to us
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
