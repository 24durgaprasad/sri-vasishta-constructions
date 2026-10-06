"use client";

import { Carousel } from "@/components/ui/Carousel";
import { SectionHeader } from "./SectionHeader";
import { ProjectCard } from "./ProjectCard";
import { projectsBy } from "@/data/projects";

export function TopPicks() {
  const items = projectsBy("topPicks");

  return (
    <section aria-labelledby="top-picks-heading" className="py-14 lg:py-18">
      <div className="shell">
        <SectionHeader
          eyebrow="Top picks"
          title="Explore top living options at Sri Vasishta"
          description="Handpicked apartments, villas and commercial spaces our buyers are viewing most this month."
          actionLabel="View all projects"
          id="top-picks-heading"
        />

        <Carousel
          label="top picks"
          options={{ slidesToScroll: 1, breakpoints: { 1024: { slidesToScroll: 1 } } }}
        >
          {items.map((project) => (
            <div
              key={project.id}
              className="min-w-0 flex-[0_0_88%] sm:flex-[0_0_70%] lg:flex-[0_0_62%] xl:flex-[0_0_52%]"
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
}