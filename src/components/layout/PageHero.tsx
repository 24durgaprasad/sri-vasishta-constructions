import Link from "next/link";
import type { ReactNode } from "react";

type Crumb = { label: string; href: string };

type Props = {
  title: string;
  description?: string;
  eyebrow?: string;
  parent?: Crumb;
  children?: ReactNode;
};

export function PageHero({ title, description, eyebrow, parent, children }: Props) {
  return (
    <section className="border-b border-navy-800 bg-navy-950 pt-[73px]">
      <div className="shell py-10 lg:py-14">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-xs text-navy-400">
            <li>
              <Link href="/" className="transition hover:text-white">
                Home
              </Link>
            </li>
            {parent ? (
              <>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href={parent.href} className="transition hover:text-white">
                    {parent.label}
                  </Link>
                </li>
              </>
            ) : null}
            <li aria-hidden="true">/</li>
            <li className="text-white" aria-current="page">
              {title}
            </li>
          </ol>
        </nav>

        {eyebrow ? (
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-brand-400">
            {eyebrow}
          </p>
        ) : null}

        <h1 className="mt-3 max-w-3xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
          {title}
        </h1>

        {description ? (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-navy-200 sm:text-lg">
            {description}
          </p>
        ) : null}

        {children ? <div className="mt-7">{children}</div> : null}
      </div>
    </section>
  );
}
