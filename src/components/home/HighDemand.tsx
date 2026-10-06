"use client";

import { Carousel } from "@/components/ui/Carousel";
import { SectionHeader } from "./SectionHeader";
import { InvestmentCard } from "./InvestmentCard";
import { projectsBy } from "@/data/projects";

export function HighDemand() {
  const items = projectsBy("highDemand");

  return (
    <section aria-labelledby="high-demand-heading" className="bg-navy-50 py-14 lg:py-18">
      <div className="shell">
        <SectionHeader
          eyebrow="Investment"
          title="High demand projects to invest in now"
          description="Plots, commercial spaces and completed inventory with strong resale and rental demand."
          actionLabel="Browse investments"
          actionHref="/projects?collection=investment"
          id="high-demand-heading"
        />

        <Carousel
          label="high demand project"
          options={{ slidesToScroll: 2, breakpoints: { 640: { slidesToScroll: 1 } } }}
        >
          {items.map((project) => (
            <div
              key={project.id}
              className="min-w-0 flex-[0_0_86%] sm:flex-[0_0_54%] lg:flex-[0_0_46%]"
            >
              <InvestmentCard project={project} />
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
}