"use client";

import { useState } from "react";
import Link from "next/link";
import { Carousel } from "@/components/ui/Carousel";
import { ProjectCard } from "./ProjectCard";
import { projectsBy } from "@/data/projects";
import type { Project } from "@/data/types";

const filterTabs = [
  { id: "all", label: "All Properties" },
  { id: "flats", label: "Flats & Apartments" },
  { id: "villas", label: "Houses & Villas" },
  { id: "plots", label: "Plots & Land" },
];

export function TopPicks({ projects }: { projects?: Project[] }) {
  const [activeTab, setActiveTab] = useState("all");
  const allItems = projects && projects.length > 0 ? projects : projectsBy("topPicks");

  const filteredItems = allItems.filter((p) => {
    if (activeTab === "flats") return p.bhks.some((b) => b.includes("BHK"));
    if (activeTab === "plots") return p.bhks.some((b) => b.toLowerCase().includes("plot") || p.name.toLowerCase().includes("plot"));
    if (activeTab === "villas") return p.name.toLowerCase().includes("residence") || p.name.toLowerCase().includes("villa") || p.bhks.includes("4 BHK");
    return true;
  });

  const displayItems = filteredItems.length > 0 ? filteredItems : allItems;

  return (
    <section aria-labelledby="top-picks-heading" className="bg-slate-50/70 py-16 lg:py-24">
      <div className="shell">
        {/* Section Header */}
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand-700">
              <span className="size-1.5 rounded-full bg-brand-500" />
              Handpicked Living
            </span>
            <h2 id="top-picks-heading" className="mt-3 text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">
              Featured Properties
            </h2>
            <p className="mt-2 text-base text-navy-600">
              Explore the most desirable residential and commercial developments across Visakhapatnam.
            </p>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-bold text-navy-900 transition-colors hover:text-brand-600"
          >
            <span>View All Projects</span>
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

        {/* Filter Pills */}
        <div className="mb-8 flex flex-wrap gap-2">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-full px-5 py-2 text-xs font-bold transition-all sm:text-sm ${
                activeTab === tab.id
                  ? "bg-navy-950 text-white shadow-sm"
                  : "bg-white text-navy-700 border border-navy-100 hover:border-navy-300 hover:bg-navy-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Carousel / Cards Grid */}
        <Carousel
          label="Featured properties"
          options={{ slidesToScroll: 1, breakpoints: { 640: { slidesToScroll: 2 }, 1024: { slidesToScroll: 3 } } }}
        >
          {displayItems.map((project) => (
            <div
              key={project.id}
              className="min-w-0 flex-[0_0_88%] sm:flex-[0_0_48%] lg:flex-[0_0_32%]"
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
