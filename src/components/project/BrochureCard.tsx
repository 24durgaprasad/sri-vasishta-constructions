import Image from "next/image";

type Props = {
  projectName: string;
  brochureUrl?: string;
  brochurePreview?: string[];
};

export function BrochureCard({ projectName, brochureUrl, brochurePreview }: Props) {
  if (!brochureUrl) return null;

  const previews = brochurePreview ?? [];

  return (
    <div className="rounded-card-lg border border-navy-100 bg-white p-5 shadow-card sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
        {previews.length > 0 ? (
          <div className="no-scrollbar -mx-1 flex shrink-0 gap-2.5 overflow-x-auto px-1 py-1">
            {previews.slice(0, 3).map((src, index) => (
              <div
                key={src}
                className="relative h-32 w-20 shrink-0 overflow-hidden rounded-lg border border-navy-100 sm:h-44 sm:w-32"
              >
                <Image
                  src={src}
                  alt={`${projectName} brochure page ${index + 1}`}
                  fill
                  sizes="128px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        ) : null}

        <div className="min-w-0">
          <h3 className="text-lg font-bold text-navy-900">
            {projectName} official brochure
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-navy-600">
            Floor plans, specifications, amenities and payment details in a
            single downloadable document.
          </p>
          <a
            href={brochureUrl}
            download
            className="btn-primary mt-4 min-h-11"
          >
            <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="size-4">
              <path
                d="M10 3v10m0 0 3.5-3.5M10 13l-3.5-3.5M4 16.5h12"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Download brochure
          </a>
        </div>
      </div>
    </div>
  );
}
