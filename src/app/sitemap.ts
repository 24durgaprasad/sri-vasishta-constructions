import type { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/repositories/projects";
import { slugify } from "@/lib/format";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vasishtaconstructions.com";
  let projects: Awaited<ReturnType<typeof getAllProjects>> = [];
  try {
    projects = await getAllProjects();
  } catch {
    projects = [];
  }

  const staticRoutes = [
    "",
    "/projects",
    "/buy",
    "/rent",
    "/about",
    "/contact",
    "/careers",
    "/search",
    "/tools/emi-calculator",
    "/tools/eligibility",
    "/tools/affordability",
    "/tools/price",
    "/legal/privacy",
    "/legal/terms",
    "/properties/flats",
    "/properties/houses",
    "/properties/villas",
    "/properties/plots",
    "/properties/commercial",
    "/partners/banks",
    "/partners/interiors",
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const projectRoutes = projects.map((project) => ({
    url: `${siteUrl}/projects/${slugify(project.name)}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...projectRoutes];
}
