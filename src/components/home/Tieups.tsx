import Image from "next/image";
import { banks, interiorPartners } from "@/data/partners";

export function Tieups() {
  return (
    <section className="section-gap-sm border-y border-navy-100 bg-white">
      <div className="shell">
        {/* Financing Partners */}
        <div className="mb-14">
          <p className="eyebrow mb-8 text-center text-navy-400">Financing Partners</p>
          <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-10">
            {banks.map((bank) => (
              <div
                key={bank.id}
                className="group flex h-10 items-center justify-center grayscale opacity-50 transition-all duration-300 hover:grayscale-0 hover:opacity-100"
              >
                {bank.logoSrc ? (
                  <Image
                    src={bank.logoSrc}
                    alt={bank.name}
                    width={100}
                    height={36}
                    className="h-8 w-auto object-contain"
                  />
                ) : (
                  <span className="text-sm font-bold tracking-wide text-navy-600">
                    {bank.logo}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="mb-14 border-t border-navy-100" />

        {/* Interior Partners */}
        <div>
          <p className="eyebrow mb-8 text-center text-navy-400">
            Interior &amp; Lifestyle Partners
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-10">
            {interiorPartners.map((p) => (
              <div
                key={p.id}
                className="group flex h-10 items-center justify-center grayscale opacity-50 transition-all duration-300 hover:grayscale-0 hover:opacity-100"
              >
                {p.logoSrc ? (
                  <Image
                    src={p.logoSrc}
                    alt={p.name}
                    width={100}
                    height={36}
                    className="h-8 w-auto object-contain"
                  />
                ) : (
                  <span className="text-sm font-bold tracking-wide text-navy-600">
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
