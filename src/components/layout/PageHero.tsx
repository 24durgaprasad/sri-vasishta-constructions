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
    <section className="border-b border-navy-800 bg-navy-950 pt-18">
      <div className="shell py-6 sm:py-8">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-xs text-navy-400">
            <li>
              <Link
                href="/"
                className="flex min-h-11 items-center transition hover:text-white sm:min-h-0"
              >
                Home
              </Link>
            </li>
            {parent ? (
              <>
                <li aria-hidden="true">/</li>
                <li>
                  <Link
                    href={parent.href}
                    className="flex min-h-11 items-center transition hover:text-white sm:min-h-0"
                  >
                    {parent.label}
                  </Link>
                </li>
              </>
            ) : null}
            <li aria-hidden="true">/</li>
            <li className="min-w-0 max-w-full truncate text-white" aria-current="page">
              {title}
            </li>
          </ol>
        </nav>

        {eyebrow ? (
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-brand-400">
            {eyebrow}
          </p>
        ) : null}

        <h1 className="mt-2 max-w-3xl break-words text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
          {title}
        </h1>

        {description ? (
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-navy-200 sm:text-lg">
            {description}
          </p>
        ) : null}

        {children ? <div className="mt-5">{children}</div> : null}
      </div>
    </section>
  );
}
