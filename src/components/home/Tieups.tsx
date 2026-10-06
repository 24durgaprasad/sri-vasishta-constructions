import { MarqueeRow } from "./MarqueeRow";
import { banks, interiorPartners } from "@/data/partners";

export function Tieups() {
  return (
    <section aria-labelledby="tieups-heading" className="py-14 lg:py-18">
      <div className="shell space-y-10">
        <div className="text-center">
          <h2
            id="tieups-heading"
            className="text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl"
          >
            Featured tie-ups
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-navy-500">
            Pre-approved home loans and vetted interior partners, so your
            purchase and your interiors move on the same timeline.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-center text-sm font-semibold uppercase tracking-[0.18em] text-navy-500">
            Banks
          </h3>
          <MarqueeRow
            partners={banks}
            direction="left"
            label="Banking partners"
            hrefBase="/partners/banks"
          />
        </div>

        <div>
          <h3 className="mb-4 text-center text-sm font-semibold uppercase tracking-[0.18em] text-navy-500">
            Interiors
          </h3>
          <MarqueeRow
            partners={interiorPartners}
            direction="right"
            label="Interior design partners"
            hrefBase="/partners/interiors"
          />
        </div>
      </div>
    </section>
  );
}