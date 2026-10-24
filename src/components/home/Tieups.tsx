import Image from "next/image";
import { banks, interiorPartners } from "@/data/partners";

export function Tieups() {
  return (
    <section className="border-b border-navy-100 bg-white py-16 lg:py-20">
      <div className="shell">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand-700">
            <span className="size-1.5 rounded-full bg-brand-500" />
            Approved &amp; Certified
          </span>
          <h2 className="mt-3 text-2xl font-extrabold text-navy-950 sm:text-3xl">
            Trusted Banking &amp; Design Partners
          </h2>
          <p className="mt-2 text-sm text-navy-600">
            Pre-approved home loans from leading national banks &amp; verified interior collaborators for hassle-free move-in.
          </p>
        </div>

        {/* Banking Partners */}
        <div className="mt-12">
          <p className="text-center text-xs font-bold uppercase tracking-wider text-navy-400">
            Bank Loan Approvals Available From
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {banks.map((bank) => (
              <div
                key={bank.id}
                className="flex h-14 w-36 items-center justify-center rounded-xl border border-navy-100/70 bg-slate-50/60 p-3 transition-all duration-300 hover:border-navy-200 hover:bg-white hover:shadow-sm"
              >
                {bank.logoSrc ? (
                  <Image
                    src={bank.logoSrc}
                    alt={bank.name}
                    width={110}
                    height={32}
                    className="h-7 w-auto object-contain"
                  />
                ) : (
                  <span className="text-xs font-bold tracking-wide text-navy-700">
                    {bank.logo}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Interior Partners */}
        <div className="mt-12 border-t border-navy-100/70 pt-10">
          <p className="text-center text-xs font-bold uppercase tracking-wider text-navy-400">
            Interior &amp; Lifestyle Collaborations
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {interiorPartners.map((p) => (
              <div
                key={p.id}
                className="flex h-14 w-36 items-center justify-center rounded-xl border border-navy-100/70 bg-slate-50/60 p-3 transition-all duration-300 hover:border-navy-200 hover:bg-white hover:shadow-sm"
              >
                {p.logoSrc ? (
                  <Image
                    src={p.logoSrc}
                    alt={p.name}
                    width={110}
                    height={32}
                    className="h-7 w-auto object-contain"
                  />
                ) : (
                  <span className="text-xs font-bold tracking-wide text-navy-700">
                    {p.logo}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
