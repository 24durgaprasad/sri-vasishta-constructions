"use client";

import { Carousel } from "@/components/ui/Carousel";
import { SectionHeader } from "./SectionHeader";
import { HighlightCard } from "./HighlightCard";
import { projectsBy } from "@/data/projects";

export function Highlighted() {
  const items = projectsBy("highlighted");

  return (
    <section aria-labelledby="highlighted-heading" className="bg-navy-50 py-14 lg:py-18">
      <div className="shell">
        <SectionHeader
          eyebrow="Signature projects"
          title="Top highlighted projects"
          description="Our most requested developments, with limited inventory remaining in each tower."
          actionLabel="See all highlights"
          actionHref="/projects?collection=highlighted"
          id="highlighted-heading"
        />

        <Carousel label="highlighted project">
          {items.map((project) => (
            <div
              key={project.id}
              className="min-w-0 flex-[0_0_85%] sm:flex-[0_0_60%] lg:flex-[0_0_42%]"
            >
              <HighlightCard project={project} />
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
}