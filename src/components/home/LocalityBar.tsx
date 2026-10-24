import Link from "next/link";
import Image from "next/image";
import { localities } from "@/data/localities";
import { projects as staticProjects } from "@/data/projects";
import type { Project } from "@/data/types";

// Associate high-quality Vizag architectural/locality images with top localities
const localityImages: Record<string, string> = {
  Madhurawada: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=70",
  "MVP Colony": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=70",
  Rushikonda: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=70",
  Gajuwaka: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=70",
  Seethammadhara: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=70",
  Yendada: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=600&q=70",
  Kommadi: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=70",
  Pendurthi: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=70",
};

export function LocalityBar({ projects }: { projects?: Project[] }) {
  const topLocalities = localities.slice(0, 8);
  const projectList = projects && projects.length > 0 ? projects : staticProjects;

  const getCount = (name: string) => {
    const count = projectList.filter((p) => p.locality.toLowerCase().includes(name.toLowerCase())).length;
    return count > 0 ? `${count} ${count === 1 ? "Property" : "Properties"}` : "RERA Approved";
  };

  return (
    <section className="border-b border-navy-100 bg-slate-50/70 py-16 lg:py-24">
      <div className="shell">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand-700">
              <span className="size-1.5 rounded-full bg-brand-500" />
              Prime Neighborhoods
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">
              Explore Properties By Locality
            </h2>
            <p className="mt-2 text-base text-navy-600">
              Discover gated apartments and villas in Visakhapatnam’s most sought-after coastal and IT corridors.
            </p>
          </div>

          <Link
            href="/search"
            className="inline-flex items-center gap-2 text-sm font-bold text-navy-900 transition-colors hover:text-brand-600"
          >
            <span>View All 14+ Neighborhoods</span>
            <svg viewBox="0 0 20 20" fill="none" className="size-4">
              <path
                d="M4 10h12m-4.5-4.5L16 10l-4.5 4.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>

        {/* EstateLoft Style 4-column Image Cards Grid (el-features-1-card) */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {topLocalities.map((loc) => {
            const imgSrc = localityImages[loc.name] || localityImages["Madhurawada"];
            const countText = getCount(loc.name);

            return (
              <Link
                key={loc.id}
                href={`/search?locality=${encodeURIComponent(loc.name)}`}
                className="group relative block aspect-[4/3] overflow-hidden rounded-2xl shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <Image
                  src={imgSrc}
                  alt={`${loc.name}, Visakhapatnam Real Estate`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/30 to-transparent" />

                {/* Bottom Text Content */}
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-xs font-semibold text-brand-400">
                    {countText}
                  </p>
                  <h3 className="mt-1 text-xl font-bold text-white transition-colors group-hover:text-brand-300">
                    {loc.name}
                  </h3>
                  <p className="text-xs text-navy-300">Visakhapatnam</p>
                </div>

                {/* Top Corner Arrow */}
                <div className="absolute top-4 right-4 flex size-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-all group-hover:bg-brand-500 group-hover:text-navy-950">
                  <svg viewBox="0 0 16 16" fill="none" className="size-3.5">
                    <path
                      d="M3 13L13 3M13 3H5M13 3V11"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
