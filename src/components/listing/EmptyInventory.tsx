import Link from "next/link";
import { site } from "@/data/site";

type Props = {
  title: string;
  body: string;
  primaryHref?: string;
  primaryLabel?: string;
};

export function EmptyInventory({
  title,
  body,
  primaryHref = "/contact",
  primaryLabel = "Leave your details",
}: Props) {
  return (
    <div className="rounded-card-lg border border-dashed border-navy-200 bg-navy-50 p-8 text-center sm:p-12">
      <h2 className="text-xl font-bold text-navy-900">{title}</h2>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-navy-600">
        {body}
      </p>
      <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link href={primaryHref} className="btn-primary">
          {primaryLabel}
        </Link>
        <a href={`tel:${site.phone.replace(/[^\d+]/g, "")}`} className="btn-outline">
          Call {site.phone}
        </a>
      </div>
    </div>
  );
}
