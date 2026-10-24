import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { StatsBar } from "@/components/home/StatsBar";
import { LocalityBar } from "@/components/home/LocalityBar";
import { TopPicks } from "@/components/home/TopPicks";
import { Highlighted } from "@/components/home/Highlighted";
import { Tieups } from "@/components/home/Tieups";
import { HighDemand } from "@/components/home/HighDemand";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `${site.name} | Flats, Villas, Plots & Commercial Properties`,
  description:
    "Browse RERA-approved flats, houses, plots, villas and commercial properties from Sri Vasishta Constructions across Visakhapatnam.",
};

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <StatsBar />
        <LocalityBar />
        <TopPicks />
        <Highlighted />
        <Tieups />
        <HighDemand />
      </main>
      <Footer />
    </>
  );
}
