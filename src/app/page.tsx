import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { StatsBar } from "@/components/home/StatsBar";
import { TopPicks } from "@/components/home/TopPicks";
import { LocalityBar } from "@/components/home/LocalityBar";
import { AboutSection } from "@/components/home/AboutSection";
import { Highlighted } from "@/components/home/Highlighted";
import { HighDemand } from "@/components/home/HighDemand";
import { Tieups } from "@/components/home/Tieups";
import { site } from "@/data/site";
import { getAllProjects, repoToProject } from "@/lib/repositories/projects";
import { getAllPartners, repoToPartner } from "@/lib/repositories/partners";

export const revalidate = 0;

export const metadata: Metadata = {
  title: `${site.name} | Flats, Luxury Villas, Plots & Commercial Properties in Visakhapatnam`,
  description:
    "Explore RERA-approved gated communities, apartments, luxury villas, approved plots and commercial spaces from Sri Vasishta Constructions across Visakhapatnam.",
};

export default async function Home() {
  const [repoProjects, repoPartners] = await Promise.all([
    getAllProjects(),
    getAllPartners(),
  ]);

  const allProjects = repoProjects.map(repoToProject);
  const topPicks = allProjects.filter((p) => p.collection === "topPicks");
  const highlighted = allProjects.filter((p) => p.collection === "highlighted");
  const highDemand = allProjects.filter((p) => p.collection === "highDemand");

  const banks = repoPartners.filter((p) => p.category === "bank").map(repoToPartner);
  const interiorPartners = repoPartners.filter((p) => p.category === "interiors").map(repoToPartner);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <StatsBar />
        <TopPicks projects={topPicks.length > 0 ? topPicks : allProjects} />
        <LocalityBar projects={allProjects} />
        <AboutSection />
        <Highlighted projects={highlighted.length > 0 ? highlighted : allProjects} />
        <HighDemand projects={highDemand.length > 0 ? highDemand : allProjects} />
        <Tieups banks={banks} interiorPartners={interiorPartners} />
      </main>
      <Footer />
    </>
  );
}
