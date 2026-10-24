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

export const metadata: Metadata = {
  title: `${site.name} | Flats, Luxury Villas, Plots & Commercial Properties in Visakhapatnam`,
  description:
    "Explore RERA-approved gated communities, apartments, luxury villas, approved plots and commercial spaces from Sri Vasishta Constructions across Visakhapatnam.",
};

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <StatsBar />
        <TopPicks />
        <LocalityBar />
        <AboutSection />
        <Highlighted />
        <HighDemand />
        <Tieups />
      </main>
      <Footer />
    </>
  );
}
