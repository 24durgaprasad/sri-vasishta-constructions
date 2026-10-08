"use client";

import { useEffect, useState } from "react";

export type AnchorSection = {
  id: string;
  label: string;
};

export function AnchorNav({ sections }: { sections: AnchorSection[] }) {
  const [active, setActive] = useState(sections[0]?.id ?? "overview");
  const sectionIds = sections.map((section) => section.id).join(",");

  useEffect(() => {
    const el = document.querySelector(`[data-anchor="${active}"]`);
    el?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  }, [active]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-140px 0px -60% 0px", threshold: 0 },
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return (
    <nav
      aria-label="Project page sections"
      className="sticky top-[73px] z-30 border-b border-navy-100 bg-white/95 backdrop-blur-md"
    >
      <div className="shell">
        <ul className="no-scrollbar -mx-1 flex snap-x items-center gap-1 overflow-x-auto px-1 py-2.5">
          {sections.map((section) => (
            <li key={section.id} className="flex-none snap-start">
              <a
                href={`#${section.id}`}
                data-anchor={section.id}
                aria-current={active === section.id ? "true" : undefined}
                className={`inline-flex min-h-11 items-center whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-medium transition ${
                  active === section.id
                    ? "bg-navy-900 text-white"
                    : "text-navy-600 hover:bg-navy-50 hover:text-navy-900"
                }`}
              >
                {section.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}