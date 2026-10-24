type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  id?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  actionLabel,
  actionHref = "/projects",
  id,
}: SectionHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        {eyebrow ? (
          <p className="eyebrow mb-2 text-brand-500">
            {eyebrow}
          </p>
        ) : null}
        <h2 id={id} className="display-lg text-navy-950">
          {title}
        </h2>
        {description ? (
          <p className="mt-3 text-base leading-relaxed text-navy-500">{description}</p>
        ) : null}
      </div>

      {actionLabel ? (
        <a
          href={actionHref}
          className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-navy-800 transition hover:text-brand-600"
        >
          {actionLabel}
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            fill="none"
            className="size-4 transition-transform group-hover:translate-x-0.5"
          >
            <path
              d="M4 10h12m-4.5-4.5L16 10l-4.5 4.5"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      ) : null}
    </div>
  );
}
