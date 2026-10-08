import { Carousel } from "@/components/ui/Carousel";
import { InvestmentCard } from "@/components/home/InvestmentCard";
import type { Project } from "@/data/types";

export function NearbyProjects({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return null;

  return (
    <Carousel label="nearby project" className="shell">
      {projects.map((project) => (
          <div key={project.id} className="min-w-0 basis-[84%] sm:basis-[70%] lg:basis-[46%]">
          <InvestmentCard project={project} />
        </div>
      ))}
    </Carousel>
  );
}